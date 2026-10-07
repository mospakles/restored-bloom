import type { Metadata } from "next"
import Link from "next/link"
import { Download } from "lucide-react"
import { AdminHeader, EmptyState, Pagination, StatusBadge, Table, Td, Th } from "@/components/admin/ui"
import { Button, buttonVariants } from "@/components/ui/button"
import { Notice } from "@/components/ui/misc"
import { ENQUIRY_STATUS_LABELS, ENQUIRY_STATUSES, ENQUIRY_TYPE_LABELS, ENQUIRY_TYPES } from "@/lib/enquiry-display"
import { can } from "@/lib/permissions"
import { formatDateTime } from "@/lib/utils"
import { requirePagePermission } from "@/server/session"
import { assignableStaff, listEnquiries } from "@/server/enquiries"

export const metadata: Metadata = { title: "Enquiries" }

type SP = Promise<{ type?: string; status?: string; assigned?: string; q?: string; page?: string; deleted?: string }>

const selectCls =
  "h-10 rounded-xl border border-cream-400 bg-white px-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300"

export default async function EnquiriesPage({ searchParams }: { searchParams: SP }) {
  const actor = await requirePagePermission("enquiries:read")
  const sp = await searchParams
  const filters = { type: sp.type, status: sp.status, assigned: sp.assigned, q: sp.q, page: Number(sp.page) || 1 }
  const [{ items, total, page, pageCount }, staff] = await Promise.all([listEnquiries(actor, filters), assignableStaff()])

  const qs = (overrides: Record<string, string | number | undefined>) => {
    const p = new URLSearchParams()
    const merged = { type: sp.type, status: sp.status, assigned: sp.assigned, q: sp.q, ...overrides }
    for (const [k, v] of Object.entries(merged)) if (v) p.set(k, String(v))
    return p.toString()
  }

  return (
    <>
      <AdminHeader
        title="Enquiries"
        description={`${total} matching ${total === 1 ? "enquiry" : "enquiries"}${sp.status === "all" ? "" : sp.status ? "" : " (closed enquiries hidden)"}`}
        actions={
          can(actor.role, "enquiries:export") && (
            <a href={`/api/admin/export?kind=enquiries&${qs({ page: undefined })}`} className={buttonVariants({ variant: "outline", size: "sm" })}>
              <Download className="h-4 w-4" aria-hidden="true" /> Export CSV
            </a>
          )
        }
      />
      {sp.deleted && (
        <Notice tone="success" className="mb-6" role="status">
          The enquiry was deleted.
        </Notice>
      )}

      <form className="mb-6 flex flex-wrap items-end gap-3 rounded-2xl border border-cream-300 bg-white p-4" role="search">
        <div>
          <label htmlFor="f-q" className="block text-xs font-semibold text-plum-700">
            Search
          </label>
          <input id="f-q" name="q" defaultValue={sp.q} placeholder="Name, email, reference…" className={`${selectCls} w-56`} />
        </div>
        <div>
          <label htmlFor="f-type" className="block text-xs font-semibold text-plum-700">
            Type
          </label>
          <select id="f-type" name="type" defaultValue={sp.type ?? ""} className={selectCls}>
            <option value="">All types</option>
            {ENQUIRY_TYPES.map((t) => (
              <option key={t} value={t}>
                {ENQUIRY_TYPE_LABELS[t]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="f-status" className="block text-xs font-semibold text-plum-700">
            Status
          </label>
          <select id="f-status" name="status" defaultValue={sp.status ?? ""} className={selectCls}>
            <option value="">Open (not closed)</option>
            <option value="all">All statuses</option>
            {ENQUIRY_STATUSES.map((s) => (
              <option key={s} value={s}>
                {ENQUIRY_STATUS_LABELS[s]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="f-assigned" className="block text-xs font-semibold text-plum-700">
            Assigned to
          </label>
          <select id="f-assigned" name="assigned" defaultValue={sp.assigned ?? ""} className={selectCls}>
            <option value="">Anyone</option>
            <option value="me">Me</option>
            <option value="unassigned">Unassigned</option>
            {staff.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <Button type="submit" size="sm" className="h-10">
          Filter
        </Button>
        <Link href="/admin/enquiries" className="text-sm font-medium text-rose-700 hover:underline">
          Reset
        </Link>
      </form>

      {items.length === 0 ? (
        <EmptyState title="No enquiries found">Try changing the filters.</EmptyState>
      ) : (
        <Table caption="Enquiries">
          <thead>
            <tr>
              <Th>Reference</Th>
              <Th>From</Th>
              <Th>Type</Th>
              <Th>Status</Th>
              <Th>Assigned</Th>
              <Th>Received</Th>
            </tr>
          </thead>
          <tbody>
            {items.map((e) => (
              <tr key={e.id} className="hover:bg-cream-50">
                <Td>
                  <Link href={`/admin/enquiries/${e.id}`} className="font-mono font-semibold text-plum-900 underline-offset-2 hover:underline">
                    {e.reference}
                  </Link>
                </Td>
                <Td>
                  <span className="font-medium">{e.organisation || e.name}</span>
                  {e.organisation && <span className="block text-plum-600">{e.name}</span>}
                </Td>
                <Td>{ENQUIRY_TYPE_LABELS[e.type]}</Td>
                <Td>
                  <StatusBadge status={e.status} label={ENQUIRY_STATUS_LABELS[e.status]} />
                </Td>
                <Td>{e.assignedTo?.name ?? <span className="text-plum-500">Unassigned</span>}</Td>
                <Td className="whitespace-nowrap">{formatDateTime(e.createdAt)}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Pagination page={page} pageCount={pageCount} href={(p) => `/admin/enquiries?${qs({ page: p })}`} />
    </>
  )
}
