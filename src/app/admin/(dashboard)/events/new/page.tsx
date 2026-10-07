import type { Metadata } from "next"
import { AdminHeader, Panel } from "@/components/admin/ui"
import { EventForm } from "@/components/admin/forms"
import { requirePagePermission } from "@/server/session"
import { saveEventAction } from "../../actions"

export const metadata: Metadata = { title: "New event" }

export default async function NewEventPage() {
  await requirePagePermission("events:manage")
  return (
    <>
      <AdminHeader back={{ href: "/admin/events", label: "Events" }} title="New event" description="New events are saved as drafts." />
      <Panel>
        <EventForm action={saveEventAction} />
      </Panel>
    </>
  )
}
