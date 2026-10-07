import Link from "next/link"
import { ArrowLeft, FileDown } from "lucide-react"
import { Badge, Container, Notice } from "@/components/ui/misc"
import { buttonVariants } from "@/components/ui/button"
import { Markdown } from "@/components/site/markdown"
import { RESOURCE_CATEGORY_LABELS } from "@/lib/content"
import { formatDate } from "@/lib/utils"
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
export function ResourceArticle({ resource, banner }: { resource: Props; banner?: React.ReactNode }) {
  return (
    <article>
      <header className="border-b border-cream-300 bg-gradient-to-b from-cream-100 to-cream-50">
        <Container className="max-w-3xl py-12 sm:py-16">
          {banner}
          <Link href="/resources" className="inline-flex items-center gap-1 text-sm font-semibold text-rose-700 hover:underline">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All resources
          </Link>
          <div className="mt-6">
            <Badge tone="rose">{RESOURCE_CATEGORY_LABELS[resource.category]}</Badge>
          </div>
          <h1 className="mt-4 text-4xl text-plum-900 sm:text-5xl">{resource.title}</h1>
          <p className="mt-4 text-xl leading-relaxed text-plum-700">{resource.summary}</p>
          {resource.publishedAt && (
            <p className="mt-4 text-sm text-plum-600">
              Published <time dateTime={resource.publishedAt.toISOString()}>{formatDate(resource.publishedAt)}</time>
            </p>
          )}
        </Container>
      </header>
      <Container className="max-w-3xl py-12">
        {resource.file && (
          <div className="mb-10 flex flex-col gap-4 rounded-3xl border border-cream-300 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
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
