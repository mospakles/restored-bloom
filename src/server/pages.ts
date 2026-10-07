import "server-only"
import { z } from "zod"
import { prisma } from "@/lib/db"
import { EDITABLE_PAGES, type EditablePageSlug } from "@/lib/default-pages"
import { flattenErrors } from "@/lib/validation"
import { assertCan, audit, NotFoundError, type Actor } from "@/server/actor"
import type { SupportContactKind } from "@/generated/prisma/client"

export function isEditableSlug(slug: string): slug is EditablePageSlug {
  return slug in EDITABLE_PAGES
}

/** Returns the saved page, or the built-in draft when nothing has been saved yet. */
export async function getPage(slug: EditablePageSlug) {
  const saved = await prisma.page.findUnique({ where: { slug } })
  const fallback = EDITABLE_PAGES[slug]
  return {
    slug,
    title: saved?.title ?? fallback.title,
    body: saved?.body ?? fallback.body,
    reviewed: saved?.reviewed ?? false,
    reviewedAt: saved?.reviewedAt ?? null,
    reviewNote: saved?.reviewNote ?? null,
    updatedAt: saved?.updatedAt ?? null,
    path: fallback.path,
  }
}

export async function listPages(actor: Actor) {
  assertCan(actor, "content:manage")
  return Promise.all((Object.keys(EDITABLE_PAGES) as EditablePageSlug[]).map((slug) => getPage(slug)))
}

const pageInput = z.object({
  title: z.string().trim().min(2, "Title is required").max(120),
  body: z.string().trim().min(20, "Page content is too short").max(60000),
  reviewed: z.preprocess((v) => v === "on" || v === true, z.boolean()),
  reviewNote: z
    .string()
    .trim()
    .max(300)
    .optional()
    .transform((v) => v || null),
})

export async function savePage(actor: Actor, slug: string, input: Record<string, unknown>) {
  assertCan(actor, "content:manage")
  if (!isEditableSlug(slug)) throw new NotFoundError("Page")
  const parsed = pageInput.safeParse(input)
  if (!parsed.success) return { ok: false as const, errors: flattenErrors(parsed.error) }
  if (parsed.data.reviewed && !parsed.data.reviewNote) {
    return { ok: false as const, errors: { reviewNote: "Record who reviewed this page and when" } }
  }
  const existing = await prisma.page.findUnique({ where: { slug }, select: { reviewed: true, reviewedAt: true } })
  const reviewedAt = parsed.data.reviewed ? (existing?.reviewed ? existing.reviewedAt : new Date()) : null
  await prisma.page.upsert({
    where: { slug },
    create: { slug, ...parsed.data, reviewedAt },
    update: { ...parsed.data, reviewedAt },
  })
  await audit(actor, "page.update", "Page", slug, { reviewed: parsed.data.reviewed })
  return { ok: true as const }
}

// ─── Support contacts ────────────────────────────────────────────────────────

export const SUPPORT_KINDS = ["EMERGENCY", "HELPLINE", "REFERRAL"] as const

/** Only verified AND published contacts are ever shown publicly. */
export async function listPublicSupportContacts() {
  return prisma.supportContact.findMany({
    where: { verified: true, published: true },
    orderBy: [{ kind: "asc" }, { sortOrder: "asc" }, { name: "asc" }],
  })
}

export async function listSupportContacts(actor: Actor) {
  assertCan(actor, "support-contacts:manage")
  return prisma.supportContact.findMany({ orderBy: [{ kind: "asc" }, { sortOrder: "asc" }, { name: "asc" }] })
}

const contactInput = z
  .object({
    name: z.string().trim().min(2, "Name is required").max(160),
    kind: z.enum(SUPPORT_KINDS),
    description: z.string().trim().min(5, "Add a short description").max(600),
    phone: z
      .string()
      .trim()
      .max(60)
      .optional()
      .transform((v) => v || null),
    website: z
      .string()
      .trim()
      .max(200)
      .optional()
      .transform((v) => v || null)
      .refine((v) => v === null || /^https:\/\/\S+$/.test(v), "Use a full https:// address"),
    area: z
      .string()
      .trim()
      .max(120)
      .optional()
      .transform((v) => v || null),
    relationship: z.string().trim().min(5, "Describe the relationship").max(200),
    verified: z.preprocess((v) => v === "on" || v === true, z.boolean()),
    verifiedNote: z
      .string()
      .trim()
      .max(300)
      .optional()
      .transform((v) => v || null),
    published: z.preprocess((v) => v === "on" || v === true, z.boolean()),
    sortOrder: z.coerce.number().int().min(0).max(999).default(0),
  })
  .refine((v) => !v.verified || v.verifiedNote, {
    path: ["verifiedNote"],
    message: "Record how and when the details were verified",
  })
  .refine((v) => !v.published || v.verified, {
    path: ["published"],
    message: "Contacts must be verified before they can be published",
  })

export async function saveSupportContact(actor: Actor, id: string | null, input: Record<string, unknown>) {
  assertCan(actor, "support-contacts:manage")
  const parsed = contactInput.safeParse(input)
  if (!parsed.success) return { ok: false as const, errors: flattenErrors(parsed.error) }
  const data = { ...parsed.data, kind: parsed.data.kind as SupportContactKind }
  if (id) {
    const existing = await prisma.supportContact.findUnique({ where: { id }, select: { verified: true, verifiedAt: true } })
    if (!existing) throw new NotFoundError("Support contact")
    await prisma.supportContact.update({
      where: { id },
      data: { ...data, verifiedAt: data.verified ? (existing.verified ? existing.verifiedAt : new Date()) : null },
    })
    await audit(actor, "support-contact.update", "SupportContact", id, { verified: data.verified, published: data.published })
    return { ok: true as const, id }
  }
  const created = await prisma.supportContact.create({
    data: { ...data, verifiedAt: data.verified ? new Date() : null },
  })
  await audit(actor, "support-contact.create", "SupportContact", created.id)
  return { ok: true as const, id: created.id }
}

export async function deleteSupportContact(actor: Actor, id: string) {
  assertCan(actor, "support-contacts:manage")
  await prisma.supportContact.delete({ where: { id } })
  await audit(actor, "support-contact.delete", "SupportContact", id)
}
