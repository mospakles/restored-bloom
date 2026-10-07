import Link from "next/link"
import { ArrowRight, BookOpen, Building2, Church, House, LifeBuoy, School, ShieldCheck, Sprout, Users } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Container, SectionHeading } from "@/components/ui/misc"
import { BloomGarden, BloomMark, Gathering } from "@/components/site/botanical"
import { CtaBand, ProgrammeCard, Steps } from "@/components/site/blocks"
import { FounderProfile } from "@/components/site/founder"
import { NewsletterForm } from "@/components/forms/public-forms"
import { OUTREACH_STEPS, PROGRAMMES, SITE } from "@/lib/content"
import { createFormToken } from "@/lib/security"
import { getSettings } from "@/server/settings"
import { isNewsletterAvailable } from "@/server/newsletter"

const HOSTS = [
  { icon: School, label: "Schools" },
  { icon: Church, label: "Faith communities" },
  { icon: Users, label: "Youth groups" },
  { icon: Building2, label: "Workplaces" },
  { icon: House, label: "Families" },
]

function HeroNote({
  icon: Icon,
  title,
  body,
  className,
  delay = "0s",
}: {
  icon: typeof ShieldCheck
  title: string
  body: string
  className?: string
  delay?: string
}) {
  return (
    <div
      className={`absolute hidden items-center gap-3 rounded-2xl border border-white/80 bg-white/85 px-4 py-3 shadow-[var(--shadow-lift)] backdrop-blur sm:flex motion-safe:animate-float ${className ?? ""}`}
      style={{ animationDelay: delay }}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-100 to-sage-100 text-plum-800">
        <Icon className="h-[1.15rem] w-[1.15rem]" aria-hidden="true" />
      </span>
      <span className="leading-tight">
        <span className="block text-sm font-semibold text-plum-900">{title}</span>
        <span className="block text-xs text-plum-600">{body}</span>
      </span>
    </div>
  )
}

