import type { Metadata } from "next"
import Link from "next/link"
import { Plus } from "lucide-react"
import { AdminHeader, EmptyState, StatusBadge, Table, Td, Th } from "@/components/admin/ui"
import { buttonVariants } from "@/components/ui/button"
import { can } from "@/lib/permissions"
import { formatDateTime } from "@/lib/utils"
import { requirePagePermission } from "@/server/session"
import { listAdminEvents } from "@/server/events"

export const metadata: Metadata = { title: "Events" }

export default async function AdminEventsPage() {
  const actor = await requirePagePermission("events:manage")
  const events = await listAdminEvents(actor)
  const canRegs = can(actor.role, "registrations:manage")
  return (
    <>
      <AdminHeader
        title="Events"
        description="Only published events appear on the website. Cancelled events stay visible with a notice."
        actions={
          <Link href="/admin/events/new" className={buttonVariants({ size: "sm" })}>
            <Plus className="h-4 w-4" aria-hidden="true" /> New event
          </Link>
        }
      />
      {events.length === 0 ? (
        <EmptyState title="No events yet">Create a draft event, preview it, then publish.</EmptyState>
      ) : (
        <Table caption="Events">
          <thead>
            <tr>
              <Th>Event</Th>
              <Th>Starts</Th>
              <Th>Status</Th>
              <Th>Registrations</Th>
            </tr>
          </thead>
          <tbody>
            {events.map((e) => (
              <tr key={e.id}>
                <Td>
                  <Link href={`/admin/events/${e.id}`} className="font-medium underline-offset-2 hover:underline">
                    {e.title}
                  </Link>
                </Td>
                <Td className="whitespace-nowrap">{formatDateTime(e.startsAt)}</Td>
                <Td>
                  <StatusBadge status={e.status} />
                </Td>
                <Td>
                  {canRegs ? (
                    <Link href={`/admin/events/${e.id}/registrations`} className="text-rose-700 underline-offset-2 hover:underline">
                      {e._count.registrations}
                      {e.capacity ? ` / ${e.capacity}` : ""}
                    </Link>
                  ) : (
                    <>
                      {e._count.registrations}
                      {e.capacity ? ` / ${e.capacity}` : ""}
                    </>
                  )}
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}
