import type { Metadata } from "next"
import Link from "next/link"
import { AdminHeader, StatusBadge, Table, Td, Th } from "@/components/admin/ui"
import { formatDateTime } from "@/lib/utils"
import { requirePagePermission } from "@/server/session"
import { listPages } from "@/server/pages"

export const metadata: Metadata = { title: "Pages & policies" }

export default async function ContentPage() {
  const actor = await requirePagePermission("content:manage")
  const pages = await listPages(actor)
  return (
    <>
      <AdminHeader
        title="Pages & policies"
        description="Editable public pages. Each shows a draft notice until a review is recorded."
      />
      <Table caption="Editable pages">
        <thead>
          <tr>
            <Th>Page</Th>
            <Th>Public address</Th>
            <Th>Review</Th>
            <Th>Last saved</Th>
          </tr>
        </thead>
        <tbody>
          {pages.map((p) => (
            <tr key={p.slug}>
              <Td>
                <Link href={`/admin/content/${p.slug}`} className="font-medium hover:underline">
                  {p.title}
                </Link>
              </Td>
              <Td>
                <Link href={p.path} target="_blank" className="text-rose-700 hover:underline">
                  {p.path}
                </Link>
              </Td>
              <Td>{p.reviewed ? <StatusBadge status="PUBLISHED" label="Reviewed" /> : <StatusBadge status="DRAFT" label="Awaiting review" />}</Td>
              <Td>{p.updatedAt ? formatDateTime(p.updatedAt) : <span className="text-plum-500">Built-in draft</span>}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
      <p className="mt-6 text-sm text-plum-600">
        Contact details, founder biography and programme status are edited in Site settings. Other marketing copy lives
        in the code (src/lib/content.ts). See the README.
      </p>
    </>
  )
}
