"use client"

import { useState } from "react"
import { X } from "lucide-react"
import Link from "next/link"

const SANS = "Inter, system-ui, sans-serif"

export function EmergencyBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div
      role="alert"
      aria-label="Emergency information"
      style={{ backgroundColor: "#7D3C33", color: "#FDFAF6" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 text-sm flex-1 justify-center" style={{ fontFamily: SANS }}>
          <span className="w-1.5 h-1.5 rounded-full bg-red-300 shrink-0 animate-pulse" aria-hidden="true" />
          <span style={{ color: "rgba(253,250,246,0.80)" }}>
            <strong style={{ color: "#FDFAF6" }}>In immediate danger?</strong>{" "}
            Call emergency services or{" "}
            <Link
              href="/get-help#emergency"
              className="underline underline-offset-2 font-medium transition-opacity hover:opacity-80"
              style={{ color: "#F5C5B8" }}
            >
              view crisis helplines
            </Link>
          </span>
          <span className="hidden sm:block mx-3" style={{ color: "rgba(253,250,246,0.25)" }} aria-hidden="true">·</span>
          <span className="hidden sm:block text-sm font-semibold" style={{ color: "#F5C5B8", fontFamily: SANS }}>
            Nigeria: 0800-CALL-NAPTIP
          </span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="shrink-0 p-1 rounded transition-opacity hover:opacity-70"
          aria-label="Dismiss emergency banner"
          style={{ color: "rgba(253,250,246,0.6)" }}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
