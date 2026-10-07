import "server-only"
import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto"
import { headers } from "next/headers"
import { env } from "@/lib/env"

export function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex")
}

export function randomToken(bytes = 32): string {
  return randomBytes(bytes).toString("base64url")
}

/**
 * The client IP as reported by the hosting platform's proxy.
 *
 * Default: the first X-Forwarded-For entry. Railway's edge proxy controls that
 * header, so visitors cannot spoof it there (verified against the live site).
 * Behind a different proxy or CDN, set CLIENT_IP_HEADER to the header it
 * guarantees, e.g. "cf-connecting-ip" for Cloudflare.
 */
export function clientIp(h: Headers): string {
  const custom = process.env.CLIENT_IP_HEADER?.trim().toLowerCase()
  if (custom) return h.get(custom)?.split(",")[0]?.trim() || "unknown"
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip")?.trim() || "unknown"
}

/** Keyed hash of the client IP. Raw IP addresses are never stored. */
export async function clientFingerprint(): Promise<string> {
  const ip = clientIp(await headers())
  return createHmac("sha256", env.hashSecret).update(ip).digest("hex").slice(0, 32)
}

// ─── Form timing tokens (bot protection) ─────────────────────────────────────
// A signed timestamp is embedded in each public form. Submissions that arrive
// implausibly fast, or with a tampered/expired token, are rejected.

const MIN_FILL_MS = 2_500
const MAX_AGE_MS = 1000 * 60 * 60 * 6

export function createFormToken(now = Date.now()): string {
  const ts = String(now)
  const sig = createHmac("sha256", env.hashSecret).update(`form:${ts}`).digest("base64url")
  return `${ts}.${sig}`
}

export type FormTokenCheck = "ok" | "invalid" | "too-fast" | "expired"

export function checkFormToken(token: unknown, now = Date.now()): FormTokenCheck {
  if (typeof token !== "string") return "invalid"
  const [ts, sig] = token.split(".")
  if (!ts || !sig || !/^\d+$/.test(ts)) return "invalid"
  const expected = createHmac("sha256", env.hashSecret).update(`form:${ts}`).digest("base64url")
  const a = Buffer.from(sig)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !timingSafeEqual(a, b)) return "invalid"
  const age = now - Number(ts)
  if (age < MIN_FILL_MS) return "too-fast"
  if (age > MAX_AGE_MS) return "expired"
  return "ok"
}
