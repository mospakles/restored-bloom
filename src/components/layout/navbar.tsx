"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { NAV_LINKS } from "@/lib/data"

const SERIF = "DM Serif Display, Playfair Display, Georgia, serif"
const SANS = "Inter, system-ui, sans-serif"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setOpenDropdown(null)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "shadow-sm border-b"
          : "border-b"
      )}
      style={{
        backgroundColor: isScrolled ? "rgba(253,250,246,0.97)" : "#FDFAF6",
        borderColor: "#DDD0BA",
        backdropFilter: isScrolled ? "blur(12px)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-17">

          {/* Wordmark */}
          <Link
            href="/"
            className="shrink-0 group"
            aria-label="Restored Bloom — Home"
          >
            <span
              className="text-[1.25rem] leading-none transition-opacity group-hover:opacity-75"
              style={{ fontFamily: SERIF, fontWeight: 400, color: "#101F3C" }}
            >
              Restored{" "}
              <em className="not-italic" style={{ color: "#259292" }}>Bloom</em>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {link.children ? (
                  <button
                    className={cn(
                      "flex items-center gap-1 px-4 py-2 rounded-lg text-sm transition-colors",
                      pathname.startsWith(link.href)
                        ? "font-semibold"
                        : "font-medium"
                    )}
                    style={{
                      fontFamily: SANS,
                      color: pathname.startsWith(link.href) ? "#1C7878" : "#4A5568",
                    }}
                    aria-expanded={openDropdown === link.label}
                    aria-haspopup="true"
                  >
                    {link.label}
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-200",
                        openDropdown === link.label && "rotate-180"
                      )}
                    />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className={cn("flex items-center px-4 py-2 rounded-lg text-sm transition-colors", pathname === link.href ? "font-semibold" : "font-medium")}
                    style={{
                      fontFamily: SANS,
                      color: pathname === link.href ? "#1C7878" : "#4A5568",
                    }}
                  >
                    {link.label}
                  </Link>
                )}

                {/* Dropdown */}
                <AnimatePresence>
                  {link.children && openDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute top-full left-0 mt-1.5 w-60 rounded-xl py-2 z-50 shadow-lg border"
                      style={{ backgroundColor: "#FDFAF6", borderColor: "#DDD0BA" }}
                      role="menu"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-5 py-2.5 text-sm transition-colors hover:text-teal-700"
                          style={{ fontFamily: SANS, color: "#4A5568" }}
                          role="menuitem"
                          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#F6F0E6"; e.currentTarget.style.color = "#1C7878" }}
                          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#4A5568" }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/auth/login"
              className="text-sm font-medium transition-colors"
              style={{ fontFamily: SANS, color: "#4A5568" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#1C7878" }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#4A5568" }}
            >
              Sign In
            </Link>
            <Link
              href="/get-help"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-[1.02]"
              style={{
                backgroundColor: "#259292",
                color: "#FDFAF6",
                fontFamily: SANS,
                letterSpacing: "0.015em",
              }}
            >
              Get Help Now
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-lg transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            style={{ color: "#4A5568" }}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden border-t"
            style={{ backgroundColor: "#FDFAF6", borderColor: "#DDD0BA" }}
          >
            <nav className="px-6 py-5 flex flex-col gap-1 max-h-[80vh] overflow-y-auto" aria-label="Mobile navigation">
              {NAV_LINKS.map((link) => (
                <div key={link.label}>
                  {link.children ? (
                    <>
                      <button
                        onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                        className="flex items-center justify-between w-full px-3 py-3 rounded-xl text-sm font-medium"
                        style={{ fontFamily: SANS, color: "#2C3040" }}
                      >
                        {link.label}
                        <ChevronDown
                          className={cn("h-4 w-4 transition-transform", openDropdown === link.label && "rotate-180")}
                          style={{ color: "#9CA3AF" }}
                        />
                      </button>
                      <AnimatePresence>
                        {openDropdown === link.label && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="ml-4 border-l pl-3 my-1 flex flex-col gap-0.5"
                            style={{ borderColor: "#DDD0BA" }}
                          >
                            {link.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="block px-3 py-2 rounded-lg text-sm transition-colors"
                                style={{ fontFamily: SANS, color: "#4A5568" }}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className={cn("block px-3 py-3 rounded-xl text-sm font-medium transition-colors", pathname === link.href ? "font-semibold" : "")}
                      style={{
                        fontFamily: SANS,
                        color: pathname === link.href ? "#1C7878" : "#2C3040",
                        backgroundColor: pathname === link.href ? "#EBF5F5" : "transparent",
                      }}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}

              <div className="pt-4 mt-3 border-t flex flex-col gap-2" style={{ borderColor: "#DDD0BA" }}>
                <Link
                  href="/auth/login"
                  className="flex items-center px-3 py-3 rounded-xl text-sm font-medium"
                  style={{ fontFamily: SANS, color: "#4A5568" }}
                >
                  Sign In
                </Link>
                <Link
                  href="/get-help"
                  className="flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-semibold"
                  style={{
                    backgroundColor: "#259292",
                    color: "#FDFAF6",
                    fontFamily: SANS,
                    letterSpacing: "0.015em",
                  }}
                >
                  Get Help Now
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
