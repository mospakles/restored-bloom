import type { Metadata } from "next"
import Link from "next/link"
import { AdminHeader, EmptyState, StatusBadge, Table, Td, Th } from "@/components/admin/ui"
import { prisma } from "@/lib/db"
import { formatDateTime } from "@/lib/utils"
import { requirePagePermission } from "@/server/session"

export const metadata: Metadata = { title: "Registrations" }

export default async function RegistrationsIndexPage() {
  await requirePagePermission("registrations:manage")
  const events = await prisma.event.findMany({
    where: { status: { in: ["PUBLISHED", "CANCELLED", "ARCHIVED"] } },
    orderBy: { startsAt: "desc" },
    select: {
      id: true,
      title: true,
      startsAt: true,
      status: true,
      capacity: true,
      _count: { select: { registrations: { where: { status: "CONFIRMED" } } } },
    },
  })
  return (
    <>
      <AdminHeader title="Event registrations" description="Choose an event to view, manage or export its registrations." />
      {events.length === 0 ? (
        <EmptyState title="No published events" />
      ) : (
        <Table caption="Events with registrations">
          <thead>
            <tr>
              <Th>Event</Th>
              <Th>Starts</Th>
              <Th>Status</Th>
              <Th>Confirmed</Th>
            </tr>
          </thead>
          <tbody>
            {events.map((e) => (
              <tr key={e.id}>
                <Td>
                  <Link href={`/admin/events/${e.id}/registrations`} className="font-medium hover:underline">
                    {e.title}
                  </Link>
                </Td>
                <Td className="whitespace-nowrap">{formatDateTime(e.startsAt)}</Td>
                <Td>
                  <StatusBadge status={e.status} />
                </Td>
                <Td>
                  {e._count.registrations}
                  {e.capacity ? ` / ${e.capacity}` : ""}
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}
