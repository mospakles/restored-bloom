"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpen,
  CalendarDays,
  ClipboardList,
  FileText,
  History,
  Inbox,
  LayoutDashboard,
  LifeBuoy,
  Mail,
  Menu,
  Settings,
  ShieldCheck,
  UserCircle,
  Users,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { BloomMark } from "@/components/site/botanical"

const ICONS = {
  overview: LayoutDashboard,
  enquiries: Inbox,
  resources: BookOpen,
  events: CalendarDays,
  content: FileText,
  support: LifeBuoy,
  subscribers: Mail,
  settings: Settings,
  users: Users,
  audit: History,
  data: ShieldCheck,
  account: UserCircle,
  registrations: ClipboardList,
} as const

export type NavItem = { href: string; label: string; icon: keyof typeof ICONS }

export function AdminShell({
  nav,
  user,
  signOut,
  children,
}: {
  nav: NavItem[]
  user: { name: string; roleLabel: string }
  signOut: React.ReactNode
  children: React.ReactNode
}) {
  const pathname = usePathname()
  // Menu state is tied to the path it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null)
  const open = openOn === pathname
  const setOpen = (next: boolean | ((o: boolean) => boolean)) =>
    setOpenOn((typeof next === "function" ? next(open) : next) ? pathname : null)
  const active = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href))

  const navList = (
    <ul className="space-y-1">
      {nav.map((item) => {
        const Icon = ICONS[item.icon]
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active(item.href) ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[0.95rem] font-medium transition-colors",
                active(item.href) ? "bg-plum-800 text-cream-50" : "text-plum-800 hover:bg-cream-200",
              )}
            >
              <Icon className="h-4.5 w-4.5" aria-hidden="true" />
              {item.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )

  return (
    <div className="min-h-dvh bg-cream-50 lg:grid lg:grid-cols-[16rem_1fr]">
      <a
        href="#admin-main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-plum-900 focus:px-5 focus:py-3 focus:text-white"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-cream-300 bg-cream-100 px-4 lg:hidden">
        <Link href="/admin" className="flex items-center gap-2 font-display text-lg text-plum-900">
          <BloomMark className="h-7 w-7 text-gold-400" /> Dashboard
        </Link>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="admin-nav"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-cream-200"
        >
          {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </header>

      <aside
        id="admin-nav"
        className={cn(
          "border-r border-cream-300 bg-cream-100 lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col",
          open ? "block" : "hidden lg:flex",
        )}
      >
        <div className="hidden h-18 items-center gap-2 px-5 lg:flex">
          <BloomMark className="h-8 w-8 text-gold-400" />
          <span className="font-display text-xl text-plum-900">Restored Bloom</span>
        </div>
        <nav aria-label="Dashboard" className="flex-1 overflow-y-auto px-3 py-4">
          {navList}
        </nav>
        <div className="border-t border-cream-300 p-4">
          <p className="truncate text-sm font-semibold text-plum-900">{user.name}</p>
          <p className="text-xs text-plum-600">{user.roleLabel}</p>
          <div className="mt-3 flex items-center justify-between gap-2">
            <Link href="/" className="text-sm font-medium text-rose-700 hover:underline">
              View site
            </Link>
            {signOut}
          </div>
        </div>
      </aside>

      <main id="admin-main" tabIndex={-1} className="min-w-0 px-4 py-8 outline-none sm:px-8 lg:px-10">
        {children}
      </main>
    </div>
  )
}
