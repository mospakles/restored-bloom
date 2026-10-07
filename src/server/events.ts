import "server-only"
import { z } from "zod"
import { prisma } from "@/lib/db"
import { Prisma, type EventStatus } from "@/generated/prisma/client"
import { CONSENT_VERSION, eventRegistrationSchema, flattenErrors, type FieldErrors } from "@/lib/validation"
import { fromLagosLocalInput, slugify } from "@/lib/utils"
import { assertCan, audit, NotFoundError, type Actor } from "@/server/actor"

// ─── Public ──────────────────────────────────────────────────────────────────

const publicSelect = {
  id: true,
  title: true,
  slug: true,
  summary: true,
  startsAt: true,
  endsAt: true,
  location: true,
  isOnline: true,
  audience: true,
  status: true,
} satisfies Prisma.EventSelect

/** Events that have not finished yet. Cancelled events stay visible so people are informed. */
export async function listUpcomingEvents(now = new Date()) {
  return prisma.event.findMany({
    where: {
      status: { in: ["PUBLISHED", "CANCELLED"] },
      OR: [{ endsAt: { gte: now } }, { endsAt: null, startsAt: { gte: now } }],
    },
    orderBy: { startsAt: "asc" },
    select: publicSelect,
  })
}

export async function listPastEvents(now = new Date()) {
  return prisma.event.findMany({
    where: {
      status: "PUBLISHED",
      OR: [{ endsAt: { lt: now } }, { endsAt: null, startsAt: { lt: now } }],
    },
    orderBy: { startsAt: "desc" },
    take: 24,
    select: publicSelect,
  })
}

export async function getPublicEvent(slug: string) {
  const event = await prisma.event.findFirst({
    where: { slug, status: { in: ["PUBLISHED", "CANCELLED"] } },
  })
  if (!event) return null
  const confirmed = await prisma.eventRegistration.count({ where: { eventId: event.id, status: "CONFIRMED" } })
  return { ...event, confirmed, availability: registrationAvailability(event, confirmed) }
}

export type Availability =
  | { open: true; placesLeft: number | null }
  | { open: false; reason: "cancelled" | "past" | "closed" | "full" | "unpublished" }

export function registrationAvailability(
  event: { status: EventStatus; registrationOpen: boolean; startsAt: Date; capacity: number | null },
  confirmed: number,
  now = new Date(),
): Availability {
  if (event.status === "CANCELLED") return { open: false, reason: "cancelled" }
  if (event.status !== "PUBLISHED") return { open: false, reason: "unpublished" }
  if (event.startsAt <= now) return { open: false, reason: "past" }
  if (!event.registrationOpen) return { open: false, reason: "closed" }
  if (event.capacity != null && confirmed >= event.capacity) return { open: false, reason: "full" }
  return { open: true, placesLeft: event.capacity == null ? null : event.capacity - confirmed }
}

export type RegistrationResult =
  | { ok: true; status: "registered"; eventTitle: string; registrationId: string }
  | { ok: false; status: "duplicate" | "full" | "closed" | "not-found" }
  | { ok: false; status: "invalid"; errors: FieldErrors }

/**
 * Registers an attendee. Runs in a transaction holding a row lock on the
 * event, so concurrent registrations cannot exceed capacity.
 */
