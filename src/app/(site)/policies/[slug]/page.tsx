import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { connection } from "next/server"
import { Container } from "@/components/ui/misc"
import { PageHero } from "@/components/site/blocks"
import { Markdown } from "@/components/site/markdown"
import { ReviewBanner } from "@/components/site/review-banner"
import { formatDate } from "@/lib/utils"
import { getPage } from "@/server/pages"

const POLICY_SLUGS = ["privacy", "safeguarding", "terms", "accessibility"] as const
type PolicySlug = (typeof POLICY_SLUGS)[number]
const isPolicy = (s: string): s is PolicySlug => (POLICY_SLUGS as readonly string[]).includes(s)

type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  if (!isPolicy(slug)) return {}
  await connection()
  const page = await getPage(slug)
  return { title: page.title }
}

export default async function PolicyPage({ params }: { params: Params }) {
  await connection()
  const { slug } = await params
  if (!isPolicy(slug)) notFound()
  const page = await getPage(slug)
  return (
    <>
      <PageHero accent="lagoon" art="shield" eyebrow="Policies" title={page.title} />
      <Container className="max-w-3xl py-12">
        <ReviewBanner reviewed={page.reviewed} />
        <Markdown>{page.body}</Markdown>
        {page.reviewed && page.reviewedAt && (
          <p className="mt-12 text-sm text-plum-600">Last reviewed {formatDate(page.reviewedAt)}</p>
        )}
      </Container>
    </>
  )
}
