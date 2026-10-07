import "server-only"
import { randomInt } from "node:crypto"
import type { z } from "zod"
import { prisma } from "@/lib/db"
import { Prisma, type EnquiryStatus, type EnquiryType } from "@/generated/prisma/client"
import {
  CONSENT_VERSION,
  contactEnquirySchema,
  flattenErrors,
  involvesChildren,
  outreachRequestSchema,
  partnerEnquirySchema,
  sponsorEnquirySchema,
  volunteerEnquirySchema,
  type FieldErrors,
} from "@/lib/validation"
import { ENQUIRY_STATUSES, ENQUIRY_TYPES, describeDetails } from "@/lib/enquiry-display"
import { assertCan, audit, NotFoundError, type Actor } from "@/server/actor"
import { can } from "@/lib/permissions"

// ─── Public submission ───────────────────────────────────────────────────────

type Mapped = {
  name: string
  email: string
  phone?: string
  organisation?: string
  message?: string
  details: Prisma.InputJsonObject
}

const SCHEMAS = {
  OUTREACH: outreachRequestSchema,
  VOLUNTEER: volunteerEnquirySchema,
  PARTNER: partnerEnquirySchema,
  SPONSOR: sponsorEnquirySchema,
  CONTACT: contactEnquirySchema,
} satisfies Record<EnquiryType, z.ZodType>

function map(type: EnquiryType, data: Record<string, unknown>): Mapped {
  const s = (k: string) => (typeof data[k] === "string" ? (data[k] as string) : undefined)
  switch (type) {
    case "OUTREACH":
      return {
        name: s("contactName")!,
        email: s("email")!,
        phone: s("phone"),
        organisation: s("organisation"),
        message: s("logistics"),
        details: {
          hostType: s("hostType")!,
          contactRole: s("contactRole")!,
          location: s("location")!,
          audiences: data.audiences as string[],
          involvesChildren: involvesChildren(data.audiences as string[]),
          participants: s("participants")!,
          support: s("support")!,
          preferredDates: s("preferredDates")!,
        },
      }
    case "VOLUNTEER":
      return {
        name: s("name")!,
        email: s("email")!,
        phone: s("phone"),
        message: s("message"),
        details: {
          location: s("location")!,
          areas: data.areas as string[],
          background: s("background") ?? null,
          availability: s("availability") ?? null,
          screeningAcknowledged: true,
        },
      }
    case "PARTNER":
      return {
        name: s("name")!,
        email: s("email")!,
        phone: s("phone"),
        organisation: s("organisation"),
        message: s("message"),
        details: {
          organisationType: s("organisationType")!,
          role: s("role")!,
          website: s("website") ?? null,
          interests: data.interests as string[],
        },
      }
    case "SPONSOR":
      return {
        name: s("name")!,
        email: s("email")!,
        phone: s("phone"),
        organisation: s("organisation"),
        message: s("message"),
        details: { sponsorType: s("sponsorType")!, interests: data.interests as string[] },
      }
    case "CONTACT":
      return {
        name: s("name")!,
        email: s("email")!,
        phone: s("phone"),
        message: s("message"),
        details: { topic: s("topic")! },
      }
  }
}

const REF_PREFIX: Record<EnquiryType, string> = {
  OUTREACH: "OUT",
  VOLUNTEER: "VOL",
  PARTNER: "PTN",
  SPONSOR: "SPN",
  CONTACT: "GEN",
}
const REF_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"

export function generateReference(type: EnquiryType): string {
  let code = ""
  for (let i = 0; i < 6; i++) code += REF_ALPHABET[randomInt(REF_ALPHABET.length)]
  return `RB-${REF_PREFIX[type]}-${code}`
}

export type SubmitResult =
  | { ok: true; reference: string; id: string; email: string }
  | { ok: false; errors: FieldErrors }

/** Validates and stores a public enquiry. Callers must apply spam/rate-limit checks first. */
export async function submitEnquiry(type: EnquiryType, input: Record<string, unknown>): Promise<SubmitResult> {
  const parsed = SCHEMAS[type].safeParse(input)
  if (!parsed.success) return { ok: false, errors: flattenErrors(parsed.error) }
  const mapped = map(type, parsed.data as Record<string, unknown>)

  for (let attempt = 0; attempt < 5; attempt++) {
    const reference = generateReference(type)
    try {
      const created = await prisma.enquiry.create({
        data: {
          ...mapped,
          type,
          reference,
          consentVersion: CONSENT_VERSION,
          consentAt: new Date(),
        },
        select: { id: true, reference: true },
      })
      return { ok: true, reference: created.reference, id: created.id, email: mapped.email }
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") continue
      throw e
    }
  }
  throw new Error("Could not allocate an enquiry reference")
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

export type EnquiryFilters = {
  type?: string
  status?: string
  assigned?: string // "me" | "unassigned" | userId
  q?: string
  page?: number
}

const PAGE_SIZE = 25

function buildWhere(actor: Actor, f: EnquiryFilters): Prisma.EnquiryWhereInput {
  const where: Prisma.EnquiryWhereInput = {}
  if (f.type && (ENQUIRY_TYPES as readonly string[]).includes(f.type)) where.type = f.type as EnquiryType
  if (f.status && (ENQUIRY_STATUSES as readonly string[]).includes(f.status)) where.status = f.status as EnquiryStatus
  else if (f.status !== "all") where.status = { not: "CLOSED" }
  if (f.assigned === "me") where.assignedToId = actor.id
  else if (f.assigned === "unassigned") where.assignedToId = null
  else if (f.assigned) where.assignedToId = f.assigned
  const q = f.q?.trim().slice(0, 100)
  if (q) {
    where.OR = [
      { reference: { contains: q, mode: "insensitive" } },
      { name: { contains: q, mode: "insensitive" } },
      { email: { contains: q, mode: "insensitive" } },
      { organisation: { contains: q, mode: "insensitive" } },
    ]
  }
  return where
}

export async function listEnquiries(actor: Actor, filters: EnquiryFilters) {
  assertCan(actor, "enquiries:read")
  const where = buildWhere(actor, filters)
  const page = Math.max(1, Math.floor(filters.page ?? 1))
  const [items, total] = await Promise.all([
    prisma.enquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: {
        id: true,
        reference: true,
        type: true,
        status: true,
        name: true,
        organisation: true,
        createdAt: true,
        assignedTo: { select: { id: true, name: true } },
      },
    }),
    prisma.enquiry.count({ where }),
  ])
  return { items, total, page, pageCount: Math.max(1, Math.ceil(total / PAGE_SIZE)) }
}

