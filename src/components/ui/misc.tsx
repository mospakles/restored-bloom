import * as React from "react"
import { AlertTriangle, Info, CheckCircle2, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

export function Container({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)} {...props} />
}

export function Eyebrow({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-lagoon-700", className)}
      {...props}
    >
      <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 shrink-0 text-gold-400" aria-hidden="true" focusable="false">
        <g transform="translate(10 10)" fill="currentColor">
          {[0, 72, 144, 216, 288].map((r) => (
            <ellipse key={r} cx="0" cy="-4.6" rx="3" ry="4.8" transform={`rotate(${r})`} />
          ))}
        </g>
      </svg>
      {children}
    </p>
  )
}

const BADGE_TONES = {
  plum: "bg-plum-100 text-plum-800",
  rose: "bg-rose-100 text-lagoon-800",
  sage: "bg-sage-100 text-sage-800",
  cream: "bg-cream-200 text-plum-800",
  amber: "bg-amber-100 text-amber-900",
  outline: "border border-plum-200 text-plum-700",
} as const

export function Badge({
  tone = "plum",
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: keyof typeof BADGE_TONES }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap",
        BADGE_TONES[tone],
        className,
      )}
      {...props}
    />
  )
}

const NOTICE = {
  info: { icon: Info, cls: "border-plum-200 bg-plum-50 text-plum-900" },
  warning: { icon: AlertTriangle, cls: "border-amber-300 bg-amber-50 text-amber-950" },
  success: { icon: CheckCircle2, cls: "border-sage-300 bg-sage-50 text-sage-800" },
  pending: { icon: Clock, cls: "border-rose-200 bg-rose-50 text-lagoon-800" },
} as const

export function Notice({
  tone = "info",
  title,
  children,
  className,
  role,
}: {
  tone?: keyof typeof NOTICE
  title?: string
  children?: React.ReactNode
  className?: string
  role?: string
}) {
  const { icon: Icon, cls } = NOTICE[tone]
  return (
    <div className={cn("flex gap-3 rounded-2xl border p-4 text-sm leading-relaxed", cls, className)} role={role}>
      <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      <div className="min-w-0">
        {title && <p className="font-semibold">{title}</p>}
        {children && <div className={cn(title && "mt-1")}>{children}</div>}
      </div>
    </div>
  )
}

/** Marks content that the founder still needs to confirm. Visible to the public by design, until approved. */
export function DraftFlag({ children = "Draft, awaiting founder confirmation" }: { children?: React.ReactNode }) {
  return (
    <Badge tone="amber" className="align-middle">
      <Clock className="h-3 w-3" aria-hidden="true" />
      {children}
    </Badge>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  children,
  align = "left",
  as: Tag = "h2",
  className,
}: {
  eyebrow?: string
  title: React.ReactNode
  children?: React.ReactNode
  align?: "left" | "center"
  as?: "h1" | "h2"
  className?: string
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Tag className={cn(Tag === "h1" ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl", "text-plum-900")}>{title}</Tag>
      {children && <div className="mt-4 text-lg leading-relaxed text-plum-700">{children}</div>}
    </div>
  )
}
