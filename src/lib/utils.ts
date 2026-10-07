import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const LAGOS_TZ = "Africa/Lagos"

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: LAGOS_TZ,
  }).format(new Date(date))
}

export function formatDateTime(date: Date | string): string {
  return new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: LAGOS_TZ,
  }).format(new Date(date))
}

export function formatTime(date: Date | string): string {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: LAGOS_TZ,
  }).format(new Date(date))
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80)
}

/** Converts a `datetime-local` input value (interpreted as Lagos time, UTC+1, no DST) to a Date. */
export function fromLagosLocalInput(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)) return null
  const d = new Date(`${value}:00+01:00`)
  return Number.isNaN(d.getTime()) ? null : d
}

/** Formats a Date for a `datetime-local` input, in Lagos time. */
export function toLagosLocalInput(date: Date | null | undefined): string {
  if (!date) return ""
  const shifted = new Date(date.getTime() + 60 * 60 * 1000)
  return shifted.toISOString().slice(0, 16)
}
