import Link from "next/link"
import { ArrowRight, BookOpen, HandHeart, Heart, Leaf, Sprout, Users } from "lucide-react"
import { Container, Badge } from "@/components/ui/misc"
import { Sprig, type BloomPalette } from "@/components/site/botanical"
import { HeroArt, type HeroArtName } from "@/components/site/hero-art"
import { PROGRAMME_STATUS_LABELS, type Programme, type ProgrammeStatus } from "@/lib/content"
import { cn } from "@/lib/utils"

export type Accent = BloomPalette

const ACCENT_GLOWS: Record<Accent, string> = {
  warm: "radial-gradient(55% 60% at 80% 40%, rgb(207 125 72 / 0.32) 0%, transparent 70%), radial-gradient(45% 50% at 8% 10%, rgb(124 81 117 / 0.5) 0%, transparent 70%), radial-gradient(35% 40% at 55% 105%, rgb(70 113 124 / 0.35) 0%, transparent 70%)",
  sage: "radial-gradient(55% 60% at 80% 40%, rgb(115 133 99 / 0.42) 0%, transparent 70%), radial-gradient(45% 50% at 8% 10%, rgb(124 81 117 / 0.45) 0%, transparent 70%), radial-gradient(35% 40% at 50% 105%, rgb(226 178 106 / 0.22) 0%, transparent 70%)",
  lagoon: "radial-gradient(55% 60% at 80% 40%, rgb(70 113 124 / 0.55) 0%, transparent 70%), radial-gradient(45% 50% at 8% 10%, rgb(124 81 117 / 0.4) 0%, transparent 70%), radial-gradient(35% 40% at 50% 105%, rgb(226 178 106 / 0.2) 0%, transparent 70%)",
  dusk: "radial-gradient(55% 60% at 80% 40%, rgb(90 105 132 / 0.5) 0%, transparent 70%), radial-gradient(45% 50% at 8% 10%, rgb(70 113 124 / 0.4) 0%, transparent 70%), radial-gradient(35% 40% at 50% 105%, rgb(226 178 106 / 0.22) 0%, transparent 70%)",
}

