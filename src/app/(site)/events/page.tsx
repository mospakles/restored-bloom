import type { Metadata } from "next"
import Link from "next/link"
import { connection } from "next/server"
import { Badge, Container } from "@/components/ui/misc"
import { PageHero } from "@/components/site/blocks"
import { EventMeta } from "@/components/site/event-detail"
import { listPastEvents, listUpcomingEvents } from "@/server/events"

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming Restored Bloom awareness sessions, workshops and community events in Lagos.",
}

type EventCard = Awaited<ReturnType<typeof listUpcomingEvents>>[number]

function Card({ event }: { event: EventCard }) {
  return (
    <article className="relative flex h-full flex-col rounded-3xl card-soft p-6 transition-shadow hover:shadow-md">
      {event.status === "CANCELLED" && (
        <Badge tone="rose" className="mb-3 self-start">
          Cancelled
        </Badge>
      )}
      <h3 className="text-xl text-plum-900">
        <Link href={`/events/${event.slug}`} className="after:absolute after:inset-0 after:rounded-3xl">
          {event.title}
        </Link>
      </h3>
      <p className="mt-2 flex-1 leading-relaxed text-plum-700">{event.summary}</p>
      <div className="mt-5 text-sm">
        <EventMeta event={event} />
      </div>
    </article>
  )
}

export default async function EventsPage() {
  await connection()
  const [upcoming, past] = await Promise.all([listUpcomingEvents(), listPastEvents()])
  return (
    <>
      <PageHero eyebrow="Events" title="Workshops, sessions and community events">
        <p>Join us for awareness sessions for parents, educators and communities.</p>
      </PageHero>
      <Container className="py-12">
        <section aria-labelledby="upcoming">
          <h2 id="upcoming" className="text-3xl text-plum-900">
            Upcoming events
          </h2>
          {upcoming.length === 0 ? (
            <div className="mt-6 rounded-[2rem] border border-dashed border-cream-400 bg-white p-10 text-center">
              <p className="text-xl text-plum-900">No events are scheduled right now.</p>
              <p className="mx-auto mt-2 max-w-md text-plum-700">
                New events will be announced here. If you&apos;d like us to run a session for your school, community or organisation,{" "}
                <Link href="/contact" className="font-semibold text-rose-700 underline underline-offset-4">
                  get in touch
                </Link>
                .
              </p>
            </div>
          ) : (
            <ul className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((e) => (
                <li key={e.id}>
                  <Card event={e} />
                </li>
              ))}
            </ul>
          )}
        </section>
        {past.length > 0 && (
          <section aria-labelledby="past" className="mt-16">
            <h2 id="past" className="text-3xl text-plum-900">
              Past events
            </h2>
            <ul className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {past.map((e) => (
                <li key={e.id}>
                  <Card event={e} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </Container>
    </>
  )
}
