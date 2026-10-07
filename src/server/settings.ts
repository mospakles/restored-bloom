import "server-only"
import { z } from "zod"
import { prisma } from "@/lib/db"
import { PROGRAMMES } from "@/lib/content"
import { assertCan, audit, type Actor } from "@/server/actor"

const programmeStatus = z.enum(["planned", "piloting", "operating"])

const optionalUrl = z
  .string()
  .trim()
  .max(200)
  .refine((v) => v === "" || /^https:\/\/[^\s]+$/.test(v), "Use a full https:// address")
  .default("")

export const siteSettingsSchema = z.object({
  contactEmail: z
    .string()
    .trim()
    .max(254)
    .refine((v) => v === "" || z.email().safeParse(v).success, "Enter a valid email address")
    .default(""),
  contactPhone: z.string().trim().max(40).default(""),
  officeHours: z.string().trim().max(160).default(""),
  location: z.string().trim().max(160).default("Lagos, Nigeria"),
  instagram: optionalUrl,
  facebook: optionalUrl,
  x: optionalUrl,
  linkedin: optionalUrl,
  /** Optional registration line, e.g. a CAC number, only once verified. */
  registrationNotice: z.string().trim().max(200).default(""),
  founderBio: z.string().trim().max(4000).default(""),
  founderBioApproved: z.boolean().default(false),
  newsletterEnabled: z.boolean().default(false),
  programmeStatus: z
    .record(z.string(), programmeStatus)
    .default({})
    .transform((rec) => Object.fromEntries(PROGRAMMES.map((p) => [p.id, rec[p.id] ?? "planned"])) as Record<string, z.infer<typeof programmeStatus>>),
  retentionMonths: z.number().int().min(1).max(120).default(24),
})

export type SiteSettings = z.infer<typeof siteSettingsSchema>

const KEY = "site"

export async function getSettings(): Promise<SiteSettings> {
  const row = await prisma.setting.findUnique({ where: { key: KEY } })
  const parsed = siteSettingsSchema.safeParse(row?.value ?? {})
  return parsed.success ? parsed.data : siteSettingsSchema.parse({})
}

export async function updateSettings(actor: Actor, input: unknown) {
  assertCan(actor, "settings:manage")
  const parsed = siteSettingsSchema.safeParse(input)
  if (!parsed.success) return { ok: false as const, error: parsed.error }
  const before = await getSettings()
  const changed = Object.keys(parsed.data).filter(
    (k) => JSON.stringify(before[k as keyof SiteSettings]) !== JSON.stringify(parsed.data[k as keyof SiteSettings]),
  )
  await prisma.setting.upsert({
    where: { key: KEY },
    create: { key: KEY, value: parsed.data },
    update: { value: parsed.data },
  })
  await audit(actor, "settings.update", "Setting", KEY, { changed })
  return { ok: true as const }
}
