import "server-only"
import { prisma } from "@/lib/db"
import { assertCan, audit, type Actor } from "@/server/actor"
import { getSettings } from "@/server/settings"
import { pruneThrottle } from "@/server/throttle"
import { can } from "@/lib/permissions"

export async function listAuditLog(actor: Actor, page = 1) {
  assertCan(actor, "audit:read")
  const take = 50
  const [items, total] = await Promise.all([
    prisma.auditLog.findMany({ orderBy: { createdAt: "desc" }, skip: (page - 1) * take, take }),
    prisma.auditLog.count(),
  ])
  return { items, total, page, pageCount: Math.max(1, Math.ceil(total / take)) }
}

function monthsAgo(months: number, now = new Date()) {
  const d = new Date(now)
  d.setMonth(d.getMonth() - months)
  return d
}

/** What a retention run would delete, so administrators can review before confirming. */
export async function retentionPreview(actor: Actor, now = new Date()) {
  assertCan(actor, "retention:manage")
  const { retentionMonths } = await getSettings()
  const cutoff = monthsAgo(retentionMonths, now)
  const [enquiries, registrations, subscribers] = await Promise.all([
    prisma.enquiry.count({ where: { status: "CLOSED", closedAt: { lt: cutoff } } }),
    prisma.eventRegistration.count({ where: { event: { startsAt: { lt: cutoff } } } }),
    prisma.subscriber.count({
      where: {
        OR: [
          { status: "UNSUBSCRIBED", unsubscribedAt: { lt: cutoff } },
          { status: "PENDING", createdAt: { lt: monthsAgo(1, now) } },
        ],
      },
    }),
  ])
  return { retentionMonths, cutoff, enquiries, registrations, subscribers }
}

export async function runRetention(actor: Actor, now = new Date()) {
  assertCan(actor, "retention:manage")
  const { retentionMonths } = await getSettings()
  const cutoff = monthsAgo(retentionMonths, now)
  const [enquiries, registrations, subscribers] = await prisma.$transaction([
    prisma.enquiry.deleteMany({ where: { status: "CLOSED", closedAt: { lt: cutoff } } }),
    prisma.eventRegistration.deleteMany({ where: { event: { startsAt: { lt: cutoff } } } }),
    prisma.subscriber.deleteMany({
      where: {
        OR: [
          { status: "UNSUBSCRIBED", unsubscribedAt: { lt: cutoff } },
          { status: "PENDING", createdAt: { lt: monthsAgo(1, now) } },
        ],
      },
    }),
  ])
  await pruneThrottle()
  await audit(actor, "retention.run", "System", null, {
    retentionMonths,
    enquiries: enquiries.count,
    registrations: registrations.count,
    subscribers: subscribers.count,
  })
  return { enquiries: enquiries.count, registrations: registrations.count, subscribers: subscribers.count }
}

/** Dashboard overview. Every figure is a live count from the database, scoped to what the actor may see. */
export async function dashboardOverview(actor: Actor, now = new Date()) {
  const showEnquiries = can(actor.role, "enquiries:read")
  const showContent = can(actor.role, "resources:manage")
  const showEvents = can(actor.role, "events:manage") || can(actor.role, "registrations:manage")

  const [byType, newCount, mine, recent, resources, upcoming, subscribers] = await Promise.all([
    showEnquiries
      ? prisma.enquiry.groupBy({ by: ["type"], where: { status: { not: "CLOSED" } }, _count: { _all: true } })
      : Promise.resolve([]),
    showEnquiries ? prisma.enquiry.count({ where: { status: "NEW" } }) : Promise.resolve(0),
    showEnquiries
      ? prisma.enquiry.count({ where: { assignedToId: actor.id, status: { not: "CLOSED" } } })
      : Promise.resolve(0),
    showEnquiries
      ? prisma.enquiry.findMany({
          orderBy: { createdAt: "desc" },
          take: 6,
          select: { id: true, reference: true, type: true, status: true, name: true, organisation: true, createdAt: true },
        })
      : Promise.resolve([]),
    showContent
      ? prisma.resource.groupBy({ by: ["status"], _count: { _all: true } })
      : Promise.resolve([]),
    showEvents
      ? prisma.event.findMany({
          where: { startsAt: { gte: now }, status: { in: ["PUBLISHED", "DRAFT"] } },
          orderBy: { startsAt: "asc" },
          take: 4,
          select: {
            id: true,
            title: true,
            startsAt: true,
            status: true,
            capacity: true,
            _count: { select: { registrations: { where: { status: "CONFIRMED" } } } },
          },
        })
      : Promise.resolve([]),
    can(actor.role, "subscribers:manage")
      ? prisma.subscriber.count({ where: { status: "SUBSCRIBED" } })
      : Promise.resolve(null),
  ])

  return {
    showEnquiries,
    showContent,
    showEvents,
    openByType: Object.fromEntries(byType.map((b) => [b.type, b._count._all])) as Record<string, number>,
    newCount,
    mine,
    recent,
    resources: Object.fromEntries(resources.map((r) => [r.status, r._count._all])) as Record<string, number>,
    upcoming,
    subscribers,
  }
}
