import Link from "next/link"
import { ArrowRight, BookOpen, Building2, Church, House, LifeBuoy, School, ShieldCheck, Users } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Container, SectionHeading } from "@/components/ui/misc"
import { BloomMark, Gathering, HeroBloom } from "@/components/site/botanical"
import { CtaBand, HeroBackdrop, HeroCurve, ProgrammeCard, Steps } from "@/components/site/blocks"
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

export default async function HomePage() {
  const [settings, newsletter] = await Promise.all([getSettings(), isNewsletterAvailable()])

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      {/* Slides up beneath the (transparent) header so the plum runs to the top of the screen. */}
      <section className="relative isolate -mt-18 overflow-hidden bg-plum-950 text-cream-50">
        <HeroBackdrop accent="warm" />

        <Container className="grid items-center gap-6 pb-6 pt-32 sm:pt-36 lg:min-h-[52rem] lg:grid-cols-[1.1fr_1fr] lg:gap-4 lg:pb-44 lg:pt-28">
          <div className="stagger relative z-10">
            <p className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-gold-200">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold-300" aria-hidden="true" />
              A foundation · Lagos, Nigeria
            </p>

            <h1 className="mt-7 text-[3.2rem] leading-[1.0] tracking-[-0.012em] text-cream-50 sm:text-7xl xl:text-[5.8rem]">
              Every child deserves to{" "}
              <span className="bg-gradient-to-r from-gold-200 via-gold-300 to-[#e08a5a] bg-clip-text pr-2 italic text-transparent">
                bloom
              </span>{" "}
              safely.
            </h1>

            <p className="mt-7 font-display text-xl italic text-lagoon-200 sm:text-2xl">
              Creating safe spaces. Restoring hope. Helping lives bloom.
            </p>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream-100/80">
              Sexual abuse awareness, prevention education and dignity for survivors, brought to schools, faith
              communities, workplaces and families, wherever help is needed.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/invite-us#enquire"
                className={buttonVariants({ size: "lg", variant: "light", className: "group shadow-xl shadow-black/25" })}
              >
                Invite us
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link href="/get-involved#partner" className={buttonVariants({ size: "lg", variant: "outline-light" })}>
                Partner with us
              </Link>
              <Link
                href="/get-involved"
                className="group inline-flex items-center justify-center gap-1.5 px-4 py-3 font-semibold text-cream-100 underline-offset-[6px] hover:underline"
              >
                Get involved
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="relative -mx-10 sm:mx-0 lg:-mr-24">
            <HeroBloom palette="warm" className="mx-auto w-full max-w-[34rem] motion-safe:animate-[bloom-in_1.4s_ease-out_both] lg:max-w-none" />
          </div>
        </Container>

        {/* who can invite us */}
        <div className="relative z-10 pb-24 sm:pb-28 lg:absolute lg:inset-x-0 lg:bottom-24 lg:pb-0">
          <Container>
            <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.06] px-6 py-5 backdrop-blur-md sm:flex-row sm:items-center sm:gap-8">
              <p className="shrink-0 text-xs font-bold uppercase tracking-[0.2em] text-gold-200">Invite us to your</p>
              <ul className="flex flex-wrap items-center gap-x-7 gap-y-3">
                {HOSTS.map(({ icon: Icon, label }) => (
                  <li key={label} className="inline-flex items-center gap-2 text-[0.95rem] font-medium text-cream-100">
                    <Icon className="h-[1.1rem] w-[1.1rem] text-gold-300" aria-hidden="true" />
                    {label}
                  </li>
                ))}
                <li>
                  <Link href="/invite-us" className="text-[0.95rem] font-semibold text-gold-200 underline-offset-4 hover:text-white hover:underline">
                    and more →
                  </Link>
                </li>
              </ul>
            </div>
          </Container>
        </div>

        <HeroCurve />
      </section>

      {/* ── Values band: slow, calm movement ─────────────────────────────── */}
      <section aria-label="What we stand for" className="relative overflow-hidden py-10 sm:py-14">
        <div className="flex w-max motion-safe:animate-marquee hover:[animation-play-state:paused]" aria-hidden="true">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 items-center">
              {["Safe spaces", "Prevention", "Hope", "Dignity", "Healing", "Courage", "Trusted adults", "Every child"].map((w, i) => (
                <li key={w} className="flex items-center">
                  <span
                    className={
                      i % 2 === 0
                        ? "px-8 font-display text-5xl italic text-plum-900 sm:text-7xl"
                        : "px-8 font-display text-5xl text-transparent [-webkit-text-stroke:1.5px_var(--color-lagoon-500)] sm:text-7xl"
                    }
                  >
                    {w}
                  </span>
                  <BloomMark className="h-7 w-7 shrink-0 text-gold-300 sm:h-9 sm:w-9" />
                </li>
              ))}
            </ul>
          ))}
        </div>
        <p className="sr-only">Safe spaces, prevention, hope, dignity, healing, courage, trusted adults for every child.</p>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-cream-50 to-transparent" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-cream-50 to-transparent" aria-hidden="true" />
      </section>

      {/* ── Who we are ───────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div>
            <SectionHeading eyebrow="Who we are" title="Prevention starts with the adults around every child">
              <p>
                Founded by {SITE.founder}, Restored Bloom is a new foundation. We&apos;re building our first programmes
                and partnerships with schools, faith communities, organisations and qualified professionals, so that
                children and young people can learn, gently, about personal boundaries, trusted adults and how to seek
                help.
              </p>
            </SectionHeading>
            <ul className="mt-9 space-y-4">
              {[
                "Age-appropriate, non-graphic sessions designed with each host",
                "Clear safeguarding arrangements for every visit",
                "Honest about what we do and what we don't",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-plum-800">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sage-100">
                    <ShieldCheck className="h-3.5 w-3.5 text-sage-700" aria-hidden="true" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <Link href="/about" className="group mt-10 inline-flex items-center gap-1.5 font-semibold text-lagoon-700">
              Read our story
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
          <div className="reveal relative">
            <div className="absolute -right-4 -top-4 h-full w-full rounded-[2.5rem] border border-lagoon-200/80" aria-hidden="true" />
            <figure className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-cream-100 via-gold-50 to-lagoon-50 p-8 sm:p-12">
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
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gold-100/80 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-lagoon-100/70 blur-3xl" aria-hidden="true" />
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
            className="card-soft card-hover group relative overflow-hidden rounded-[2.25rem] p-8 sm:p-10"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold-100 blur-2xl" aria-hidden="true" />
            <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-50 ring-4 ring-gold-100">
              <BookOpen className="icon-nudge h-6 w-6 text-gold-700" aria-hidden="true" />
            </span>
            <h2 className="relative mt-6 text-[1.75rem] text-plum-900">Resources</h2>
            <p className="relative mt-2 leading-relaxed text-plum-700">
              Reviewed, age-appropriate materials for children, teenagers, parents, educators and survivors.
            </p>
            <span className="relative mt-6 inline-flex items-center gap-1.5 font-semibold text-lagoon-700">
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
              <LifeBuoy className="icon-nudge h-6 w-6 text-sage-700" aria-hidden="true" />
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
