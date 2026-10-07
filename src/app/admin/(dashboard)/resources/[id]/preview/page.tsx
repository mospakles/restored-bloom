import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Notice } from "@/components/ui/misc"
import { ResourceArticle } from "@/components/site/resource-article"
import { NotFoundError } from "@/server/actor"
import { requirePagePermission } from "@/server/session"
import { getAdminResource } from "@/server/resources"

export const metadata: Metadata = { title: "Preview resource" }

export default async function PreviewResourcePage({ params }: { params: Promise<{ id: string }> }) {
  const actor = await requirePagePermission("resources:manage")
  const { id } = await params
  const r = await getAdminResource(actor, id).catch((e) => {
    if (e instanceof NotFoundError) notFound()
    throw e
  })
  return (
    <div className="-mx-4 -my-8 sm:-mx-8 lg:-mx-10">
      <ResourceArticle
        resource={{ ...r, publishedAt: r.publishedAt ?? null }}
        banner={
          <Notice tone="pending" title={`Preview — status: ${r.status.toLowerCase()}`} className="mb-6">
            This is how the resource will look to visitors.{" "}
            <Link href={`/admin/resources/${r.id}`} className="font-semibold underline">
              Back to editing
            </Link>
          </Notice>
        }
      />
    </div>
  )
}