export default async function HomePage() {
  const [settings, newsletter] = await Promise.all([getSettings(), isNewsletterAvailable()])

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden">
        <div
          className="absolute inset-0 -z-20"
          style={{
            background:
              "radial-gradient(60% 70% at 0% 0%, var(--color-rose-100) 0%, transparent 60%), radial-gradient(55% 60% at 100% 30%, var(--color-sage-100) 0%, transparent 65%), radial-gradient(40% 40% at 70% 100%, #fbefe4 0%, transparent 70%), linear-gradient(to bottom, var(--color-cream-100), var(--color-cream-50))",
          }}
          aria-hidden="true"
        />
        {/* faint concentric rings */}
        <svg
          className="pointer-events-none absolute -right-48 top-1/2 -z-10 hidden h-[60rem] w-[60rem] -translate-y-1/2 lg:block"
          viewBox="0 0 600 600"
          aria-hidden="true"
          focusable="false"
        >
          {[120, 180, 240, 300].map((r) => (
            <circle key={r} cx="300" cy="300" r={r} fill="none" stroke="var(--color-rose-200)" strokeOpacity={0.55 - r / 900} />
          ))}
        </svg>

        <Container className="grid items-center gap-14 pb-16 pt-12 sm:pt-16 lg:grid-cols-[1.25fr_1fr] lg:gap-10 lg:pb-24 lg:pt-20">
          <div className="motion-safe:animate-bloom-in">
            <p className="inline-flex items-center gap-2 rounded-full border border-rose-200/80 bg-white/70 py-1.5 pl-2 pr-4 text-sm font-medium text-rose-800 shadow-sm backdrop-blur">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-50">
                <BloomMark className="h-4 w-4 text-rose-500" />
              </span>
              A foundation based in Lagos, Nigeria
            </p>

            <h1 className="mt-7 text-[2.7rem] leading-[1.04] tracking-[-0.02em] text-plum-900 sm:text-6xl lg:text-[3.6rem] xl:text-[4.15rem] lg:[&>span]:whitespace-nowrap">
              <span className="block">Creating safe spaces.</span>
              <span className="relative inline-block italic text-rose-700">
                Restoring hope.
                <svg
                  className="absolute -bottom-2 left-0 h-3 w-full text-rose-300 sm:-bottom-3 sm:h-4"
                  viewBox="0 0 300 16"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M3 11 C 60 4, 120 3, 180 7 S 270 12, 297 5" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
              <span className="mt-1 block">
                Helping lives <span className="text-sage-700">bloom.</span>
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-plum-700 sm:text-[1.2rem]">
              We raise awareness of sexual abuse, teach age-appropriate body safety, and stand for the dignity of
              survivors — and we&apos;re ready to come wherever help is needed.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/invite-us#enquire" className={buttonVariants({ size: "lg", className: "group shadow-lg shadow-plum-900/15" })}>
                Invite us
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link href="/get-involved#partner" className={buttonVariants({ size: "lg", variant: "outline", className: "bg-white/60 backdrop-blur" })}>
                Partner with us
              </Link>
              <Link
                href="/get-involved"
                className="group inline-flex items-center justify-center gap-1.5 px-4 py-3 font-semibold text-plum-800 underline-offset-[6px] hover:underline"
              >
                Get involved
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* illustration */}
          <div className="relative mx-auto w-full max-w-[24rem] sm:max-w-[27rem] lg:mr-0">
            <div className="absolute -inset-5 -z-10 rounded-full bg-gradient-to-br from-rose-200/50 via-transparent to-sage-200/60 blur-2xl" aria-hidden="true" />
            <div className="arch relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-[#f9e6e3] via-[#fbf3ea] to-sage-100 shadow-[var(--shadow-lift)] ring-1 ring-white/70">
              <div className="arch pointer-events-none absolute inset-3 z-10 border border-white/80" aria-hidden="true" />
              <BloomGarden className="absolute inset-0 h-full w-full" />
            </div>
            <HeroNote
              icon={Sprout}
              title="Age-appropriate"
              body="Gentle, non-graphic learning"
              className="-right-6 top-16 xl:-right-10"
            />
            <HeroNote
              icon={ShieldCheck}
              title="Safeguarding first"
              body="Every session planned with you"
              className="-left-8 bottom-20 xl:-left-14"
              delay="-3.5s"
            />
          </div>
        </Container>

        {/* who can invite us */}
        <div className="border-y border-cream-300/80 bg-white/55 backdrop-blur">
          <Container className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:gap-8">
            <p className="shrink-0 text-xs font-bold uppercase tracking-[0.18em] text-plum-600">Invite us to your</p>
            <ul className="flex flex-wrap items-center gap-x-7 gap-y-3">
              {HOSTS.map(({ icon: Icon, label }) => (
                <li key={label} className="inline-flex items-center gap-2 text-[0.95rem] font-medium text-plum-800">
                  <Icon className="h-[1.1rem] w-[1.1rem] text-rose-600" aria-hidden="true" />
                  {label}
                </li>
              ))}
              <li>
                <Link href="/invite-us" className="text-[0.95rem] font-semibold text-rose-700 underline-offset-4 hover:underline">
                  and more →
                </Link>
              </li>
            </ul>
          </Container>
        </div>
      </section>

      {/* ── Who we are ───────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div className="reveal">
            <SectionHeading eyebrow="Who we are" title="Prevention starts with the adults around every child">
              <p>
                Founded by {SITE.founder}, Restored Bloom is a new foundation. We&apos;re building our first programmes
                and partnerships with schools, faith communities, organisations and qualified professionals — so that
                children and young people can learn, gently, about personal boundaries, trusted adults and how to seek
                help.
              </p>
            </SectionHeading>
            <ul className="mt-9 space-y-4">
              {[
                "Age-appropriate, non-graphic sessions designed with each host",
                "Clear safeguarding arrangements for every visit",
                "Honest about what we do — and what we don't",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-plum-800">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sage-100">
                    <ShieldCheck className="h-3.5 w-3.5 text-sage-700" aria-hidden="true" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <Link href="/about" className="group mt-10 inline-flex items-center gap-1.5 font-semibold text-rose-700">
              Read our story
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
          <div className="reveal relative">
            <div className="absolute -right-4 -top-4 h-full w-full rounded-[2.5rem] border border-rose-200/70" aria-hidden="true" />
            <figure className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-cream-100 via-[#faf1ea] to-rose-50 p-8 sm:p-12">
              <Gathering className="w-full" />
              <figcaption className="mt-6 border-t border-cream-300 pt-6">
                <p className="font-display text-xl italic leading-snug text-plum-800 sm:text-2xl">
                  &ldquo;Keeping children safe is always the responsibility of adults.&rdquo;
                </p>
                <p className="mt-2 text-sm text-plum-600">The principle behind every Restored Bloom session</p>
              </figcaption>
            </figure>
          </div>
        </Container>
      </section>

      {/* ── Programmes ───────────────────────────────────────────────────── */}
      <section className="px-3 sm:px-5">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-cream-100 to-[#f5ede2] py-20 sm:rounded-[3rem] sm:py-24">
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-rose-100/70 blur-3xl" aria-hidden="true" />
          <Container className="relative">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <SectionHeading eyebrow="Our programmes" title="Awareness that grows with every age">
                <p>Each programme shows its current status, so you always know what is running and what is planned.</p>
              </SectionHeading>
              <Link href="/programmes" className={buttonVariants({ variant: "outline", className: "shrink-0 bg-white/60" })}>
                All programmes
              </Link>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {PROGRAMMES.map((p, i) => (
                <ProgrammeCard key={p.id} programme={p} index={i} status={settings.programmeStatus[p.id] ?? "planned"} />
              ))}
            </div>
          </Container>
        </div>
      </section>

      {/* ── How an invitation works ──────────────────────────────────────── */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Invite us" title="Wherever help is needed" className="reveal">
            <p>
              Schools, churches, mosques, youth groups, community associations, organisations and workplaces can all
              invite us. Every visit is planned together with you, with safeguarding agreed in advance.
            </p>
          </SectionHeading>
          <div className="mt-12">
            <Steps steps={OUTREACH_STEPS} />
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link href="/invite-us#enquire" className={buttonVariants()}>
              Invite us
            </Link>
            <Link href="/invite-us" className={buttonVariants({ variant: "ghost" })}>
              Where we can help and how it works
            </Link>
          </div>
        </Container>
      </section>

      {/* ── Founder ──────────────────────────────────────────────────────── */}
      <section className="pb-8">
        <Container className="reveal">
          <FounderProfile settings={settings} />
        </Container>
      </section>

      {/* ── Resources & support ──────────────────────────────────────────── */}
      <section className="py-20">
        <Container className="grid gap-5 md:grid-cols-2">
          <Link
            href="/resources"
            className="card-soft card-hover reveal group relative overflow-hidden rounded-[2.25rem] p-8 sm:p-10"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-rose-100/70 blur-2xl" aria-hidden="true" />
            <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 ring-4 ring-rose-100/60">
              <BookOpen className="h-6 w-6 text-rose-700" aria-hidden="true" />
            </span>
            <h2 className="relative mt-6 text-[1.75rem] text-plum-900">Resources</h2>
            <p className="relative mt-2 leading-relaxed text-plum-700">
              Reviewed, age-appropriate materials for children, teenagers, parents, educators and survivors.
            </p>
            <span className="relative mt-6 inline-flex items-center gap-1.5 font-semibold text-rose-700">
              Browse resources
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>
          <Link
            href="/support"
            className="card-hover reveal group relative overflow-hidden rounded-[2.25rem] border border-sage-200 bg-gradient-to-br from-sage-50 to-[#eef3e8] p-8 shadow-[var(--shadow-soft)] transition-all duration-300 sm:p-10"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-sage-100 blur-2xl" aria-hidden="true" />
            <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white/80 ring-4 ring-sage-100">
              <LifeBuoy className="h-6 w-6 text-sage-700" aria-hidden="true" />
            </span>
            <h2 className="relative mt-6 text-[1.75rem] text-plum-900">Finding support</h2>
            <p className="relative mt-2 leading-relaxed text-plum-700">
              Gentle guidance on seeking help, for young people, survivors and the adults who support them.
            </p>
            <span className="relative mt-6 inline-flex items-center gap-1.5 font-semibold text-sage-800">
              Seek support
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>
        </Container>
      </section>

      <CtaBand
        className="pt-0"
        title="Help more children grow up safe"
        actions={
          <>
            <Link href="/get-involved#partner" className={buttonVariants({ variant: "light" })}>
              Partner with us
            </Link>
            <Link href="/get-involved#volunteer" className={buttonVariants({ variant: "outline-light" })}>
              Volunteer
            </Link>
            <Link href="/support-our-work" className={buttonVariants({ variant: "outline-light" })}>
              Sponsor our work
            </Link>
          </>
        }
      >
        <p>Hosts, professionals, volunteers and sponsors all have a part to play.</p>
      </CtaBand>

      {newsletter && (
        <section className="pb-8">
          <Container>
            <div className="card-soft reveal grid gap-8 rounded-[2.25rem] p-6 sm:p-10 md:grid-cols-2 md:items-center">
              <div>
                <h2 className="text-3xl text-plum-900">Stay in touch</h2>
                <p className="mt-3 leading-relaxed text-plum-700">
                  Occasional updates about our programmes, events and new resources. We&apos;ll ask you to confirm by
                  email, and you can unsubscribe at any time.
                </p>
              </div>
              <NewsletterForm token={createFormToken()} />
            </div>
          </Container>
        </section>
      )}
    </>
  )
}