export async function registerForEvent(input: Record<string, unknown>, now = new Date()): Promise<RegistrationResult> {
  const parsed = eventRegistrationSchema.safeParse(input)
  if (!parsed.success) return { ok: false, status: "invalid", errors: flattenErrors(parsed.error) }
  const data = parsed.data

  return prisma.$transaction(async (tx) => {
    const locked = await tx.$queryRaw<{ id: string }[]>`SELECT "id" FROM "Event" WHERE "id" = ${data.eventId} FOR UPDATE`
    if (locked.length === 0) return { ok: false, status: "not-found" } as const
    const event = await tx.event.findUniqueOrThrow({ where: { id: data.eventId } })
    const existing = await tx.eventRegistration.findUnique({
      where: { eventId_email: { eventId: event.id, email: data.email } },
    })
    if (existing?.status === "CONFIRMED") return { ok: false, status: "duplicate" } as const

    const confirmed = await tx.eventRegistration.count({ where: { eventId: event.id, status: "CONFIRMED" } })
    const availability = registrationAvailability(event, confirmed, now)
    if (!availability.open) {
      if (availability.reason === "full") return { ok: false, status: "full" } as const
      if (availability.reason === "unpublished") return { ok: false, status: "not-found" } as const
      return { ok: false, status: "closed" } as const
    }

    const fields = {
      name: data.name,
      phone: data.phone ?? null,
      organisation: data.organisation ?? null,
      role: data.role ?? null,
      status: "CONFIRMED" as const,
      consentVersion: CONSENT_VERSION,
      consentAt: now,
    }
    const registration = existing
      ? await tx.eventRegistration.update({ where: { id: existing.id }, data: fields })
      : await tx.eventRegistration.create({ data: { ...fields, eventId: event.id, email: data.email } })
    return { ok: true, status: "registered", eventTitle: event.title, registrationId: registration.id } as const
  })
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

export const EVENT_STATUSES = ["DRAFT", "PUBLISHED", "CANCELLED", "ARCHIVED"] as const

export const eventInputSchema = z
  .object({
    title: z.string().trim().min(3, "Title is required").max(160),
    slug: z
      .string()
      .trim()
      .max(80)
      .optional()
      .transform((v) => (v ? slugify(v) : undefined)),
    summary: z.string().trim().min(10, "Add a short summary (at least 10 characters)").max(300),
    description: z.string().trim().min(1, "Add a description").max(20000),
    startsAt: z.string().transform((v, ctx) => {
      const d = fromLagosLocalInput(v)
      if (!d) ctx.addIssue({ code: "custom", message: "Enter a valid start date and time" })
      return d as Date
    }),
    endsAt: z
      .string()
      .optional()
      .transform((v, ctx) => {
        if (!v) return null
        const d = fromLagosLocalInput(v)
        if (!d) ctx.addIssue({ code: "custom", message: "Enter a valid end date and time" })
        return d
      }),
    location: z.string().trim().min(2, "Location is required").max(200),
    isOnline: z.preprocess((v) => v === "on" || v === true, z.boolean()),
    audience: z
      .string()
      .trim()
      .max(160)
      .optional()
      .transform((v) => v || null),
    capacity: z
      .string()
      .optional()
      .transform((v, ctx) => {
        if (!v) return null
        const n = Number(v)
        if (!Number.isInteger(n) || n < 1 || n > 100000) {
          ctx.addIssue({ code: "custom", message: "Capacity must be a whole number above 0, or left blank" })
        }
        return n
      }),
    registrationOpen: z.preprocess((v) => v === "on" || v === true, z.boolean()),
  })
  .refine((v) => !v.endsAt || !v.startsAt || v.endsAt > v.startsAt, {
    path: ["endsAt"],
    message: "End time must be after the start time",
  })

export async function listAdminEvents(actor: Actor) {
  assertCan(actor, "events:manage")
  return prisma.event.findMany({
    orderBy: { startsAt: "desc" },
    include: { _count: { select: { registrations: { where: { status: "CONFIRMED" } } } } },
  })
}

export async function getAdminEvent(actor: Actor, id: string) {
  assertCan(actor, "events:manage")
  const event = await prisma.event.findUnique({ where: { id } })
  if (!event) throw new NotFoundError("Event")
  return event
}

async function uniqueSlug(base: string, excludeId?: string) {
  let slug = base || "event"
  for (let i = 2; ; i++) {
    const clash = await prisma.event.findFirst({ where: { slug, NOT: excludeId ? { id: excludeId } : undefined } })
    if (!clash) return slug
    slug = `${base}-${i}`
  }
}

export async function saveEvent(actor: Actor, id: string | null, input: Record<string, unknown>) {
  assertCan(actor, "events:manage")
  const parsed = eventInputSchema.safeParse(input)
  if (!parsed.success) return { ok: false as const, errors: flattenErrors(parsed.error) }
  const { slug: requestedSlug, ...data } = parsed.data
  const slug = await uniqueSlug(requestedSlug || slugify(data.title), id ?? undefined)
  if (id) {
    await prisma.event.update({ where: { id }, data: { ...data, slug } })
    await audit(actor, "event.update", "Event", id)
    return { ok: true as const, id }
  }
  const created = await prisma.event.create({ data: { ...data, slug } })
  await audit(actor, "event.create", "Event", created.id)
  return { ok: true as const, id: created.id }
}

export async function setEventStatus(actor: Actor, id: string, status: string) {
  assertCan(actor, "events:manage")
  if (!(EVENT_STATUSES as readonly string[]).includes(status)) throw new Error("Invalid status")
  const event = await prisma.event.findUnique({ where: { id }, select: { publishedAt: true, status: true } })
  if (!event) throw new NotFoundError("Event")
  await prisma.event.update({
    where: { id },
    data: {
      status: status as EventStatus,
      publishedAt: status === "PUBLISHED" && !event.publishedAt ? new Date() : event.publishedAt,
    },
  })
  await audit(actor, `event.${status.toLowerCase()}`, "Event", id, { from: event.status })
}

export async function deleteEvent(actor: Actor, id: string) {
  assertCan(actor, "events:manage")
  const count = await prisma.eventRegistration.count({ where: { eventId: id } })
  if (count > 0) throw new Error("This event has registrations. Archive it instead, or remove registrations first.")
  await prisma.event.delete({ where: { id } })
  await audit(actor, "event.delete", "Event", id)
}

export async function listRegistrations(actor: Actor, eventId: string) {
  assertCan(actor, "registrations:manage")
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    select: { id: true, title: true, capacity: true, startsAt: true, status: true, slug: true },
  })
  if (!event) throw new NotFoundError("Event")
  const registrations = await prisma.eventRegistration.findMany({
    where: { eventId },
    orderBy: { createdAt: "asc" },
  })
  return { event, registrations }
}

