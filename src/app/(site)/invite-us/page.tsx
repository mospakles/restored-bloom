import type { Metadata } from "next"
import { connection } from "next/server"
import { CalendarCheck, ClipboardList, MapPin, ShieldCheck, Sparkles, Users } from "lucide-react"
import { Container, SectionHeading } from "@/components/ui/misc"
import { BloomMark } from "@/components/site/botanical"
import { PageHero, Steps } from "@/components/site/blocks"
import { OutreachRequestForm } from "@/components/forms/public-forms"
import { OUTREACH_STEPS, WHERE_WE_HELP } from "@/lib/content"
import { createFormToken } from "@/lib/security"

export const metadata: Metadata = {
  title: "Invite us",
  description:
    "Invite Restored Bloom to deliver sexual abuse awareness and prevention sessions at your school, church, mosque, community, youth group, organisation or workplace.",
}

const FORMAT = [
  {
    icon: Sparkles,
    title: "What we offer",
    body: "Age-appropriate awareness sessions for children and young people, sensitisation for parents and caregivers, briefings for staff and leaders, and community talks — shaped around your audience.",
  },
  {
    icon: Users,
    title: "Who it's for",
    body: "Children, teenagers, young adults, parents, teachers, youth workers, faith leaders, staff and whole communities.",
  },
  {
    icon: ClipboardList,
    title: "What we ask of hosts",
    body: "A named contact person, a suitable space, agreement on the content in advance, and — whenever children take part — responsible adults from your organisation present throughout and parents informed.",
  },
  {
    icon: ShieldCheck,
    title: "Safeguarding arrangements",
    body: "Non-graphic, age-appropriate materials shared beforehand. Any concern or disclosure is passed straight to your designated safeguarding lead or the appropriate authorities. We never photograph or film children.",
  },
]

export default async function InviteUsPage() {
  await connection()
  return (
    <>
      <PageHero eyebrow="Invite us" title="Wherever help is needed, we're ready to come">
        <p>
          Restored Bloom brings sexual abuse awareness and prevention education to schools, faith communities, youth
          groups, organisations, workplaces and families. Tell us where you are and who you&apos;d like us to reach.
        </p>
      </PageHero>

      <section className="py-16">
        <Container>
          <SectionHeading eyebrow="Where we can help" title="Invite us to your…" />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WHERE_WE_HELP.map((w) => (
              <li key={w.title} className="flex gap-4 rounded-3xl border border-cream-300 bg-white p-6">
                <BloomMark className="h-7 w-7 shrink-0 text-rose-400" />
                <div>
                  <h3 className="text-xl text-plum-900">{w.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-plum-700">{w.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-8 flex items-start gap-2 text-plum-700">
            <MapPin className="mt-1 h-4 w-4 shrink-0 text-rose-700" aria-hidden="true" />
            We&apos;re based in Lagos. If you&apos;re further afield, still get in touch — we&apos;ll talk about how we can
            help, including online sessions.
          </p>
        </Container>
      </section>

      <section className="border-y border-cream-300 bg-cream-100/60 py-16">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2">
            {FORMAT.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-3xl border border-cream-300 bg-white p-6 sm:p-8">
                <Icon className="h-7 w-7 text-rose-700" aria-hidden="true" />
                <h2 className="mt-4 text-2xl text-plum-900">{title}</h2>
                <p className="mt-2 leading-relaxed text-plum-800">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeading eyebrow="How it works" title="From invitation to session" />
          <div className="mt-10">
            <Steps steps={OUTREACH_STEPS} />
          </div>
        </Container>
      </section>

      <section id="enquire" className="scroll-mt-20 border-t border-cream-300 py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeading eyebrow="Invitation" title="Invite Restored Bloom">
              <p>
                Tell us a little about your organisation or group and what you have in mind. Sending this doesn&apos;t
                commit you to anything — it starts a conversation.
              </p>
            </SectionHeading>
            <div className="mt-8 flex items-start gap-3 rounded-2xl bg-sage-50 p-5 text-sage-800">
              <CalendarCheck className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              <p className="text-sm leading-relaxed">
                Sessions are confirmed only after a planning conversation with you, and depend on our availability.
              </p>
            </div>
          </div>
          <div className="rounded-[2rem] border border-cream-300 bg-white p-5 sm:p-8">
            <OutreachRequestForm token={createFormToken()} />
          </div>
        </Container>
      </section>
    </>
  )
}
