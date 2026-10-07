import Link from "next/link"
import { ArrowLeft, FileDown } from "lucide-react"
import { Badge, Container, Notice } from "@/components/ui/misc"
import { buttonVariants } from "@/components/ui/button"
import { Markdown } from "@/components/site/markdown"
import { RESOURCE_CATEGORY_LABELS } from "@/lib/content"
import { cn, formatDate } from "@/lib/utils"
import { HeroBackdrop, HeroCurve } from "@/components/site/blocks"
import type { ResourceCategory } from "@/generated/prisma/client"

type Props = {
  title: string
  summary: string
  body: string
  category: ResourceCategory
  publishedAt: Date | null
  file: { id: string; filename: string; size: number } | null
}

function size(bytes: number) {
  return bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`
}

/** Shared by the public page and the dashboard preview so editors see exactly what will be published. */
export function ResourceArticle({
  resource,
  banner,
  underHeader = true,
}: {
  resource: Props
  banner?: React.ReactNode
  underHeader?: boolean
}) {
  return (
    <article>
      <header className={cn("relative isolate overflow-hidden bg-plum-950 text-cream-50", underHeader && "-mt-18")}>
        <HeroBackdrop accent="lagoon" />
        <Container className={cn("stagger max-w-3xl pb-24 sm:pb-28", underHeader ? "pt-32 sm:pt-36" : "pt-12")}>
          {banner}
          <Link href="/resources" className="inline-flex items-center gap-1 text-sm font-semibold text-gold-200 hover:text-white hover:underline">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All resources
          </Link>
          <div className="mt-6">
            <Badge tone="cream">{RESOURCE_CATEGORY_LABELS[resource.category]}</Badge>
          </div>
          <h1 className="mt-4 text-4xl text-cream-50 sm:text-5xl lg:text-6xl">{resource.title}</h1>
          <p className="mt-5 text-xl leading-relaxed text-cream-100/80">{resource.summary}</p>
          {resource.publishedAt && (
            <p className="mt-4 text-sm text-cream-100/60">
              Published <time dateTime={resource.publishedAt.toISOString()}>{formatDate(resource.publishedAt)}</time>
            </p>
          )}
        </Container>
        <HeroCurve />
      </header>
      <Container className="max-w-3xl py-12">
        {resource.file && (
          <div className="mb-10 flex flex-col gap-4 rounded-3xl card-soft p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-plum-900">{resource.file.filename}</p>
              <p className="text-sm text-plum-600">{size(resource.file.size)}</p>
            </div>
            <a href={`/api/files/${resource.file.id}`} className={buttonVariants({ variant: "rose" })} download>
              <FileDown className="h-4 w-4" aria-hidden="true" /> Download
            </a>
          </div>
        )}
        {resource.body.trim() && <Markdown>{resource.body}</Markdown>}
        <Notice tone="info" className="mt-12">
          This resource is for general awareness and education, and is not a substitute for advice from a qualified
          professional. <Link href="/support" className="font-semibold underline underline-offset-2">Finding support</Link>
        </Notice>
      </Container>
    </article>
  )
}