export async function setRegistrationStatus(actor: Actor, registrationId: string, status: "CONFIRMED" | "CANCELLED") {
  assertCan(actor, "registrations:manage")
  return prisma.$transaction(async (tx) => {
    const reg = await tx.eventRegistration.findUnique({ where: { id: registrationId } })
    if (!reg) throw new NotFoundError("Registration")
    if (status === "CONFIRMED" && reg.status !== "CONFIRMED") {
      await tx.$queryRaw`SELECT "id" FROM "Event" WHERE "id" = ${reg.eventId} FOR UPDATE`
      const event = await tx.event.findUniqueOrThrow({ where: { id: reg.eventId }, select: { capacity: true } })
      const confirmed = await tx.eventRegistration.count({ where: { eventId: reg.eventId, status: "CONFIRMED" } })
      if (event.capacity != null && confirmed >= event.capacity) throw new Error("The event is at capacity")
    }
    await tx.eventRegistration.update({ where: { id: registrationId }, data: { status } })
    await audit(actor, `registration.${status.toLowerCase()}`, "EventRegistration", registrationId, { eventId: reg.eventId }, tx)
    return reg.eventId
  })
}

export async function exportRegistrations(actor: Actor, eventId: string) {
  assertCan(actor, "registrations:export")
  const { event, registrations } = await listRegistrations(actor, eventId)
  await audit(actor, "registration.export", "Event", eventId, { count: registrations.length })
  return {
    event,
    rows: registrations.map((r) => ({
      name: r.name,
      email: r.email,
      phone: r.phone ?? "",
      organisation: r.organisation ?? "",
      role: r.role ?? "",
      status: r.status,
      registered: r.createdAt.toISOString(),
    })),
  }
}
