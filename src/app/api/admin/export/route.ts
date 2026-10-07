import { toCsv } from "@/lib/csv"
import { slugify } from "@/lib/utils"
import { ForbiddenError, NotFoundError } from "@/server/actor"
import { requireActor } from "@/server/session"
import { exportEnquiries } from "@/server/enquiries"
import { exportRegistrations } from "@/server/events"
import { exportSubscribers } from "@/server/newsletter"

function csvResponse(body: string, filename: string) {
  return new Response(body, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  })
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const kind = url.searchParams.get("kind")
  const date = new Date().toISOString().slice(0, 10)
  try {
    const actor = await requireActor()
    if (kind === "enquiries") {
      const rows = await exportEnquiries(actor, {
        type: url.searchParams.get("type") ?? undefined,
        status: url.searchParams.get("status") ?? undefined,
        assigned: url.searchParams.get("assigned") ?? undefined,
        q: url.searchParams.get("q") ?? undefined,
      })
      return csvResponse(
        toCsv(rows, ["reference", "type", "status", "received", "name", "email", "phone", "organisation", "details", "message", "assigned_to"]),
        `enquiries-${date}.csv`,
      )
    }
    if (kind === "registrations") {
      const { event, rows } = await exportRegistrations(actor, url.searchParams.get("eventId") ?? "")
      return csvResponse(
        toCsv(rows, ["name", "email", "phone", "organisation", "role", "status", "registered"]),
        `registrations-${slugify(event.title)}-${date}.csv`,
      )
    }
    if (kind === "subscribers") {
      const rows = await exportSubscribers(actor)
      return csvResponse(toCsv(rows, ["email", "confirmed", "consent_version", "consent_text"]), `subscribers-${date}.csv`)
    }
    return new Response("Unknown export", { status: 400 })
  } catch (error) {
    if (error instanceof ForbiddenError) return new Response("Not permitted", { status: 403 })
    if (error instanceof NotFoundError) return new Response("Not found", { status: 404 })
    throw error
  }
}
