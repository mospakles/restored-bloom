import type { Metadata } from "next"
import Link from "next/link"
import { Paperclip, Plus } from "lucide-react"
import { AdminHeader, EmptyState, StatusBadge, Table, Td, Th } from "@/components/admin/ui"
import { buttonVariants } from "@/components/ui/button"
import { RESOURCE_CATEGORY_LABELS } from "@/lib/content"
import { formatDateTime } from "@/lib/utils"
import { requirePagePermission } from "@/server/session"
import { listAdminResources } from "@/server/resources"

export const metadata: Metadata = { title: "Resources" }

export default async function AdminResourcesPage() {
  const actor = await requirePagePermission("resources:manage")
  const resources = await listAdminResources(actor)
  return (
    <>
      <AdminHeader
        title="Resources"
        description="Articles and downloads for the public resource hub. Only published resources are visible to visitors."
        actions={
          <Link href="/admin/resources/new" className={buttonVariants({ size: "sm" })}>
            <Plus className="h-4 w-4" aria-hidden="true" /> New resource
          </Link>
        }
      />
      {resources.length === 0 ? (
        <EmptyState title="No resources yet">Create a draft, have it reviewed, then publish it.</EmptyState>
      ) : (
        <Table caption="Resources">
          <thead>
            <tr>
              <Th>Title</Th>
              <Th>Category</Th>
              <Th>Status</Th>
              <Th>Updated</Th>
            </tr>
          </thead>
          <tbody>
            {resources.map((r) => (
              <tr key={r.id}>
                <Td>
                  <Link href={`/admin/resources/${r.id}`} className="font-medium underline-offset-2 hover:underline">
                    {r.title}
                  </Link>
                  {r.fileId && <Paperclip className="ml-2 inline h-3.5 w-3.5 text-plum-500" aria-label="Has a file" />}
                </Td>
                <Td>{RESOURCE_CATEGORY_LABELS[r.category]}</Td>
                <Td>
                  <StatusBadge status={r.status} />
                </Td>
                <Td className="whitespace-nowrap">{formatDateTime(r.updatedAt)}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}
