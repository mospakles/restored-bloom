import type { Metadata } from "next"
import { AdminHeader, EmptyState, Pagination, Table, Td, Th } from "@/components/admin/ui"
import { formatDateTime } from "@/lib/utils"
import { requirePagePermission } from "@/server/session"
import { listAuditLog } from "@/server/operations"

export const metadata: Metadata = { title: "Audit log" }

export default async function AuditPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const actor = await requirePagePermission("audit:read")
  const { page: p } = await searchParams
  const { items, page, pageCount } = await listAuditLog(actor, Math.max(1, Number(p) || 1))
  return (
    <>
      <AdminHeader
        title="Audit log"
        description="Important administrative actions. Records contain identifiers and changed fields only — never submission contents."
      />
      {items.length === 0 ? (
        <EmptyState title="No activity recorded yet" />
      ) : (
        <Table caption="Audit log">
          <thead>
            <tr>
              <Th>When</Th>
              <Th>Who</Th>
              <Th>Action</Th>
              <Th>Record</Th>
              <Th>Details</Th>
            </tr>
          </thead>
          <tbody>
            {items.map((a) => (
              <tr key={a.id}>
                <Td className="whitespace-nowrap">{formatDateTime(a.createdAt)}</Td>
                <Td>{a.actorEmail ?? "System"}</Td>
                <Td className="font-mono text-xs">{a.action}</Td>
                <Td className="text-xs">
                  {a.entityType}
                  {a.entityId && <span className="block font-mono text-plum-500">{a.entityId}</span>}
                </Td>
                <Td className="max-w-xs break-words font-mono text-xs text-plum-700">
                  {a.metadata ? JSON.stringify(a.metadata) : ""}
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Pagination page={page} pageCount={pageCount} href={(n) => `/admin/audit?page=${n}`} />
    </>
  )
}
