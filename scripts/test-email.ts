/**
 * Sends a test email to check the SMTP settings.
 *
 *   npm run email:test                 # sends to ADMIN_NOTIFICATION_EMAILS
 *   npm run email:test -- you@example.com
 */
import "dotenv/config"

async function main() {
  const { env } = await import("../src/lib/env")
  const { sendEmail, emailBody } = await import("../src/lib/email")

  if (!env.smtp) {
    throw new Error(
      "Email is not configured. Set SMTP_HOST, EMAIL_FROM and (if SMTP_USER is set) SMTP_PASSWORD in .env.",
    )
  }
  const to = process.argv[2] ?? env.notificationEmails[0]
  if (!to) throw new Error("No recipient. Pass an address, or set ADMIN_NOTIFICATION_EMAILS.")

  console.log(`Sending a test email via ${env.smtp.host}:${env.smtp.port} to ${to}…`)
  const result = await sendEmail({
    to,
    subject: "Restored Bloom — test email",
    text: emailBody(["This is a test email from the Restored Bloom website. Email delivery is working."]),
  })
  if (!result.sent) throw new Error("Sending failed. Check the SMTP settings and App Password, then try again.")
  console.log("✔ Sent. Check the inbox (and the spam folder).")
}

main().catch((e) => {
  console.error(`✖ ${e instanceof Error ? e.message : e}`)
  process.exit(1)
})
