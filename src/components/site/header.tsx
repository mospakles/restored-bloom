"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { NAV, SITE } from "@/lib/content"
import { cn } from "@/lib/utils"
import { BloomMark } from "@/components/site/botanical"
import { buttonVariants } from "@/components/ui/button"

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <BloomMark className="h-8 w-8 text-rose-500" />
      <span className="font-display text-[1.35rem] leading-none tracking-tight text-plum-900">
        Restored <span className="italic text-rose-700">Bloom</span>
      </span>
    </span>
  )
}

export function SiteHeader() {
  const pathname = usePathname()
  // Menu state is tied to the path it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null)
  const open = openOn === pathname
  const setOpen = (next: boolean | ((o: boolean) => boolean)) =>
    setOpenOn((typeof next === "function" ? next(open) : next) ? pathname : null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenOn(null)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener("keydown", onKey)
    panelRef.current?.querySelector<HTMLElement>("a")?.focus()
    return () => document.removeEventListener("keydown", onKey)
  }, [open])

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="sticky top-0 z-40 border-b border-cream-300/80 bg-cream-50/90 backdrop-blur supports-[backdrop-filter]:bg-cream-50/80">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label={`${SITE.name} — home`} className="shrink-0 rounded-lg">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-[0.95rem] font-medium transition-colors hover:bg-plum-50 hover:text-plum-900",
                    isActive(item.href) ? "bg-plum-50 text-plum-900" : "text-plum-700",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/invite-us#enquire" className={buttonVariants({ size: "sm" })}>
            Invite us
          </Link>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-plum-800 hover:bg-plum-50 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>

      <div
        id="mobile-nav"
        ref={panelRef}
        hidden={!open}
        className="border-t border-cream-300 bg-cream-50 lg:hidden"
      >
        <nav aria-label="Mobile" className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <ul className="space-y-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "block rounded-xl px-4 py-3 text-base font-medium",
                    isActive(item.href) ? "bg-plum-50 text-plum-900" : "text-plum-800 hover:bg-cream-100",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="block rounded-xl px-4 py-3 text-base font-medium text-plum-800 hover:bg-cream-100">
                Contact
              </Link>
            </li>
          </ul>
          <div className="mt-4 grid gap-2 border-t border-cream-300 pt-4">
            <Link href="/invite-us#enquire" className={buttonVariants({ className: "w-full" })}>
              Invite us
            </Link>
            <Link href="/support" className={buttonVariants({ variant: "outline", className: "w-full" })}>
              Finding support
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
