import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Download } from "lucide-react"
import { AdminHeader, EmptyState, StatusBadge, Table, Td, Th } from "@/components/admin/ui"
import { InlineAction } from "@/components/admin/inline-action"
import { buttonVariants } from "@/components/ui/button"
import { ATTENDEE_ROLES } from "@/lib/validation"
import { can } from "@/lib/permissions"
import { formatDateTime } from "@/lib/utils"
import { NotFoundError } from "@/server/actor"
import { requirePagePermission } from "@/server/session"
import { listRegistrations } from "@/server/events"
import { setRegistrationStatusAction } from "../../../actions"

export const metadata: Metadata = { title: "Registrations" }

export default async function RegistrationsPage({ params }: { params: Promise<{ id: string }> }) {
  const actor = await requirePagePermission("registrations:manage")
  const { id } = await params
  const { event, registrations } = await listRegistrations(actor, id).catch((e) => {
    if (e instanceof NotFoundError) notFound()
    throw e
  })
  const confirmed = registrations.filter((r) => r.status === "CONFIRMED").length

  return (
    <>
      <AdminHeader
        back={{ href: can(actor.role, "events:manage") ? `/admin/events/${event.id}` : "/admin/registrations", label: "Back" }}
        title={`Registrations: ${event.title}`}
        description={`${formatDateTime(event.startsAt)} · ${confirmed} confirmed${event.capacity ? ` of ${event.capacity} places` : ""}`}
        actions={
          can(actor.role, "registrations:export") && (
            <a href={`/api/admin/export?kind=registrations&eventId=${event.id}`} className={buttonVariants({ variant: "outline", size: "sm" })}>
              <Download className="h-4 w-4" aria-hidden="true" /> Export CSV
            </a>
          )
        }
      />
      {registrations.length === 0 ? (
        <EmptyState title="No registrations yet" />
      ) : (
        <Table caption="Registrations">
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Contact</Th>
              <Th>Organisation / role</Th>
              <Th>Status</Th>
              <Th>Registered</Th>
              <Th>
                <span className="sr-only">Actions</span>
              </Th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((r) => (
              <tr key={r.id}>
                <Td className="font-medium">{r.name}</Td>
                <Td>
                  <a href={`mailto:${r.email}`} className="text-rose-700 hover:underline">
                    {r.email}
                  </a>
                  {r.phone && <span className="block text-plum-600">{r.phone}</span>}
                </Td>
                <Td>
                  {r.organisation}
                  {r.role && (
                    <span className="block text-plum-600">{ATTENDEE_ROLES[r.role as keyof typeof ATTENDEE_ROLES] ?? r.role}</span>
                  )}
                </Td>
                <Td>
                  <StatusBadge status={r.status} />
                </Td>
                <Td className="whitespace-nowrap">{formatDateTime(r.createdAt)}</Td>
                <Td>
                  {r.status === "CONFIRMED" ? (
                    <InlineAction
                      action={setRegistrationStatusAction}
                      fields={{ id: r.id, status: "CANCELLED" }}
                      label="Cancel"
                      variant="ghost"
                      confirm={`Cancel ${r.name}'s registration?`}
                    />
                  ) : (
                    <InlineAction action={setRegistrationStatusAction} fields={{ id: r.id, status: "CONFIRMED" }} label="Reinstate" variant="ghost" />
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
