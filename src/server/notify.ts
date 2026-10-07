import "server-only"
import { env } from "@/lib/env"
import { emailBody, sendEmail } from "@/lib/email"

/**
 * Minimal staff alert: a reference and a link to the dashboard. Submission
 * contents are deliberately excluded so personal information stays in the
 * access-controlled dashboard rather than in mailboxes.
 */
export async function notifyStaff(kind: string, reference: string, path: string) {
  const recipients = env.notificationEmails
  if (recipients.length === 0) return
  await sendEmail({
    to: recipients,
    subject: `New ${kind} — ${reference}`,
    text: emailBody([
      `A new ${kind} has been received (reference ${reference}).`,
      "",
      `Sign in to view it: ${env.siteUrl}${path}`,
    ]),
  })
}

/** Acknowledgement to the person who submitted. Contains no submitted content. */
export async function acknowledge(to: string, kind: string, reference: string) {
  await sendEmail({
    to,
    subject: `We've received your ${kind} (${reference})`,
    text: emailBody([
      "Thank you for getting in touch with Restored Bloom.",
      "",
      `We've received your ${kind}. Your reference is ${reference}. A member of our team will reply as soon as they can.`,
      "",
      "Please note: this is not an emergency service. If anyone is in immediate danger, contact local emergency services.",
      "",
      "If you did not submit this, you can ignore this email.",
    ]),
  })
}
