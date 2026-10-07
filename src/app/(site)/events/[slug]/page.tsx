import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { connection } from "next/server"
import { EventDetail } from "@/components/site/event-detail"
import { EventRegistrationForm } from "@/components/forms/public-forms"
import { createFormToken } from "@/lib/security"
import { getPublicEvent } from "@/server/events"

type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  await connection()
  const { slug } = await params
  const event = await getPublicEvent(slug)
  if (!event) return { title: "Event not found" }
  return { title: event.title, description: event.summary, openGraph: { title: event.title, description: event.summary } }
}

export default async function EventPage({ params }: { params: Params }) {
  await connection()
  const { slug } = await params
  const event = await getPublicEvent(slug)
  if (!event) notFound()
  const { availability } = event
  return (
    <EventDetail
      event={event}
      availability={availability}
      registration={
        availability.open && (
          <EventRegistrationForm token={createFormToken()} eventId={event.id} placesLeft={availability.placesLeft} />
        )
      }
    />
  )
}