/** Deep plum backdrop with accent glows and a fine dotted texture, shared by every hero. */
export function HeroBackdrop({ accent = "warm" }: { accent?: Accent }) {
  return (
    <>
      <div
        className="absolute inset-0 -z-20"
        style={{ background: `${ACCENT_GLOWS[accent]}, linear-gradient(160deg, #2b1329 0%, #220f20 55%, #1a0b18 100%)` }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 opacity-[0.08]"
        style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #fdfaf5 1px, transparent 0)", backgroundSize: "26px 26px" }}
        aria-hidden="true"
      />
    </>
  )
}

/** Soft curved edge at the bottom of a dark hero, flowing into the cream page. */
export function HeroCurve() {
  return (
    <svg className="absolute inset-x-0 -bottom-px h-12 w-full sm:h-16" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path d="M0 80 L0 40 C 360 0, 1080 0, 1440 40 L1440 80 Z" fill="var(--color-cream-50)" />
    </svg>
  )
}

export function PageHero({
  eyebrow,
  title,
  children,
  accent = "warm",
  art,
  underHeader = true,
}: {
  eyebrow?: string
  title: React.ReactNode
  children?: React.ReactNode
  accent?: Accent
  /** Page-specific illustration shown beside the title. */
  art?: HeroArtName
  /** Slide up beneath the transparent site header (false inside the dashboard previews). */
  underHeader?: boolean
}) {
  return (
    <section className={cn("relative isolate overflow-hidden bg-plum-950 text-cream-50", underHeader && "-mt-18")}>
      <HeroBackdrop accent={accent} />
      <Container
        className={cn(
          "relative grid items-center gap-2 pb-20 sm:pb-24 lg:grid-cols-[1.55fr_1fr] lg:gap-8",
          underHeader ? "pt-28 sm:pt-32" : "pt-14",
        )}
      >
        <div className="stagger relative z-10 max-w-2xl">
          {eyebrow && (
            <p className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-gold-200">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold-300" aria-hidden="true" />
              {eyebrow}
            </p>
          )}
          <h1 className="mt-5 text-[2.5rem] leading-[1.05] tracking-[-0.01em] text-cream-50 sm:text-[3.4rem] lg:text-[3.6rem]">{title}</h1>
          {children && (
            <div className="mt-6 text-lg leading-relaxed text-cream-100/80 sm:text-xl [&_a]:font-semibold [&_a]:text-gold-200 [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-white">
              {children}
            </div>
          )}
        </div>
        {art && (
          <div className="parallax-soft">
          <HeroArt
            name={art}
            className="pointer-events-none relative mx-auto mt-6 w-52 motion-safe:animate-[bloom-in_1.2s_ease-out_both] sm:w-64 lg:-my-6 lg:mt-0 lg:w-full lg:max-w-[23rem]"
          />
          </div>
        )}
      </Container>
      <HeroCurve />
    </section>
  )
}

const ICONS = { seedling: Sprout, leaf: Leaf, people: Users, community: HandHeart, heart: Heart } as const

export function ProgrammeStatusBadge({ status }: { status: ProgrammeStatus }) {
  const tone = status === "operating" ? "sage" : status === "piloting" ? "rose" : "cream"
  return <Badge tone={tone}>{PROGRAMME_STATUS_LABELS[status]}</Badge>
}

const TINTS = [
  "bg-gold-50 text-gold-700 ring-gold-100",
  "bg-lagoon-50 text-lagoon-700 ring-lagoon-100",
  "bg-sage-50 text-sage-700 ring-sage-100",
  "bg-plum-50 text-plum-700 ring-plum-100",
  "bg-rose-50 text-lagoon-700 ring-rose-100",
]

export function ProgrammeCard({ programme, status, index = 0 }: { programme: Programme; status: ProgrammeStatus; index?: number }) {
  const Icon = ICONS[programme.icon]
  return (
    <article className="card-soft card-hover group relative flex flex-col rounded-[1.75rem] p-7">
      <div className="flex items-start justify-between gap-3">
        <span className={cn("inline-flex h-12 w-12 items-center justify-center rounded-2xl ring-4", TINTS[index % TINTS.length])}>
          <Icon className="icon-nudge h-5 w-5" aria-hidden="true" />
        </span>
        <ProgrammeStatusBadge status={status} />
      </div>
      <h3 className="mt-6 text-[1.35rem] text-plum-900">
        <Link href={`/programmes#${programme.id}`} className="after:absolute after:inset-0 after:rounded-[1.75rem]">
          {programme.title}
        </Link>
      </h3>
      <p className="mt-2.5 flex-1 leading-relaxed text-plum-700">{programme.short}</p>
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-lagoon-700">
        Learn more <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </article>
  )
}

export function Steps({ steps }: { steps: readonly { title: string; body: string }[] }) {
  return (
    <ol className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <span
        className="pointer-events-none absolute left-8 right-8 top-[2.6rem] hidden h-px bg-gradient-to-r from-gold-200 via-lagoon-200 to-sage-200 lg:block"
        aria-hidden="true"
      />
      {steps.map((s, i) => (
        <li key={s.title} className="card-soft relative rounded-[1.75rem] p-6">
          <span
            className="step-num relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-plum-700 to-plum-900 font-display text-lg text-cream-50 shadow-md shadow-plum-900/20 ring-4 ring-cream-50"
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
          <div className="pointer-events-none absolute -left-24 -top-24 -z-10 h-80 w-80 rounded-full bg-gold-400/20 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-32 right-10 -z-10 h-96 w-96 rounded-full bg-lagoon-500/30 blur-3xl" aria-hidden="true" />
          <div
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
            style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #fdfaf5 1px, transparent 0)", backgroundSize: "22px 22px" }}
            aria-hidden="true"
          />
          <Sprig className="pointer-events-none absolute -bottom-8 right-4 h-80 opacity-50 sm:right-16" animate />
          <FloatingPetals />
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

/** A few petals drifting lazily across a section. Decorative. */
export function FloatingPetals({ className }: { className?: string }) {
  const petals = [
    { left: "8%", top: "18%", c: "bg-gold-300", d: "0s", s: "h-4 w-2.5" },
    { left: "38%", top: "70%", c: "bg-lagoon-300", d: "-4s", s: "h-3 w-2" },
    { left: "62%", top: "22%", c: "bg-sage-300", d: "-8s", s: "h-5 w-3" },
    { left: "84%", top: "58%", c: "bg-gold-200", d: "-2s", s: "h-3.5 w-2" },
    { left: "24%", top: "40%", c: "bg-rose-200", d: "-6s", s: "h-3 w-2" },
  ]
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      {petals.map((p, i) => (
        <span
          key={i}
          className={cn("absolute rounded-full opacity-70 motion-safe:animate-drift", p.c, p.s)}
          style={{ left: p.left, top: p.top, animationDelay: p.d }}
        />
      ))}
    </div>
  )
}
