import type { Metadata } from "next"
import { connection } from "next/server"
import { BookOpen, CalendarHeart, MapPin, Presentation } from "lucide-react"
import { Container, Notice, SectionHeading } from "@/components/ui/misc"
import { PageHero } from "@/components/site/blocks"
import { SponsorForm } from "@/components/forms/public-forms"
import { createFormToken } from "@/lib/security"

export const metadata: Metadata = {
  title: "Support our work",
  description: "Sponsorship opportunities to fund Restored Bloom's outreach materials, sessions in schools and communities, and awareness events.",
}

const AREAS = [
  {
    icon: BookOpen,
    title: "Outreach materials",
    body: "Printing age-appropriate storybooks, worksheets, posters and take-home guides for parents.",
  },
  {
    icon: MapPin,
    title: "Outreach sessions",
    body: "Covering facilitator transport, materials and preparation so that schools, faith communities and community groups can host sessions — wherever the need is.",
  },
  {
    icon: Presentation,
    title: "Parent and educator sessions",
    body: "Venues, refreshments and resources for sensitisation workshops for parents, teachers, youth workers and faith leaders.",
  },
  {
    icon: CalendarHeart,
    title: "Community awareness",
    body: "Community events and campaigns that challenge stigma and point people towards help.",
  },
]

export default async function SupportOurWorkPage() {
  await connection()
  return (
    <>
      <PageHero eyebrow="Support our work" title="Help us reach more children, families and communities">
        <p>
          Sponsorship helps turn plans into sessions in classrooms, churches, mosques and communities — wherever help is needed. If you or your organisation would like to support
          Restored Bloom, we&apos;d be glad to talk.
        </p>
      </PageHero>

      <section className="py-16">
        <Container>
          <SectionHeading eyebrow="Where support could go" title="What sponsorship could fund">
            <p>Examples of how support could be used. We&apos;ll agree specifics with each sponsor.</p>
          </SectionHeading>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {AREAS.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-3xl border border-cream-300 bg-white p-6">
                <Icon className="h-7 w-7 text-rose-700" aria-hidden="true" />
                <h3 className="mt-4 text-xl text-plum-900">{title}</h3>
                <p className="mt-2 leading-relaxed text-plum-700">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="sponsor" className="scroll-mt-20 border-t border-cream-300 py-16">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeading eyebrow="Sponsorship enquiry" title="Start a conversation" />
            <Notice tone="info" title="About online donations" className="mt-8">
              We don&apos;t accept online payments through this website yet. Please send a sponsorship enquiry and
              we&apos;ll be in touch with ways to support us.
            </Notice>
          </div>
          <div className="rounded-[2rem] border border-cream-300 bg-white p-5 sm:p-8">
            <SponsorForm token={createFormToken()} />
          </div>
        </Container>
      </section>
    </>
  )
}
