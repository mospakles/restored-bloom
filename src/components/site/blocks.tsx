import Link from "next/link"
import { ArrowRight, BookOpen, HandHeart, Heart, Leaf, Sprout, Users } from "lucide-react"
import { Container, Badge, Eyebrow } from "@/components/ui/misc"
import { PetalField, Sprig } from "@/components/site/botanical"
import { PROGRAMME_STATUS_LABELS, type Programme, type ProgrammeStatus } from "@/lib/content"
import { cn } from "@/lib/utils"

export function PageHero({
  eyebrow,
  title,
  children,
  aside,
}: {
  eyebrow?: string
  title: React.ReactNode
  children?: React.ReactNode
  aside?: React.ReactNode
}) {
  return (
    <section className="relative overflow-hidden border-b border-cream-300 bg-gradient-to-b from-cream-100 to-cream-50">
      <PetalField className="pointer-events-none absolute -right-20 top-0 w-[38rem] opacity-70" />
      <Container className="relative grid gap-10 py-14 sm:py-20 lg:grid-cols-[1.5fr_1fr] lg:items-end">
        <div className="max-w-2xl motion-safe:animate-bloom-in">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="text-4xl text-plum-900 sm:text-5xl lg:text-[3.4rem]">{title}</h1>
          {children && <div className="mt-5 text-lg leading-relaxed text-plum-700">{children}</div>}
        </div>
        {aside}
      </Container>
    </section>
  )
}

const ICONS = { seedling: Sprout, leaf: Leaf, people: Users, community: HandHeart, heart: Heart } as const

export function ProgrammeStatusBadge({ status }: { status: ProgrammeStatus }) {
  const tone = status === "operating" ? "sage" : status === "piloting" ? "rose" : "cream"
  return <Badge tone={tone}>{PROGRAMME_STATUS_LABELS[status]}</Badge>
}

export function ProgrammeCard({ programme, status }: { programme: Programme; status: ProgrammeStatus }) {
  const Icon = ICONS[programme.icon]
  return (
    <article className="group relative flex flex-col rounded-3xl border border-cream-300 bg-white p-6 shadow-sm shadow-plum-900/5 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-50 text-rose-700">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <ProgrammeStatusBadge status={status} />
      </div>
      <h3 className="mt-5 text-xl text-plum-900">
        <Link href={`/programmes#${programme.id}`} className="after:absolute after:inset-0 after:rounded-3xl">
          {programme.title}
        </Link>
      </h3>
      <p className="mt-2 flex-1 leading-relaxed text-plum-700">{programme.short}</p>
      <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-rose-700">
        Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </article>
  )
}

export function Steps({ steps }: { steps: readonly { title: string; body: string }[] }) {
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {steps.map((s, i) => (
        <li key={s.title} className="relative rounded-3xl border border-cream-300 bg-white p-5">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full bg-plum-800 font-display text-cream-50"
            aria-hidden="true"
          >
            {i + 1}
          </span>
          <h3 className="mt-4 text-lg text-plum-900">
            <span className="sr-only">Step {i + 1}: </span>
            {s.title}
          </h3>
          <p className="mt-2 text-[0.95rem] leading-relaxed text-plum-700">{s.body}</p>
        </li>
      ))}
    </ol>
  )
}

export function CtaBand({
  title,
  children,
  actions,
  className,
}: {
  title: string
  children?: React.ReactNode
  actions: React.ReactNode
  className?: string
}) {
  return (
    <section className={cn("py-16", className)}>
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-plum-900 px-6 py-12 text-cream-50 sm:px-12">
          <Sprig className="pointer-events-none absolute -bottom-10 -right-6 h-72 opacity-40 sm:right-8" />
          <div className="relative max-w-xl">
            <h2 className="text-3xl text-white sm:text-4xl">{title}</h2>
            {children && <div className="mt-4 text-lg leading-relaxed text-plum-100">{children}</div>}
            <div className="mt-8 flex flex-wrap gap-3">{actions}</div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export function ResourceIcon({ className }: { className?: string }) {
  return <BookOpen className={className} aria-hidden="true" />
}
