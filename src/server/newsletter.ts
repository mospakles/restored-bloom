import "server-only"
import { prisma } from "@/lib/db"
import type { Prisma } from "@/generated/prisma/client"
import { env, isEmailConfigured } from "@/lib/env"
import { emailBody, sendEmail } from "@/lib/email"
import { randomToken, sha256 } from "@/lib/security"
import { CONSENT_VERSION, flattenErrors, NEWSLETTER_CONSENT_TEXT, newsletterSchema, type FieldErrors } from "@/lib/validation"
import { assertCan, audit, type Actor } from "@/server/actor"
import { getSettings } from "@/server/settings"

/** The signup form is shown only when enabled by an administrator AND email delivery is configured (double opt-in). */
export async function isNewsletterAvailable() {
  if (!isEmailConfigured()) return false
  const settings = await getSettings()
  return settings.newsletterEnabled
}

export type SubscribeResult = { ok: true } | { ok: false; errors: FieldErrors } | { ok: false; unavailable: true }

/**
 * Double opt-in. The response is identical whether or not the address is
 * already subscribed, so the form cannot be used to discover subscribers.
 */
export async function subscribe(input: Record<string, unknown>): Promise<SubscribeResult> {
  if (!(await isNewsletterAvailable())) return { ok: false, unavailable: true }
  const parsed = newsletterSchema.safeParse(input)
  if (!parsed.success) return { ok: false, errors: flattenErrors(parsed.error) }
  const { email } = parsed.data

  const existing = await prisma.subscriber.findUnique({ where: { email } })
  if (existing?.status === "SUBSCRIBED") return { ok: true }

  const token = randomToken()
  const data = {
    status: "PENDING" as const,
    tokenHash: sha256(token),
    consentText: NEWSLETTER_CONSENT_TEXT,
    consentVersion: CONSENT_VERSION,
    consentAt: new Date(),
    unsubscribedAt: null,
  }
  if (existing) await prisma.subscriber.update({ where: { id: existing.id }, data })
  else await prisma.subscriber.create({ data: { ...data, email } })

  await sendEmail({
    to: email,
    subject: "Please confirm your Restored Bloom updates",
    text: emailBody([
      "Thank you for your interest in Restored Bloom.",
      "",
      `Please confirm you would like to receive occasional updates: ${env.siteUrl}/newsletter/confirm?token=${token}`,
      "",
      "If you did not ask for this, ignore this email and you will not be subscribed.",
    ]),
  })
  return { ok: true }
}

export async function confirmSubscription(token: string): Promise<"confirmed" | "invalid"> {
  if (!token || token.length > 100) return "invalid"
  const sub = await prisma.subscriber.findUnique({ where: { tokenHash: sha256(token) } })
  if (!sub || sub.status === "UNSUBSCRIBED") return "invalid"
  if (sub.status === "PENDING") {
    // Rotate the token so the confirmation link cannot be reused; send the unsubscribe link separately.
    const unsubscribeToken = randomToken()
    await prisma.subscriber.update({
      where: { id: sub.id },
      data: { status: "SUBSCRIBED", confirmedAt: new Date(), tokenHash: sha256(unsubscribeToken) },
    })
    await sendEmail({
      to: sub.email,
      subject: "You're subscribed to Restored Bloom updates",
      text: emailBody([
        "Your subscription is confirmed. Thank you.",
        "",
        `You can unsubscribe at any time: ${env.siteUrl}/newsletter/unsubscribe?token=${unsubscribeToken}`,
      ]),
    })
  }
  return "confirmed"
}

export async function unsubscribe(token: string): Promise<"unsubscribed" | "invalid"> {
  if (!token || token.length > 100) return "invalid"
  const sub = await prisma.subscriber.findUnique({ where: { tokenHash: sha256(token) } })
  if (!sub) return "invalid"
  await prisma.subscriber.update({
    where: { id: sub.id },
    data: { status: "UNSUBSCRIBED", unsubscribedAt: new Date() },
  })
  return "unsubscribed"
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

export async function listSubscribers(actor: Actor, status?: string) {
  assertCan(actor, "subscribers:manage")
  const where: Prisma.SubscriberWhereInput =
    status === "PENDING" || status === "SUBSCRIBED" || status === "UNSUBSCRIBED" ? { status } : {}
  const [items, counts] = await Promise.all([
    prisma.subscriber.findMany({ where, orderBy: { createdAt: "desc" }, take: 500 }),
    prisma.subscriber.groupBy({ by: ["status"], _count: { _all: true } }),
  ])
  return { items, counts: Object.fromEntries(counts.map((c) => [c.status, c._count._all])) as Record<string, number> }
}

export async function deleteSubscriber(actor: Actor, id: string) {
  assertCan(actor, "subscribers:manage")
  await prisma.subscriber.delete({ where: { id } })
  await audit(actor, "subscriber.delete", "Subscriber", id)
}

export async function exportSubscribers(actor: Actor) {
  assertCan(actor, "subscribers:export")
  const rows = await prisma.subscriber.findMany({ where: { status: "SUBSCRIBED" }, orderBy: { confirmedAt: "asc" } })
  await audit(actor, "subscriber.export", "Subscriber", null, { count: rows.length })
  return rows.map((s) => ({
    email: s.email,
    confirmed: s.confirmedAt?.toISOString() ?? "",
    consent_version: s.consentVersion,
    consent_text: s.consentText,
  }))
}
