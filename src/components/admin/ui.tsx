import Link from "next/link"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/misc"

export function AdminHeader({
  title,
  description,
  actions,
  back,
}: {
  title: string
  description?: React.ReactNode
  actions?: React.ReactNode
  back?: { href: string; label: string }
}) {
  return (
    <div className="mb-8">
      {back && (
        <Link href={back.href} className="text-sm font-semibold text-rose-700 hover:underline">
          ← {back.label}
        </Link>
      )}
      <div className="mt-1 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl text-plum-900">{title}</h1>
          {description && <div className="mt-1.5 text-plum-700">{description}</div>}
        </div>
        {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
      </div>
    </div>
  )
}

export function Panel({ title, children, className, actions }: { title?: string; children: React.ReactNode; className?: string; actions?: React.ReactNode }) {
  return (
    <section className={cn("rounded-2xl border border-cream-300 bg-white p-5 sm:p-6", className)}>
      {(title || actions) && (
        <div className="mb-4 flex items-center justify-between gap-3">
          {title && <h2 className="font-sans text-base font-bold text-plum-900">{title}</h2>}
          {actions}
        </div>
      )}
      {children}
    </section>
  )
}

export function Table({ children, caption }: { children: React.ReactNode; caption: string }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-cream-300 bg-white">
      <table className="w-full min-w-[40rem] text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        {children}
      </table>
    </div>
  )
}

export function Th({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <th scope="col" className={cn("border-b border-cream-300 bg-cream-100 px-4 py-3 font-semibold text-plum-800", className)}>
      {children}
    </th>
  )
}

export function Td({ children, className }: { children?: React.ReactNode; className?: string }) {
  return <td className={cn("border-b border-cream-200 px-4 py-3 align-top text-plum-900", className)}>{children}</td>
}

export function EmptyState({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-cream-400 bg-white p-10 text-center">
      <p className="font-display text-xl text-plum-900">{title}</p>
      {children && <div className="mx-auto mt-2 max-w-md text-plum-700">{children}</div>}
    </div>
  )
}

const STATUS_TONES: Record<string, "plum" | "rose" | "sage" | "cream" | "amber" | "outline"> = {
  NEW: "rose",
  IN_REVIEW: "amber",
  CONTACTED: "plum",
  APPROVED: "sage",
  CLOSED: "cream",
  DRAFT: "amber",
  PUBLISHED: "sage",
  ARCHIVED: "cream",
  CANCELLED: "rose",
  CONFIRMED: "sage",
  PENDING: "amber",
  SUBSCRIBED: "sage",
  UNSUBSCRIBED: "cream",
}

export function StatusBadge({ status, label }: { status: string; label?: string }) {
  return <Badge tone={STATUS_TONES[status] ?? "outline"}>{label ?? status.replace("_", " ").toLowerCase().replace(/^\w/, (c) => c.toUpperCase())}</Badge>
}

export function Pagination({ page, pageCount, href }: { page: number; pageCount: number; href: (p: number) => string }) {
  if (pageCount <= 1) return null
  return (
    <nav aria-label="Pagination" className="mt-6 flex items-center justify-between text-sm">
      {page > 1 ? (
        <Link href={href(page - 1)} className="font-semibold text-rose-700 hover:underline">
          ← Previous
        </Link>
      ) : (
        <span />
      )}
      <span className="text-plum-600">
        Page {page} of {pageCount}
      </span>
      {page < pageCount ? (
        <Link href={href(page + 1)} className="font-semibold text-rose-700 hover:underline">
          Next →
        </Link>
      ) : (
        <span />
      )}
    </nav>
  )
}
