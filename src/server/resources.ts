import "server-only"
import { z } from "zod"
import { prisma } from "@/lib/db"
import type { Prisma, PublishStatus, ResourceCategory } from "@/generated/prisma/client"
import { flattenErrors } from "@/lib/validation"
import { slugify } from "@/lib/utils"
import { can } from "@/lib/permissions"
import { assertCan, audit, NotFoundError, type Actor } from "@/server/actor"

export const RESOURCE_CATEGORIES = ["CHILDREN", "TEENAGERS", "PARENTS", "EDUCATORS", "SURVIVORS"] as const
export const PUBLISH_STATUSES = ["DRAFT", "PUBLISHED", "ARCHIVED"] as const

// ─── Public ──────────────────────────────────────────────────────────────────

export async function searchResources({ q, category }: { q?: string; category?: string }) {
  const where: Prisma.ResourceWhereInput = { status: "PUBLISHED" }
  if (category && (RESOURCE_CATEGORIES as readonly string[]).includes(category)) {
    where.category = category as ResourceCategory
  }
  const query = q?.trim().slice(0, 100)
  if (query) {
    where.OR = [
      { title: { contains: query, mode: "insensitive" } },
      { summary: { contains: query, mode: "insensitive" } },
      { body: { contains: query, mode: "insensitive" } },
    ]
  }
  return prisma.resource.findMany({
    where,
    orderBy: { publishedAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      summary: true,
      category: true,
      publishedAt: true,
      file: { select: { id: true, filename: true, mimeType: true, size: true } },
    },
  })
}

export async function getPublishedResource(slug: string) {
  return prisma.resource.findFirst({
    where: { slug, status: "PUBLISHED" },
    include: { file: { select: { id: true, filename: true, mimeType: true, size: true } } },
  })
}

