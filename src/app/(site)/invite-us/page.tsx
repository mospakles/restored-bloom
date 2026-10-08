import type { Metadata } from "next"
import { connection } from "next/server"
import Link from "next/link"
import {
  ArrowRight,
  Building2,
  CalendarCheck,
  Church,
  ClipboardList,
  House,
  Landmark,
  MapPin,
  School,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react"
import { Container, SectionHeading } from "@/components/ui/misc"
import { PageHero, Steps } from "@/components/site/blocks"
import { OutreachRequestForm } from "@/components/forms/public-forms"
import { OUTREACH_STEPS, WHERE_WE_HELP } from "@/lib/content"
import { createFormToken } from "@/lib/security"

export const metadata: Metadata = {
  title: "Invite us",
  description:
    "Invite Restored Bloom to deliver sexual abuse awareness and prevention sessions at your school, church, mosque, community, youth group, organisation or workplace.",
}

const HOST_ICONS = {
  school: School,
  faith: Church,
  community: Landmark,
  youth: Users,
  workplace: Building2,
  family: House,
} as const

const HOST_TINTS = [
  "bg-gold-50 text-gold-700 ring-gold-100",
  "bg-lagoon-50 text-lagoon-700 ring-lagoon-100",
  "bg-sage-50 text-sage-700 ring-sage-100",
  "bg-plum-50 text-plum-700 ring-plum-100",
  "bg-rose-50 text-rose-700 ring-rose-100",
  "bg-gold-50 text-gold-700 ring-gold-100",
]

const FORMAT = [
  {
    icon: Sparkles,
    title: "What we offer",
    body: "Age-appropriate awareness sessions for children and young people, sensitisation for parents and caregivers, briefings for staff and leaders, and community talks, all shaped around your audience.",
  },
  {
    icon: Users,
    title: "Who it's for",
    body: "Children, teenagers, young adults, parents, teachers, youth workers, faith leaders, staff and whole communities.",
  },
  {
    icon: ClipboardList,
    title: "What we ask of hosts",
    body: "A named contact person, a suitable space, agreement on the content in advance. Whenever children take part, we also ask for responsible adults from your organisation to be present throughout and for parents to be informed.",
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
      <PageHero accent="warm" art="path" eyebrow="Invite us" title="Wherever help is needed, we're ready to come">
        <p>
          Restored Bloom brings sexual abuse awareness and prevention education to schools, faith communities, youth
          groups, organisations, workplaces and families. Tell us where you are and who you&apos;d like us to reach.
        </p>
      </PageHero>

      <section className="py-16">
        <Container>
          <SectionHeading eyebrow="Where we can help" title="Invite us to your…" />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WHERE_WE_HELP.map((w, i) => {
              const Icon = HOST_ICONS[w.icon]
              return (
                <li key={w.title}>
                  <article className="card-soft card-hover group flex h-full flex-col rounded-[1.75rem] p-7">
                    <span
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ring-4 ${HOST_TINTS[i % HOST_TINTS.length]}`}
                    >
                      <Icon className="icon-nudge h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-6 text-[1.3rem] leading-snug text-plum-900">{w.title}</h3>
                    <p className="mt-2 leading-relaxed text-plum-700">{w.body}</p>
                  </article>
                </li>
              )
            })}
          </ul>
          <div className="mt-8 flex flex-col gap-4 rounded-[1.75rem] border border-lagoon-100 bg-lagoon-50/70 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-start gap-3 text-plum-800">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-lagoon-700" aria-hidden="true" />
              <span>
                We&apos;re based in Lagos. Further afield? Get in touch and we&apos;ll talk about how we can help, including
                online sessions.
              </span>
            </p>
            <Link
              href="#enquire"
              className="group inline-flex shrink-0 items-center gap-1.5 font-semibold text-lagoon-700 hover:text-lagoon-800"
            >
              Send an invitation
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>

      <section className="border-y border-cream-300 bg-cream-100/60 py-16">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2">
            {FORMAT.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-3xl card-soft p-6 sm:p-8">
                <Icon className="h-7 w-7 text-lagoon-700" aria-hidden="true" />
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
                commit you to anything. It simply starts a conversation.
              </p>
            </SectionHeading>
            <div className="mt-8 flex items-start gap-3 rounded-2xl bg-sage-50 p-5 text-sage-800">
              <CalendarCheck className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              <p className="text-sm leading-relaxed">
                Sessions are confirmed only after a planning conversation with you, and depend on our availability.
              </p>
            </div>
          </div>
          <div className="rounded-[2rem] card-soft p-5 sm:p-8">
            <OutreachRequestForm token={createFormToken()} />
          </div>
        </Container>
      </section>
    </>
  )
}
