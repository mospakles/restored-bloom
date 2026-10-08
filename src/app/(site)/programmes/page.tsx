import type { Metadata } from "next"
import Link from "next/link"
import { connection } from "next/server"
import { Check } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/ui/misc"
import { PageHero, ProgrammeStatusBadge } from "@/components/site/blocks"
import { PROGRAMMES } from "@/lib/content"
import { getSettings } from "@/server/settings"

export const metadata: Metadata = {
  title: "Our programmes",
  description:
    "Age-appropriate sexual abuse awareness and prevention programmes for children, young people, parents, educators, faith communities, organisations and communities.",
}

export default async function ProgrammesPage() {
  await connection()
  const { programmeStatus } = await getSettings()

  return (
    <>
      <PageHero accent="sage" art="growth" eyebrow="Our programmes" title="Gentle, age-appropriate awareness for every stage">
        <p>
          Our programmes help children and young people understand personal boundaries, recognise unsafe situations
          and seek help from trusted adults. They also equip parents and educators to protect them.
        </p>
      </PageHero>

      <Container className="py-12">
        <nav aria-label="Programmes on this page">
          <ul className="flex flex-wrap gap-2">
            {PROGRAMMES.map((p) => (
              <li key={p.id}>
                <a href={`#${p.id}`} className="inline-block rounded-full card-soft px-4 py-2 text-sm font-medium text-plum-800 hover:border-plum-300">
                  {p.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-12 space-y-8">
          {PROGRAMMES.map((p) => (
            <section
              key={p.id}
              id={p.id}
              aria-labelledby={`${p.id}-title`}
              className="scroll-mt-28 rounded-[2rem] card-soft p-6 sm:p-10"
            >
              <div className="flex flex-wrap items-center gap-3">
                <h2 id={`${p.id}-title`} className="text-3xl text-plum-900">
                  {p.title}
                </h2>
                <ProgrammeStatusBadge status={programmeStatus[p.id] ?? "planned"} />
              </div>
              <p className="mt-2 text-sm font-semibold text-lagoon-700">{p.audience}</p>
              <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
                <div>
                  <p className="text-lg leading-relaxed text-plum-800">{p.summary}</p>
                  <p className="mt-5 text-plum-700">
                    <span className="font-semibold text-plum-900">Format: </span>
                    {p.format}
                  </p>
                </div>
                <div className="rounded-3xl bg-cream-100 p-6">
                  <h3 className="font-sans text-sm font-bold uppercase tracking-[0.14em] text-plum-900">Topics include</h3>
                  <ul className="mt-4 space-y-2.5">
                    {p.topics.map((t) => (
                      <li key={t} className="flex gap-2.5 leading-snug text-plum-800">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-sage-600" aria-hidden="true" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link href="/invite-us#enquire" className={buttonVariants({ size: "lg" })}>
            Invite us
          </Link>
          <Link href="/get-involved#partner" className={buttonVariants({ size: "lg", variant: "outline" })}>
            Partner with us
          </Link>
        </div>
      </Container>
    </>
  )
}
