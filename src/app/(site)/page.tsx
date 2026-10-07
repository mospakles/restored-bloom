import Link from "next/link"
import { ArrowRight, BookOpen, LifeBuoy, ShieldCheck } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Container, Eyebrow, SectionHeading } from "@/components/ui/misc"
import { Gathering, Sprig } from "@/components/site/botanical"
import { CtaBand, ProgrammeCard, Steps } from "@/components/site/blocks"
import { FounderProfile } from "@/components/site/founder"
import { NewsletterForm } from "@/components/forms/public-forms"
import { OUTREACH_STEPS, PROGRAMMES, SITE } from "@/lib/content"
import { createFormToken } from "@/lib/security"
import { getSettings } from "@/server/settings"
import { isNewsletterAvailable } from "@/server/newsletter"

export default async function HomePage() {
  const [settings, newsletter] = await Promise.all([getSettings(), isNewsletterAvailable()])

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-cream-100 via-cream-50 to-cream-50">
        <div
          className="pointer-events-none absolute -left-32 top-24 h-80 w-80 rounded-full bg-rose-100/70 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-sage-100/80 blur-3xl"
          aria-hidden="true"
        />
        <Container className="relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.25fr_1fr]">
          <div className="motion-safe:animate-bloom-in">
            <Eyebrow>A foundation based in Lagos, Nigeria</Eyebrow>
            <h1 className="text-[2.6rem] leading-[1.06] text-plum-900 sm:text-6xl lg:text-[4.1rem]">
              Creating safe spaces.{" "}
              <span className="italic text-rose-700">Restoring hope.</span> Helping lives bloom.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-plum-700 sm:text-xl">
              Restored Bloom is a foundation ready to help wherever it&apos;s needed — in schools, faith communities,
              organisations, workplaces and families — raising awareness of sexual abuse, teaching age-appropriate body
              safety, and promoting dignity and hope for survivors.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/invite-us#enquire" className={buttonVariants({ size: "lg" })}>
                Invite us <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/get-involved#partner" className={buttonVariants({ size: "lg", variant: "outline" })}>
                Partner with us
              </Link>
              <Link href="/get-involved" className={buttonVariants({ size: "lg", variant: "ghost" })}>
                Get involved
              </Link>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md" aria-hidden="true">
            <div className="absolute inset-6 rounded-[45%_55%_50%_50%] bg-gradient-to-br from-rose-100 via-cream-100 to-sage-100" />
            <Sprig className="relative mx-auto h-[22rem] sm:h-[26rem]" animate />
          </div>
        </Container>
      </section>

      {/* Launch-stage introduction */}
      <section className="py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading eyebrow="Who we are" title="Prevention starts with the adults around every child">
              <p>
                Founded by {SITE.founder}, Restored Bloom is a new foundation. We are building our first programmes and
                partnerships with schools, faith communities, organisations and qualified professionals, so that children and young people
                can learn — in a gentle, age-appropriate way — about personal boundaries, trusted adults, and how to
                seek help.
              </p>
            </SectionHeading>
            <ul className="mt-8 space-y-3 text-plum-800">
              {[
                "Age-appropriate, non-graphic sessions designed with each host",
                "Clear safeguarding arrangements for every visit",
                "Honest about what we do — and what we don't",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-sage-600" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
            <Link href="/about" className="mt-8 inline-flex items-center gap-1 font-semibold text-rose-700 hover:underline">
              Read our story <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="rounded-[2rem] bg-cream-100 p-6 sm:p-10">
            <Gathering className="w-full" />
          </div>
        </Container>
      </section>

      {/* Programmes */}
      <section className="border-y border-cream-300 bg-cream-100/60 py-16 sm:py-20">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="Our programmes" title="Awareness that grows with every age">
              <p>Each programme is shown with its current status, so you always know what is running and what is planned.</p>
            </SectionHeading>
            <Link href="/programmes" className={buttonVariants({ variant: "outline" })}>
              All programmes
            </Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROGRAMMES.map((p) => (
              <ProgrammeCard key={p.id} programme={p} status={settings.programmeStatus[p.id] ?? "planned"} />
            ))}
          </div>
        </Container>
      </section>

      {/* How an invitation works */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Invite us" title="Wherever help is needed">
            <p>
              Schools, churches, mosques, youth groups, community associations, organisations and workplaces can all invite
              us. Every visit is planned together with you, with safeguarding agreed in advance.
            </p>
          </SectionHeading>
          <div className="mt-10">
            <Steps steps={OUTREACH_STEPS} />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/invite-us#enquire" className={buttonVariants()}>
              Invite us
            </Link>
            <Link href="/invite-us" className={buttonVariants({ variant: "ghost" })}>
              Where we can help and how it works
            </Link>
          </div>
        </Container>
      </section>

      {/* Founder */}
      <section className="py-8 sm:py-12">
        <Container>
          <FounderProfile settings={settings} />
        </Container>
      </section>

      {/* Resources & support */}
      <section className="py-16 sm:py-20">
        <Container className="grid gap-5 md:grid-cols-2">
          <Link
            href="/resources"
            className="group rounded-[2rem] border border-cream-300 bg-white p-8 transition-shadow hover:shadow-md"
          >
            <BookOpen className="h-8 w-8 text-rose-700" aria-hidden="true" />
            <h2 className="mt-5 text-2xl text-plum-900">Resources</h2>
            <p className="mt-2 leading-relaxed text-plum-700">
              Reviewed, age-appropriate materials for children, teenagers, parents, educators and survivors.
            </p>
            <span className="mt-5 inline-flex items-center gap-1 font-semibold text-rose-700">
              Browse resources <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </Link>
          <Link
            href="/support"
            className="group rounded-[2rem] border border-sage-200 bg-sage-50 p-8 transition-shadow hover:shadow-md"
          >
            <LifeBuoy className="h-8 w-8 text-sage-700" aria-hidden="true" />
            <h2 className="mt-5 text-2xl text-plum-900">Finding support</h2>
            <p className="mt-2 leading-relaxed text-plum-700">
              Gentle guidance on seeking help, for young people, survivors and the adults who support them.
            </p>
            <span className="mt-5 inline-flex items-center gap-1 font-semibold text-sage-800">
              Seek support <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </Link>
        </Container>
      </section>

      <CtaBand
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
          <Container className="grid gap-8 rounded-[2rem] border border-cream-300 bg-white p-6 sm:p-10 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-3xl text-plum-900">Stay in touch</h2>
              <p className="mt-3 leading-relaxed text-plum-700">
                Occasional updates about our programmes, events and new resources. We&apos;ll ask you to confirm by email,
                and you can unsubscribe at any time.
              </p>
            </div>
            <NewsletterForm token={createFormToken()} />
          </Container>
        </section>
      )}
    </>
  )
}
