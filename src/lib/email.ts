import "server-only"
import nodemailer, { type Transporter } from "nodemailer"
import { env } from "@/lib/env"

export type EmailMessage = {
  to: string | string[]
  subject: string
  text: string
}

export type SendResult = { sent: true } | { sent: false; reason: "not-configured" | "failed" }

let transporter: Transporter | null = null

function getTransporter() {
  const smtp = env.smtp
  if (!smtp) return null
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.secure,
      auth: smtp.user ? { user: smtp.user, pass: smtp.pass } : undefined,
    })
  }
  return transporter
}

/**
 * Sends a plain-text transactional email. Never pass submission contents in
 * `text`: notification emails link to the dashboard instead. Errors are logged
 * without recipients or body to keep personal data out of logs.
 */
export async function sendEmail(message: EmailMessage): Promise<SendResult> {
  const t = getTransporter()
  if (!t || !env.smtp) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[email] Not configured, skipped "${message.subject}"`)
    }
    return { sent: false, reason: "not-configured" }
  }
  try {
    await t.sendMail({ from: env.smtp.from, to: message.to, subject: message.subject, text: message.text })
    return { sent: true }
  } catch (error) {
    console.error(`[email] Failed to send "${message.subject}":`, error instanceof Error ? error.name : "unknown error")
    return { sent: false, reason: "failed" }
  }
}

const SIGNATURE = "\n\nRestored Bloom\nThis mailbox is not monitored for emergencies."

export function emailBody(lines: string[]): string {
  return lines.join("\n") + SIGNATURE
}
