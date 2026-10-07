import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ClipboardList, ExternalLink, Eye } from "lucide-react"
import { AdminHeader, Panel, StatusBadge } from "@/components/admin/ui"
import { EventForm } from "@/components/admin/forms"
import { InlineAction } from "@/components/admin/inline-action"
import { buttonVariants } from "@/components/ui/button"
import { Notice } from "@/components/ui/misc"
import { can } from "@/lib/permissions"
import { toLagosLocalInput } from "@/lib/utils"
import { NotFoundError } from "@/server/actor"
import { requirePagePermission } from "@/server/session"
import { getAdminEvent } from "@/server/events"
import { deleteEventAction, saveEventAction, setEventStatusAction } from "../../actions"

export const metadata: Metadata = { title: "Edit event" }

export default async function EditEventPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ created?: string }>
}) {
  const actor = await requirePagePermission("events:manage")
  const { id } = await params
  const { created } = await searchParams
  const e = await getAdminEvent(actor, id).catch((err) => {
    if (err instanceof NotFoundError) notFound()
    throw err
  })

  return (
    <>
      <AdminHeader
        back={{ href: "/admin/events", label: "Events" }}
        title={e.title}
        description={<StatusBadge status={e.status} />}
        actions={
          <>
            <Link href={`/admin/events/${e.id}/preview`} className={buttonVariants({ variant: "outline", size: "sm" })}>
              <Eye className="h-4 w-4" aria-hidden="true" /> Preview
            </Link>
            {can(actor.role, "registrations:manage") && (
              <Link href={`/admin/events/${e.id}/registrations`} className={buttonVariants({ variant: "outline", size: "sm" })}>
                <ClipboardList className="h-4 w-4" aria-hidden="true" /> Registrations
              </Link>
            )}
            {(e.status === "PUBLISHED" || e.status === "CANCELLED") && (
              <Link href={`/events/${e.slug}`} target="_blank" className={buttonVariants({ variant: "ghost", size: "sm" })}>
                <ExternalLink className="h-4 w-4" aria-hidden="true" /> View live
              </Link>
            )}
          </>
        }
      />
      {created && (
        <Notice tone="success" className="mb-6" role="status">
          Draft created. Preview it and publish when ready.
        </Notice>
      )}
      <div className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        <Panel>
          <EventForm
            action={saveEventAction}
            event={{
              ...e,
              startsAt: toLagosLocalInput(e.startsAt),
              endsAt: toLagosLocalInput(e.endsAt),
            }}
          />
        </Panel>
        <div className="space-y-6">
          <Panel title="Status">
            <div className="flex flex-wrap gap-2">
              {e.status !== "PUBLISHED" && (
                <InlineAction action={setEventStatusAction} fields={{ id: e.id, status: "PUBLISHED" }} label="Publish" variant="primary" />
              )}
              {e.status === "PUBLISHED" && (
                <InlineAction action={setEventStatusAction} fields={{ id: e.id, status: "DRAFT" }} label="Unpublish" />
              )}
              {e.status === "PUBLISHED" && (
                <InlineAction
                  action={setEventStatusAction}
                  fields={{ id: e.id, status: "CANCELLED" }}
                  label="Cancel event"
                  confirm="Mark this event as cancelled? It will stay visible with a cancellation notice and registration will close. Registered attendees are not notified automatically."
                />
              )}
              {e.status !== "ARCHIVED" && (
                <InlineAction action={setEventStatusAction} fields={{ id: e.id, status: "ARCHIVED" }} label="Archive" />
              )}
            </div>
            <p className="mt-3 text-xs text-plum-600">
              Cancelling does not email attendees. Contact them from the registrations list.
            </p>
          </Panel>
          <Panel title="Delete">
            <p className="mb-3 text-sm text-plum-700">Events with registrations can only be archived.</p>
            <InlineAction action={deleteEventAction} fields={{ id: e.id }} label="Delete event" variant="danger" confirm="Permanently delete this event?" />
          </Panel>
        </div>
      </div>
    </>
  )
}
