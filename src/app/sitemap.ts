import { MetadataRoute } from "next"
import { SITE_CONFIG, SAMPLE_RESOURCES } from "@/lib/data"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_CONFIG.url

  const staticPages = [
    "", "about", "mission", "get-help", "resources", "anonymous-stories",
    "volunteer", "contact", "faq", "donate", "partnerships",
    "sexual-abuse-support", "womens-health", "teen-support", "parent-resources", "faith-healing",
    "privacy", "terms", "safeguarding", "child-protection",
    "auth/login", "auth/register",
  ].map((path) => ({
    url: `${base}/${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }))

  const resourcePages = SAMPLE_RESOURCES.map((r) => ({
    url: `${base}/resources/${r.slug}`,
    lastModified: new Date(r.updated_at),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  return [...staticPages, ...resourcePages]
}
