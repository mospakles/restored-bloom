import type { Metadata } from "next"
import Link from "next/link"
import { connection } from "next/server"
import { ShieldCheck, Handshake } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Container, SectionHeading } from "@/components/ui/misc"
import { PageHero } from "@/components/site/blocks"
import { FounderProfile } from "@/components/site/founder"
import { BloomMark } from "@/components/site/botanical"
import { SITE, VALUES } from "@/lib/content"
import { getSettings } from "@/server/settings"

export const metadata: Metadata = {
  title: "About us",
  description: `The story, mission, vision and values of ${SITE.name}, founded by ${SITE.founder} in Lagos, Nigeria.`,
}

export default async function AboutPage() {
  await connection()
  const settings = await getSettings()
  return (
    <>
      <PageHero accent="dusk" art="roots" eyebrow="About Restored Bloom" title="Every child deserves to grow up safe, informed and heard">
        <p>
          Restored Bloom is a foundation based in {SITE.city}, focused on sexual abuse awareness, prevention
          education and survivor support, and ready to help wherever it&apos;s needed.
        </p>
      </PageHero>

      <section className="py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <SectionHeading eyebrow="Our story" title="Why Restored Bloom exists" />
          <div className="space-y-5 text-lg leading-relaxed text-plum-800">
            <p>
              Sexual abuse is too often surrounded by silence: silence that leaves children without the words to
              describe what is happening to them, adults without the confidence to respond, and survivors without the
              support and dignity they deserve.
            </p>
            <p>
              Restored Bloom was founded by {SITE.founder} to help break that silence, gently and responsibly. We want
              children to understand that their bodies belong to them, to know which adults they can trust, and to
              feel confident that telling someone is always the right thing to do.
            </p>
            <p>
              We are at the beginning of this work. We are developing our programmes carefully, with input from
              educators and qualified professionals, and we will only describe as running what is genuinely running.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-y border-cream-300 bg-cream-100/60 py-16 sm:py-20">
        <Container className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[2rem] bg-white p-8 sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-lagoon-700">Mission</p>
            <p className="mt-4 font-display text-2xl leading-snug text-plum-900">
              To equip children, young people and the adults around them with age-appropriate knowledge that helps
              prevent sexual abuse, and to promote healing, dignity and hope for survivors.
            </p>
          </div>
          <div className="rounded-[2rem] bg-plum-900 p-8 text-cream-50 sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-rose-200">Vision</p>
            <p className="mt-4 font-display text-2xl leading-snug">
              Communities where every child is protected, every voice is heard, and every survivor can bloom again.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Our values" title="What guides our work" />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {VALUES.map((v) => (
              <li key={v.title} className="rounded-3xl card-soft p-6">
                <BloomMark className="h-7 w-7 text-gold-400" />
                <h3 className="mt-4 text-xl text-plum-900">{v.title}</h3>
                <p className="mt-2 leading-relaxed text-plum-700">{v.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-8">
        <Container>
          <FounderProfile settings={settings} headingLevel="h2" />
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[2rem] card-soft p-8">
            <ShieldCheck className="h-8 w-8 text-sage-700" aria-hidden="true" />
            <h2 className="mt-4 text-2xl text-plum-900">Our approach to safeguarding</h2>
            <div className="mt-3 space-y-3 leading-relaxed text-plum-800">
              <p>
                Keeping children safe is always the responsibility of adults. Our sessions never place that burden on
                children. Materials are age-appropriate and non-graphic, responsible adults from the hosting school or
                organisation are present whenever children take part, and any concern raised is passed to that
                organisation&apos;s designated safeguarding lead or the appropriate authorities.
              </p>
              <p>Anyone who works with children on our behalf must be screened and approved first.</p>
            </div>
            <Link href="/policies/safeguarding" className={buttonVariants({ variant: "link", className: "mt-4" })}>
              Read our safeguarding statement
            </Link>
          </div>
          <div className="rounded-[2rem] card-soft p-8">
            <Handshake className="h-8 w-8 text-lagoon-700" aria-hidden="true" />
            <h2 className="mt-4 text-2xl text-plum-900">Working together</h2>
            <div className="mt-3 space-y-3 leading-relaxed text-plum-800">
              <p>
                We collaborate with schools, faith communities, organisations, qualified professionals, support
                organisations, volunteers and sponsors.
                Restored Bloom is not a counselling, medical or emergency service, so we aim to work alongside the
                people and organisations who are.
              </p>
              <p>We only describe an organisation as a partner once a partnership has been formally agreed.</p>
            </div>
            <Link href="/get-involved#partner" className={buttonVariants({ variant: "link", className: "mt-4" })}>
              Explore partnership
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
