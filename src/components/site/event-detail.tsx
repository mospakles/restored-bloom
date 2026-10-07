import Link from "next/link"
import { ArrowLeft, CalendarDays, Clock, MapPin, Monitor, Users } from "lucide-react"
import { Badge, Container, Notice } from "@/components/ui/misc"
import { Markdown } from "@/components/site/markdown"
import { cn, formatDate, formatTime } from "@/lib/utils"
import { HeroBackdrop, HeroCurve } from "@/components/site/blocks"
import type { Availability } from "@/server/events"

type EventLike = {
  title: string
  summary: string
  description: string
  startsAt: Date
  endsAt: Date | null
  location: string
  isOnline: boolean
  audience: string | null
  status: string
}

const CLOSED_COPY: Record<Exclude<Availability, { open: true }>["reason"], string> = {
  cancelled: "This event has been cancelled.",
  past: "This event has taken place.",
  closed: "Registration for this event is closed.",
  full: "This event is fully booked.",
  unpublished: "Registration opens once this event is published.",
}

export function EventMeta({ event }: { event: Pick<EventLike, "startsAt" | "endsAt" | "location" | "isOnline"> }) {
  const sameDay = event.endsAt && formatDate(event.endsAt) === formatDate(event.startsAt)
  return (
    <ul className="space-y-2 text-plum-800">
      <li className="flex items-center gap-2">
        <CalendarDays className="h-4 w-4 text-lagoon-700" aria-hidden="true" />
        <time dateTime={event.startsAt.toISOString()}>{formatDate(event.startsAt)}</time>
        {event.endsAt && !sameDay && <> – {formatDate(event.endsAt)}</>}
      </li>
      <li className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-lagoon-700" aria-hidden="true" />
        {formatTime(event.startsAt)}
        {event.endsAt && sameDay && <> – {formatTime(event.endsAt)}</>} (Lagos time)
      </li>
      <li className="flex items-center gap-2">
        {event.isOnline ? (
          <Monitor className="h-4 w-4 text-lagoon-700" aria-hidden="true" />
        ) : (
          <MapPin className="h-4 w-4 text-lagoon-700" aria-hidden="true" />
        )}
        {event.location}
      </li>
    </ul>
  )
}

export function EventDetail({
  event,
  availability,
  registration,
  banner,
  underHeader = true,
}: {
  event: EventLike
  availability: Availability
  registration?: React.ReactNode
  banner?: React.ReactNode
  underHeader?: boolean
}) {
  return (
    <article>
      <header className={cn("relative isolate overflow-hidden bg-plum-950 text-cream-50", underHeader && "-mt-18")}>
        <HeroBackdrop accent="dusk" />
        <Container className={cn("stagger pb-24 sm:pb-28", underHeader ? "pt-32 sm:pt-36" : "pt-12")}>
          {banner}
          <Link href="/events" className="inline-flex items-center gap-1 text-sm font-semibold text-gold-200 hover:text-white hover:underline">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All events
          </Link>
          {event.status === "CANCELLED" && (
            <p className="mt-6">
              <Badge tone="rose">Cancelled</Badge>
            </p>
          )}
          <h1 className="mt-4 max-w-3xl text-4xl text-cream-50 sm:text-5xl lg:text-6xl">{event.title}</h1>
          <p className="mt-5 max-w-2xl text-xl leading-relaxed text-cream-100/80">{event.summary}</p>
        </Container>
        <HeroCurve />
      </header>
      <Container className="grid gap-10 py-12 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <Markdown>{event.description}</Markdown>
        </div>
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl card-soft p-6">
            <EventMeta event={event} />
            {event.audience && (
              <p className="mt-3 flex items-center gap-2 text-plum-800">
                <Users className="h-4 w-4 text-lagoon-700" aria-hidden="true" /> {event.audience}
              </p>
            )}
          </div>
          <div className="rounded-3xl card-soft p-6" id="register">
            <h2 className="text-2xl text-plum-900">Registration</h2>
            <div className="mt-4">
              {availability.open ? (
                registration
              ) : (
                <Notice tone={availability.reason === "cancelled" ? "warning" : "info"}>{CLOSED_COPY[availability.reason]}</Notice>
              )}
            </div>
          </div>
        </aside>
      </Container>
    </article>
  )
}