/** A file is downloadable by the public only when its resource is published. Staff can preview drafts. */
export async function getDownloadableFile(fileId: string, actor: Actor | null) {
  const file = await prisma.resourceFile.findUnique({
    where: { id: fileId },
    include: { resource: { select: { status: true } } },
  })
  if (!file) return null
  const isPublic = file.resource?.status === "PUBLISHED"
  if (!isPublic && !(actor && can(actor.role, "resources:manage"))) return null
  return file
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

export const resourceInputSchema = z.object({
  title: z.string().trim().min(3, "Title is required").max(160),
  slug: z
    .string()
    .trim()
    .max(80)
    .optional()
    .transform((v) => (v ? slugify(v) : undefined)),
  summary: z.string().trim().min(10, "Add a short summary (at least 10 characters)").max(300),
  body: z.string().trim().max(50000).default(""),
  category: z.enum(RESOURCE_CATEGORIES, "Choose a category"),
  reviewNote: z
    .string()
    .trim()
    .max(500)
    .optional()
    .transform((v) => v || null),
})

export async function listAdminResources(actor: Actor) {
  assertCan(actor, "resources:manage")
  return prisma.resource.findMany({
    orderBy: { updatedAt: "desc" },
    select: { id: true, title: true, slug: true, category: true, status: true, updatedAt: true, fileId: true },
  })
}

export async function getAdminResource(actor: Actor, id: string) {
  assertCan(actor, "resources:manage")
  const r = await prisma.resource.findUnique({
    where: { id },
    include: { file: { select: { id: true, filename: true, mimeType: true, size: true } } },
  })
  if (!r) throw new NotFoundError("Resource")
  return r
}

async function uniqueSlug(base: string, excludeId?: string) {
  let slug = base || "resource"
  for (let i = 2; ; i++) {
    const clash = await prisma.resource.findFirst({ where: { slug, NOT: excludeId ? { id: excludeId } : undefined } })
    if (!clash) return slug
    slug = `${base}-${i}`
  }
}

export async function saveResource(actor: Actor, id: string | null, input: Record<string, unknown>) {
  assertCan(actor, "resources:manage")
  const parsed = resourceInputSchema.safeParse(input)
  if (!parsed.success) return { ok: false as const, errors: flattenErrors(parsed.error) }
  const { slug: requested, ...data } = parsed.data
  const slug = await uniqueSlug(requested || slugify(data.title), id ?? undefined)
  if (id) {
    await prisma.resource.update({ where: { id }, data: { ...data, slug } })
    await audit(actor, "resource.update", "Resource", id)
    return { ok: true as const, id }
  }
  const created = await prisma.resource.create({ data: { ...data, slug } })
  await audit(actor, "resource.create", "Resource", created.id)
  return { ok: true as const, id: created.id }
}

export async function setResourceStatus(actor: Actor, id: string, status: string) {
  assertCan(actor, "resources:manage")
  if (!(PUBLISH_STATUSES as readonly string[]).includes(status)) throw new Error("Invalid status")
  const r = await prisma.resource.findUnique({ where: { id }, select: { status: true, publishedAt: true, body: true, fileId: true } })
  if (!r) throw new NotFoundError("Resource")
  if (status === "PUBLISHED" && !r.body.trim() && !r.fileId) {
    throw new Error("Add some content or attach a file before publishing")
  }
  await prisma.resource.update({
    where: { id },
    data: {
      status: status as PublishStatus,
      publishedAt: status === "PUBLISHED" && !r.publishedAt ? new Date() : r.publishedAt,
    },
  })
  await audit(actor, `resource.${status.toLowerCase()}`, "Resource", id, { from: r.status })
}

export async function deleteResource(actor: Actor, id: string) {
  assertCan(actor, "resources:manage")
  const r = await prisma.resource.delete({ where: { id }, select: { fileId: true } })
  if (r.fileId) await prisma.resourceFile.delete({ where: { id: r.fileId } }).catch(() => {})
  await audit(actor, "resource.delete", "Resource", id)
}

// ─── Uploads ─────────────────────────────────────────────────────────────────

export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024

const SIGNATURES: { mime: string; ext: string; test: (b: Uint8Array) => boolean }[] = [
  { mime: "application/pdf", ext: "pdf", test: (b) => b[0] === 0x25 && b[1] === 0x50 && b[2] === 0x44 && b[3] === 0x46 },
  {
    mime: "image/png",
    ext: "png",
    test: (b) => b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47,
  },
  { mime: "image/jpeg", ext: "jpg", test: (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
]

/** Detects the real file type from its leading bytes: the browser-supplied type is not trusted. */
export function detectFileType(bytes: Uint8Array) {
  return SIGNATURES.find((s) => s.test(bytes)) ?? null
}

export function safeFilename(name: string, ext: string): string {
  const base = name
    .replace(/\.[^.]*$/, "")
    .replace(/[^a-zA-Z0-9 _-]/g, "")
    .trim()
    .slice(0, 80)
  return `${base || "download"}.${ext}`
}

export async function attachResourceFile(actor: Actor, resourceId: string, file: File) {
  assertCan(actor, "resources:manage")
  if (file.size === 0) throw new Error("The file is empty")
  if (file.size > MAX_UPLOAD_BYTES) throw new Error("Files must be 8 MB or smaller")
  const bytes = new Uint8Array(await file.arrayBuffer())
  const type = detectFileType(bytes)
  if (!type) throw new Error("Only PDF, PNG or JPEG files can be uploaded")

  const resource = await prisma.resource.findUnique({ where: { id: resourceId }, select: { fileId: true } })
  if (!resource) throw new NotFoundError("Resource")

  await prisma.$transaction(async (tx) => {
    const created = await tx.resourceFile.create({
      data: { filename: safeFilename(file.name, type.ext), mimeType: type.mime, size: bytes.byteLength, data: bytes },
    })
    await tx.resource.update({ where: { id: resourceId }, data: { fileId: created.id } })
    if (resource.fileId) await tx.resourceFile.delete({ where: { id: resource.fileId } })
  })
  await audit(actor, "resource.file.attach", "Resource", resourceId, { mimeType: type.mime, size: bytes.byteLength })
}

export async function removeResourceFile(actor: Actor, resourceId: string) {
  assertCan(actor, "resources:manage")
  const r = await prisma.resource.findUnique({ where: { id: resourceId }, select: { fileId: true } })
  if (!r?.fileId) return
  await prisma.$transaction([
    prisma.resource.update({ where: { id: resourceId }, data: { fileId: null } }),
    prisma.resourceFile.delete({ where: { id: r.fileId } }),
  ])
  await audit(actor, "resource.file.remove", "Resource", resourceId)
}
