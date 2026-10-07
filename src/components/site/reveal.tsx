"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

const REVEAL_SELECTOR = ".reveal, .card-soft, main section h2"
const PETAL_COLOURS = ["#e9bc72", "#87adb6", "#aebd9c", "#f3d39b", "#dea3a8", "#a3b1c6"]

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

/**
 * Playful, progressive motion for the public site:
 *  - scroll reveals: below-the-fold elements spring into place, staggered
 *  - card tilt: hoverable cards lean towards the pointer
 *  - pointer parallax: hero art drifts gently with the mouse
 *  - petal burst: clicking an element with [data-burst] releases a few petals
 *
 * Nothing is hidden before this script runs, and all motion is skipped for
 * visitors who prefer reduced motion. Tilt and parallax only run with a fine
 * pointer (mouse/trackpad), not on touch screens.
 */
export function SiteMotion() {
  const pathname = usePathname()

  // Scroll reveals, re-run on every client-side navigation.
  useEffect(() => {
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) return

    const els = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR)).filter(
      (el) => !el.closest(".stagger") && !el.classList.contains("reveal-in"),
    )
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const el = entry.target as HTMLElement
          el.classList.remove("reveal-pending")
          el.classList.add("reveal-in")
          // Once it has arrived, drop the stagger delay so hover effects respond instantly.
          el.addEventListener("transitionend", () => el.style.removeProperty("--reveal-delay"), { once: true })
          observer.unobserve(el)
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    )

    for (const el of els) {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) continue
      const siblings = el.parentElement ? Array.from(el.parentElement.children) : []
      const index = siblings.indexOf(el)
      el.style.setProperty("--reveal-delay", `${Math.min(index, 5) * 90}ms`)
      el.classList.add("reveal-pending")
      observer.observe(el)
    }
    return () => observer.disconnect()
  }, [pathname])

  // Pointer-driven effects and petal bursts, attached once.
  useEffect(() => {
    if (prefersReducedMotion()) return
    const finePointer = window.matchMedia("(pointer: fine)").matches
    const root = document.documentElement
    let frame = 0

    const onMove = (e: PointerEvent) => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        // Parallax: -1..1 from the centre of the viewport.
        root.style.setProperty("--px", ((e.clientX / window.innerWidth) * 2 - 1).toFixed(3))
        root.style.setProperty("--py", ((e.clientY / window.innerHeight) * 2 - 1).toFixed(3))
        // Tilt the hovered card towards the pointer (max ~6°).
        const card = (e.target as Element | null)?.closest?.<HTMLElement>(".card-hover")
        if (card) {
          const r = card.getBoundingClientRect()
          card.style.setProperty("--tilt-x", (((e.clientX - r.left) / r.width - 0.5) * 8).toFixed(2))
          card.style.setProperty("--tilt-y", (((e.clientY - r.top) / r.height - 0.5) * 8).toFixed(2))
        }
      })
    }

    const onClick = (e: MouseEvent) => {
      const trigger = (e.target as Element | null)?.closest?.("[data-burst]")
      if (!trigger) return
      const x = e.clientX || trigger.getBoundingClientRect().left + trigger.getBoundingClientRect().width / 2
      const y = e.clientY || trigger.getBoundingClientRect().top
      for (let i = 0; i < 10; i++) {
        const petal = document.createElement("span")
        petal.className = "petal-burst"
        petal.style.left = `${x - 5}px`
        petal.style.top = `${y - 8}px`
        petal.style.background = PETAL_COLOURS[i % PETAL_COLOURS.length]
        document.body.appendChild(petal)
        const angle = (Math.PI * 2 * i) / 10 + Math.random() * 0.5
        const distance = 50 + Math.random() * 50
        const animation = petal.animate(
          [
            { transform: "translate(0, 0) rotate(0deg) scale(0.6)", opacity: 1 },
            {
              transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance + 30}px) rotate(${180 + Math.random() * 180}deg) scale(1)`,
              opacity: 0,
            },
          ],
          { duration: 900 + Math.random() * 300, easing: "cubic-bezier(0.2, 0.7, 0.2, 1)" },
        )
        animation.onfinish = () => petal.remove()
      }
    }

    if (finePointer) window.addEventListener("pointermove", onMove, { passive: true })
    document.addEventListener("click", onClick)
    return () => {
      window.removeEventListener("pointermove", onMove)
      document.removeEventListener("click", onClick)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return null
}
