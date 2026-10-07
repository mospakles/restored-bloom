import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Notice } from "@/components/ui/misc"
import { EventDetail } from "@/components/site/event-detail"
import { prisma } from "@/lib/db"
import { NotFoundError } from "@/server/actor"
import { requirePagePermission } from "@/server/session"
import { getAdminEvent, registrationAvailability } from "@/server/events"

export const metadata: Metadata = { title: "Preview event" }

export default async function PreviewEventPage({ params }: { params: Promise<{ id: string }> }) {
  const actor = await requirePagePermission("events:manage")
  const { id } = await params
  const e = await getAdminEvent(actor, id).catch((err) => {
    if (err instanceof NotFoundError) notFound()
    throw err
  })
  const confirmed = await prisma.eventRegistration.count({ where: { eventId: e.id, status: "CONFIRMED" } })
  const availability = registrationAvailability(e, confirmed)
  return (
    <div className="-mx-4 -my-8 sm:-mx-8 lg:-mx-10">
      <EventDetail
        underHeader={false}
        event={e}
        availability={availability}
        registration={<p className="text-sm text-plum-700">The registration form appears here for visitors.</p>}
        banner={
          <Notice tone="pending" title={`Preview (status: ${e.status.toLowerCase()})`} className="mb-6">
            This is how the event will look to visitors.{" "}
            <Link href={`/admin/events/${e.id}`} className="font-semibold underline">
              Back to editing
            </Link>
          </Notice>
        }
      />
    </div>
  )
}
