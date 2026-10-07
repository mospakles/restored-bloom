import "server-only"

/**
 * Centralised server configuration. Optional integrations report whether they
 * are configured so the UI never presents an unconfigured feature as working.
 */

function optional(name: string): string | undefined {
  const value = process.env[name]?.trim()
  return value ? value : undefined
}

function required(name: string): string {
  const value = optional(name)
  if (!value) throw new Error(`Missing required environment variable: ${name}`)
  return value
}

export const env = {
  get databaseUrl() {
    return required("DATABASE_URL")
  },
  get siteUrl() {
    return (optional("NEXT_PUBLIC_SITE_URL") ?? optional("BETTER_AUTH_URL") ?? "http://localhost:3000").replace(/\/$/, "")
  },
  get authSecret() {
    const secret = required("BETTER_AUTH_SECRET")
    if (process.env.NODE_ENV === "production" && secret.length < 32) {
      throw new Error("BETTER_AUTH_SECRET must be at least 32 characters in production")
    }
    return secret
  },
  /** Used to hash IP addresses for rate limiting. Falls back to the auth secret. */
  get hashSecret() {
    return optional("IP_HASH_SECRET") ?? this.authSecret
  },
  get smtp() {
    const host = optional("SMTP_HOST")
    const from = optional("EMAIL_FROM")
    const user = optional("SMTP_USER")
    let pass = optional("SMTP_PASSWORD")
    // A username without a password is an unfinished setup, treat email as not configured.
    if (!host || !from || (user && !pass)) return null
    // Google shows App Passwords in groups of four ("abcd efgh ijkl mnop"); spaces are not part of it.
    if (pass && host === "smtp.gmail.com") pass = pass.replace(/\s+/g, "")
    return {
      host,
      port: Number(optional("SMTP_PORT") ?? 587),
      secure: optional("SMTP_SECURE") === "true",
      user,
      pass,
      from,
    }
  },
  /** Comma-separated staff addresses that receive "new submission" alerts. */
  get notificationEmails(): string[] {
    return (optional("ADMIN_NOTIFICATION_EMAILS") ?? "")
      .split(",")
      .map((e) => e.trim())
      .filter(Boolean)
  },
}

export function isEmailConfigured(): boolean {
  return env.smtp !== null
}
