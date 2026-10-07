import type { MetadataRoute } from "next"
import { connection } from "next/server"
import { prisma } from "@/lib/db"

const STATIC_PATHS = [
  "",
  "/about",
  "/programmes",
  "/invite-us",
  "/get-involved",
  "/support-our-work",
  "/resources",
  "/events",
  "/contact",
  "/support",
  "/policies/privacy",
  "/policies/safeguarding",
  "/policies/terms",
  "/policies/accessibility",
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connection()
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "")
  const [resources, events] = await Promise.all([
    prisma.resource.findMany({ where: { status: "PUBLISHED" }, select: { slug: true, updatedAt: true } }),
    prisma.event.findMany({ where: { status: { in: ["PUBLISHED", "CANCELLED"] } }, select: { slug: true, updatedAt: true } }),
  ])
  return [
    ...STATIC_PATHS.map((p) => ({ url: `${base}${p}`, priority: p === "" ? 1 : 0.7 })),
    ...resources.map((r) => ({ url: `${base}/resources/${r.slug}`, lastModified: r.updatedAt, priority: 0.6 })),
    ...events.map((e) => ({ url: `${base}/events/${e.slug}`, lastModified: e.updatedAt, priority: 0.5 })),
  ]
}
