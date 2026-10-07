import type { Metadata } from "next"
import Link from "next/link"
import { connection } from "next/server"
import { FileDown, Search } from "lucide-react"
import { Badge, Container, Notice } from "@/components/ui/misc"
import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/site/blocks"
import { RESOURCE_CATEGORY_LABELS, RESOURCE_CATEGORY_SLUGS } from "@/lib/content"
import { cn, formatDate } from "@/lib/utils"
import { searchResources } from "@/server/resources"

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Reviewed, age-appropriate resources on body safety and abuse prevention for children, teenagers, parents, educators and survivors.",
}

type SearchParams = Promise<{ q?: string; category?: string }>

export default async function ResourcesPage({ searchParams }: { searchParams: SearchParams }) {
  await connection()
  const { q = "", category = "" } = await searchParams
  const categoryKey = RESOURCE_CATEGORY_SLUGS[category as keyof typeof RESOURCE_CATEGORY_SLUGS]
  const resources = await searchResources({ q, category: categoryKey })
  const filtered = Boolean(q || categoryKey)

  const chip = (slug: string, label: string) => {
    const params = new URLSearchParams()
    if (q) params.set("q", q)
    if (slug) params.set("category", slug)
    const active = slug === (categoryKey ? category : "")
    return (
      <li key={slug || "all"}>
        <Link
          href={`/resources${params.size ? `?${params}` : ""}`}
          aria-current={active ? "page" : undefined}
          className={cn(
            "inline-block rounded-full border px-4 py-2 text-sm font-medium transition-colors",
            active ? "border-plum-800 bg-plum-800 text-cream-50" : "border-cream-300 bg-white text-plum-800 hover:border-plum-300",
          )}
        >
          {label}
        </Link>
      </li>
    )
  }

  return (
    <>
      <PageHero eyebrow="Resource hub" title="Resources for safer childhoods">
        <p>
          Articles and downloadable materials for children, teenagers, parents, educators and survivors. Every
          resource is reviewed for accuracy and age-appropriateness before it&apos;s published.
        </p>
      </PageHero>

      <Container className="py-12">
        <form role="search" action="/resources" className="flex flex-col gap-3 sm:flex-row">
          {categoryKey && <input type="hidden" name="category" value={category} />}
          <label htmlFor="resource-search" className="sr-only">
            Search resources
          </label>
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-plum-400" aria-hidden="true" />
            <input
              id="resource-search"
              type="search"
              name="q"
              defaultValue={q}
              maxLength={100}
              placeholder="Search resources"
              className="h-12 w-full rounded-full border border-cream-400 bg-white pl-12 pr-4 text-plum-950 placeholder:text-plum-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300"
            />
          </div>
          <Button type="submit" size="lg" className="h-12">
            Search
          </Button>
        </form>

        <nav aria-label="Resource categories" className="mt-6">
          <ul className="flex flex-wrap gap-2">
            {chip("", "All")}
            {Object.entries(RESOURCE_CATEGORY_SLUGS).map(([slug, key]) => chip(slug, RESOURCE_CATEGORY_LABELS[key]))}
          </ul>
        </nav>

        <p className="mt-8 text-sm text-plum-600" role="status">
          {resources.length === 0
            ? filtered
              ? "No resources match your search."
              : ""
            : `${resources.length} ${resources.length === 1 ? "resource" : "resources"}${filtered ? " found" : ""}`}
        </p>

        {resources.length === 0 ? (
          <div className="mt-4 rounded-[2rem] border border-dashed border-cream-400 bg-white p-10 text-center">
            <h2 className="text-2xl text-plum-900">{filtered ? "Nothing found" : "Resources are on their way"}</h2>
            <p className="mx-auto mt-3 max-w-lg leading-relaxed text-plum-700">
              {filtered ? (
                <>
                  Try a different search, or{" "}
                  <Link href="/resources" className="font-semibold text-rose-700 underline underline-offset-4">
                    view all resources
                  </Link>
                  .
                </>
              ) : (
                "We're preparing and reviewing our first resources. Please check back soon."
              )}
            </p>
          </div>
        ) : (
          <ul className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((r) => (
              <li key={r.id}>
                <article className="relative flex h-full flex-col rounded-3xl card-soft p-6 transition-shadow hover:shadow-md">
                  <Badge tone="rose" className="self-start">
                    {RESOURCE_CATEGORY_LABELS[r.category]}
                  </Badge>
                  <h2 className="mt-4 text-xl text-plum-900">
                    <Link href={`/resources/${r.slug}`} className="after:absolute after:inset-0 after:rounded-3xl">
                      {r.title}
                    </Link>
                  </h2>
                  <p className="mt-2 flex-1 leading-relaxed text-plum-700">{r.summary}</p>
                  <div className="mt-5 flex items-center justify-between text-sm text-plum-600">
                    {r.publishedAt && <time dateTime={r.publishedAt.toISOString()}>{formatDate(r.publishedAt)}</time>}
                    {r.file && (
                      <span className="inline-flex items-center gap-1">
                        <FileDown className="h-4 w-4" aria-hidden="true" /> Download available
                      </span>
                    )}
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}

        <Notice tone="info" className="mt-12">
          These resources are for general awareness and education. They are not a substitute for advice from a
          qualified professional. If you&apos;re worried about a child&apos;s immediate safety, contact local emergency
          services.
        </Notice>
      </Container>
    </>
  )
}
