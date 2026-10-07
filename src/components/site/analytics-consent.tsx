"use client"

import { useSyncExternalStore } from "react"
import Script from "next/script"
import { Button } from "@/components/ui/button"

const KEY = "rb-analytics-consent"
const EVENT = "rb-consent-change"

function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback)
  window.addEventListener("storage", callback)
  return () => {
    window.removeEventListener(EVENT, callback)
    window.removeEventListener("storage", callback)
  }
}

function readConsent(): "granted" | "denied" | null {
  try {
    const v = window.localStorage.getItem(KEY)
    return v === "granted" || v === "denied" ? v : null
  } catch {
    return null
  }
}

/**
 * Privacy-friendly analytics (Plausible), loaded only after explicit consent.
 * Rendered only in the public site layout, so staff pages are never tracked.
 * Plausible records page views only, never form contents.
 */
export function AnalyticsConsent({ domain, src }: { domain: string; src: string }) {
  // "unknown" during server render; the stored choice after hydration.
  const consent = useSyncExternalStore(subscribe, readConsent, () => "unknown" as const)

  const choose = (value: "granted" | "denied") => {
    try {
      window.localStorage.setItem(KEY, value)
    } catch {}
    window.dispatchEvent(new Event(EVENT))
  }

  return (
    <>
      {consent === "granted" && <Script defer data-domain={domain} src={src} strategy="afterInteractive" />}
      {consent === null && (
        <div
          role="region"
          aria-label="Analytics consent"
          className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-xl rounded-2xl card-soft p-4 shadow-lg sm:inset-x-6 sm:p-5"
        >
          <p className="text-sm leading-relaxed text-plum-800">
            May we count anonymous page visits to understand how the site is used? We don&apos;t use advertising cookies
            and never record what you type into forms.
          </p>
          <div className="mt-3 flex gap-2">
            <Button size="sm" onClick={() => choose("granted")}>
              Allow
            </Button>
            <Button size="sm" variant="outline" onClick={() => choose("denied")}>
              No thanks
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
