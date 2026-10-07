import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ExternalLink, Eye } from "lucide-react"
import { AdminHeader, Panel, StatusBadge } from "@/components/admin/ui"
import { FileUpload, ResourceForm } from "@/components/admin/forms"
import { InlineAction } from "@/components/admin/inline-action"
import { buttonVariants } from "@/components/ui/button"
import { Notice } from "@/components/ui/misc"
import { NotFoundError } from "@/server/actor"
import { requirePagePermission } from "@/server/session"
import { getAdminResource } from "@/server/resources"
import { deleteResourceAction, removeResourceFileAction, saveResourceAction, setResourceStatusAction } from "../../actions"

export const metadata: Metadata = { title: "Edit resource" }

export default async function EditResourcePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ created?: string }>
}) {
  const actor = await requirePagePermission("resources:manage")
  const { id } = await params
  const { created } = await searchParams
  const r = await getAdminResource(actor, id).catch((e) => {
    if (e instanceof NotFoundError) notFound()
    throw e
  })

  return (
    <>
      <AdminHeader
        back={{ href: "/admin/resources", label: "Resources" }}
        title={r.title}
        description={<StatusBadge status={r.status} />}
        actions={
          <>
            <Link href={`/admin/resources/${r.id}/preview`} className={buttonVariants({ variant: "outline", size: "sm" })}>
              <Eye className="h-4 w-4" aria-hidden="true" /> Preview
            </Link>
            {r.status === "PUBLISHED" && (
              <Link href={`/resources/${r.slug}`} className={buttonVariants({ variant: "ghost", size: "sm" })} target="_blank">
                <ExternalLink className="h-4 w-4" aria-hidden="true" /> View live
              </Link>
            )}
          </>
        }
      />
      {created && (
        <Notice tone="success" className="mb-6" role="status">
          Draft created. Preview it, attach a file if needed, and publish when it has been reviewed.
        </Notice>
      )}
      <div className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        <Panel>
          <ResourceForm action={saveResourceAction} resource={r} />
        </Panel>
        <div className="space-y-6">
          <Panel title="Publishing">
            {!r.reviewNote && r.status !== "PUBLISHED" && (
              <Notice tone="warning" className="mb-4">
                Add a review record before publishing. Clinical or legal guidance must be reviewed by a qualified
                professional.
              </Notice>
            )}
            <div className="flex flex-wrap gap-2">
              {r.status !== "PUBLISHED" && (
                <InlineAction action={setResourceStatusAction} fields={{ id: r.id, status: "PUBLISHED" }} label="Publish" variant="primary" />
              )}
              {r.status === "PUBLISHED" && (
                <InlineAction action={setResourceStatusAction} fields={{ id: r.id, status: "DRAFT" }} label="Unpublish (back to draft)" />
              )}
              {r.status !== "ARCHIVED" && (
                <InlineAction action={setResourceStatusAction} fields={{ id: r.id, status: "ARCHIVED" }} label="Archive" />
              )}
            </div>
          </Panel>
          <Panel title="Download">
            {r.file && (
              <div className="mb-5 rounded-xl bg-cream-100 p-4 text-sm">
                <p className="font-semibold text-plum-900">{r.file.filename}</p>
                <p className="text-plum-600">
                  {r.file.mimeType} · {Math.max(1, Math.round(r.file.size / 1024))} KB
                </p>
                <div className="mt-3 flex gap-3">
                  <a href={`/api/files/${r.file.id}`} className="font-semibold text-rose-700 hover:underline">
                    Download
                  </a>
                  <InlineAction action={removeResourceFileAction} fields={{ id: r.id }} label="Remove file" variant="ghost" confirm="Remove this file?" />
                </div>
              </div>
            )}
            <FileUpload resourceId={r.id} />
          </Panel>
          <Panel title="Delete">
            <InlineAction
              action={deleteResourceAction}
              fields={{ id: r.id }}
              label="Delete resource"
              variant="danger"
              confirm="Permanently delete this resource? Consider archiving instead."
            />
          </Panel>
        </div>
      </div>
    </>
  )
}