export async function getEnquiry(actor: Actor, id: string) {
  assertCan(actor, "enquiries:read")
  const enquiry = await prisma.enquiry.findUnique({
    where: { id },
    include: {
      assignedTo: { select: { id: true, name: true } },
      notes: { orderBy: { createdAt: "asc" }, include: { author: { select: { name: true } } } },
    },
  })
  if (!enquiry) throw new NotFoundError("Enquiry")
  await audit(actor, "enquiry.view", "Enquiry", id)
  // Private notes are stripped unless the role may read them.
  return { ...enquiry, notes: can(actor.role, "notes:read") ? enquiry.notes : [] }
}

export async function updateEnquiryStatus(actor: Actor, id: string, status: string) {
  assertCan(actor, "enquiries:update")
  if (!(ENQUIRY_STATUSES as readonly string[]).includes(status)) throw new Error("Invalid status")
  const existing = await prisma.enquiry.findUnique({ where: { id }, select: { status: true } })
  if (!existing) throw new NotFoundError("Enquiry")
  await prisma.enquiry.update({
    where: { id },
    data: { status: status as EnquiryStatus, closedAt: status === "CLOSED" ? new Date() : null },
  })
  await audit(actor, "enquiry.status", "Enquiry", id, { from: existing.status, to: status })
}

export async function assignEnquiry(actor: Actor, id: string, assigneeId: string | null) {
  assertCan(actor, "enquiries:update")
  if (assigneeId) {
    const assignee = await prisma.user.findUnique({ where: { id: assigneeId }, select: { active: true, role: true } })
    if (!assignee?.active || !can(assignee.role, "enquiries:read")) throw new Error("That person cannot be assigned enquiries")
  }
  await prisma.enquiry.update({ where: { id }, data: { assignedToId: assigneeId } })
  await audit(actor, "enquiry.assign", "Enquiry", id, { assigneeId })
}

export async function addNote(actor: Actor, enquiryId: string, body: string) {
  assertCan(actor, "notes:write")
  const text = body.trim()
  if (text.length < 1 || text.length > 4000) throw new Error("Notes must be between 1 and 4,000 characters")
  const note = await prisma.enquiryNote.create({ data: { enquiryId, authorId: actor.id, body: text } })
  await audit(actor, "enquiry.note.add", "Enquiry", enquiryId, { noteId: note.id })
  return note
}

export async function deleteEnquiry(actor: Actor, id: string) {
  assertCan(actor, "enquiries:delete")
  const e = await prisma.enquiry.delete({ where: { id }, select: { reference: true, type: true } })
  await audit(actor, "enquiry.delete", "Enquiry", id, { reference: e.reference, type: e.type })
}

export async function assignableStaff() {
  const users = await prisma.user.findMany({
    where: { active: true },
    select: { id: true, name: true, role: true },
    orderBy: { name: "asc" },
  })
  return users.filter((u) => can(u.role, "enquiries:read"))
}

/** Rows for CSV export. Notes are excluded, they are internal working notes. */
export async function exportEnquiries(actor: Actor, filters: EnquiryFilters) {
  assertCan(actor, "enquiries:export")
  const where = buildWhere(actor, { ...filters, status: filters.status ?? "all" })
  const rows = await prisma.enquiry.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { assignedTo: { select: { name: true } } },
    take: 10_000,
  })
  await audit(actor, "enquiry.export", "Enquiry", null, { count: rows.length, type: filters.type ?? "all" })
  return rows.map((r) => ({
    reference: r.reference,
    type: r.type,
    status: r.status,
    received: r.createdAt.toISOString(),
    name: r.name,
    email: r.email,
    phone: r.phone ?? "",
    organisation: r.organisation ?? "",
    details: describeDetails(r.type, r.details)
      .map((d) => `${d.label}: ${d.value}`)
      .join(" | "),
    message: r.message ?? "",
    assigned_to: r.assignedTo?.name ?? "",
  }))
}

export async function enquiryCounts() {
  const grouped = await prisma.enquiry.groupBy({ by: ["type", "status"], _count: { _all: true } })
  return grouped.map((g) => ({ type: g.type, status: g.status, count: g._count._all }))
}
