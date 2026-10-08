import type { Metadata } from "next"
import Link from "next/link"
import { connection } from "next/server"
import { HandHeart, Handshake, Sparkles } from "lucide-react"
import { Container, Notice, SectionHeading } from "@/components/ui/misc"
import { PageHero } from "@/components/site/blocks"
import { PartnerForm, VolunteerForm } from "@/components/forms/public-forms"
import { createFormToken } from "@/lib/security"

export const metadata: Metadata = {
  title: "Get involved",
  description: "Volunteer, partner or sponsor Restored Bloom's abuse-prevention and awareness work in Lagos.",
}

export default async function GetInvolvedPage() {
  await connection()
  return (
    <>
      <PageHero accent="lagoon" art="together" eyebrow="Get involved" title="There's a place for you in this work">
        <p>Whether you can offer time, professional expertise or support, we&apos;d love to hear from you.</p>
      </PageHero>

      <Container className="py-12">
        <nav aria-label="Ways to get involved" className="grid gap-4 sm:grid-cols-3">
          {[
            { href: "#volunteer", icon: HandHeart, title: "Volunteer", body: "Offer your time and skills." },
            { href: "#partner", icon: Handshake, title: "Partner", body: "Collaborate as an organisation." },
            { href: "/support-our-work", icon: Sparkles, title: "Sponsor", body: "Help fund outreach and materials." },
          ].map(({ href, icon: Icon, title, body }) => (
            <Link
              key={title}
              href={href}
              className="flex items-start gap-4 rounded-3xl card-soft p-5 transition-shadow hover:shadow-md"
            >
              <Icon className="mt-1 h-6 w-6 shrink-0 text-lagoon-700" aria-hidden="true" />
              <span>
                <span className="block font-display text-xl text-plum-900">{title}</span>
                <span className="text-plum-700">{body}</span>
              </span>
            </Link>
          ))}
        </nav>
      </Container>

      <section id="volunteer" className="scroll-mt-20 py-12">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeading eyebrow="Volunteer" title="Offer your time and skills">
              <p>
                We welcome help with events, communications, design, administration and fundraising, as well as
                professional expertise from educators, counsellors, health and legal professionals.
              </p>
            </SectionHeading>
            <Notice tone="warning" title="Screening comes first" className="mt-8">
              Submitting a volunteer enquiry does not authorise anyone to work with children or to represent Restored
              Bloom. Any role involving children requires screening, references and approval as separate steps, which
              we&apos;ll explain if the role is suitable.
            </Notice>
          </div>
          <div className="rounded-[2rem] card-soft p-5 sm:p-8">
            <VolunteerForm token={createFormToken()} />
          </div>
        </Container>
      </section>

      <section id="partner" className="scroll-mt-20 border-t border-cream-300 py-12 sm:py-16">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeading eyebrow="Partner" title="Collaborate with us">
              <p>
                We&apos;re keen to work with schools, faith communities, qualified professionals, support organisations and community
                groups, especially organisations that can offer professional support or referral pathways for
                survivors.
              </p>
            </SectionHeading>
            <p className="mt-6 leading-relaxed text-plum-700">
              Partnerships are agreed formally. We will only name an organisation as a partner on this website once
              both sides have confirmed it.
            </p>
          </div>
          <div className="rounded-[2rem] card-soft p-5 sm:p-8">
            <PartnerForm token={createFormToken()} />
          </div>
        </Container>
      </section>
    </>
  )
}
