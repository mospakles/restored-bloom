import Link from "next/link"
import { ArrowRight, BookOpen, HandHeart, Heart, Leaf, Sprout, Users } from "lucide-react"
import { Container, Badge, Eyebrow } from "@/components/ui/misc"
import { ArchSprig, PetalField, Sprig } from "@/components/site/botanical"
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
    <section className="relative overflow-hidden border-b border-cream-300/70">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cream-100 via-cream-50 to-cream-50" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-40 -top-32 h-[28rem] w-[28rem] rounded-full bg-rose-100/60 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 top-10 h-[24rem] w-[24rem] rounded-full bg-sage-100/70 blur-3xl" aria-hidden="true" />
      <PetalField className="pointer-events-none absolute right-[2%] top-6 hidden w-[24rem] opacity-60 lg:block" />
      <Container className="relative grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.6fr_1fr]">
        <div className="max-w-2xl motion-safe:animate-bloom-in">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="text-4xl leading-[1.08] text-plum-900 sm:text-5xl lg:text-[3.5rem]">{title}</h1>
          {children && <div className="mt-6 text-lg leading-relaxed text-plum-700 sm:text-xl">{children}</div>}
        </div>
        {aside ?? <ArchSprig className="mx-auto hidden h-72 w-56 lg:block" />}
      </Container>
    </section>
  )
}

const ICONS = { seedling: Sprout, leaf: Leaf, people: Users, community: HandHeart, heart: Heart } as const

export function ProgrammeStatusBadge({ status }: { status: ProgrammeStatus }) {
  const tone = status === "operating" ? "sage" : status === "piloting" ? "rose" : "cream"
  return <Badge tone={tone}>{PROGRAMME_STATUS_LABELS[status]}</Badge>
}

const TINTS = [
  "bg-rose-50 text-rose-700 ring-rose-100",
  "bg-sage-50 text-sage-700 ring-sage-100",
  "bg-plum-50 text-plum-700 ring-plum-100",
  "bg-[#fbefe4] text-[#9a5a33] ring-[#f5dcc6]",
  "bg-rose-50 text-rose-700 ring-rose-100",
]

export function ProgrammeCard({ programme, status, index = 0 }: { programme: Programme; status: ProgrammeStatus; index?: number }) {
  const Icon = ICONS[programme.icon]
  return (
    <article className="card-soft card-hover reveal group relative flex flex-col rounded-[1.75rem] p-7">
      <div className="flex items-start justify-between gap-3">
        <span className={cn("inline-flex h-12 w-12 items-center justify-center rounded-2xl ring-4", TINTS[index % TINTS.length])}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <ProgrammeStatusBadge status={status} />
      </div>
      <h3 className="mt-6 text-[1.35rem] text-plum-900">
        <Link href={`/programmes#${programme.id}`} className="after:absolute after:inset-0 after:rounded-[1.75rem]">
          {programme.title}
        </Link>
      </h3>
      <p className="mt-2.5 flex-1 leading-relaxed text-plum-700">{programme.short}</p>
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-rose-700">
        Learn more <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </article>
  )
}

export function Steps({ steps }: { steps: readonly { title: string; body: string }[] }) {
  return (
    <ol className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <span
        className="pointer-events-none absolute left-8 right-8 top-[2.6rem] hidden h-px bg-gradient-to-r from-rose-200 via-plum-200 to-sage-200 lg:block"
        aria-hidden="true"
      />
      {steps.map((s, i) => (
        <li key={s.title} className="card-soft reveal relative rounded-[1.75rem] p-6">
          <span
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-plum-700 to-plum-900 font-display text-lg text-cream-50 shadow-md shadow-plum-900/20 ring-4 ring-cream-50"
            aria-hidden="true"
          >
            {i + 1}
          </span>
          <h3 className="mt-5 text-lg text-plum-900">
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
    <section className={cn("py-16 sm:py-20", className)}>
      <Container>
        <div className="reveal relative isolate overflow-hidden rounded-[2.5rem] bg-plum-900 px-6 py-14 text-cream-50 sm:px-14 sm:py-16">
          <div className="pointer-events-none absolute -left-24 -top-24 -z-10 h-80 w-80 rounded-full bg-rose-500/25 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-32 right-10 -z-10 h-96 w-96 rounded-full bg-plum-500/30 blur-3xl" aria-hidden="true" />
          <div
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
            style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #fdfaf5 1px, transparent 0)", backgroundSize: "22px 22px" }}
            aria-hidden="true"
          />
          <Sprig className="pointer-events-none absolute -bottom-8 right-4 h-80 opacity-50 sm:right-16" animate />
          <div className="relative max-w-xl">
            <h2 className="text-3xl text-white sm:text-[2.6rem] sm:leading-tight">{title}</h2>
            {children && <div className="mt-4 text-lg leading-relaxed text-plum-100">{children}</div>}
            <div className="mt-9 flex flex-wrap gap-3">{actions}</div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export function ResourceIcon({ className }: { className?: string }) {
  return <BookOpen className={className} aria-hidden="true" />
}
