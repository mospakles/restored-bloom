import type { Metadata } from "next"
import { connection } from "next/server"
import { ExternalLink, Phone } from "lucide-react"
import { Badge, Container } from "@/components/ui/misc"
import { PageHero } from "@/components/site/blocks"
import { Markdown } from "@/components/site/markdown"
import { ReviewBanner } from "@/components/site/review-banner"
import { getPage, listPublicSupportContacts } from "@/server/pages"

export const metadata: Metadata = {
  title: "Finding support",
  description: "Gentle guidance on seeking help for children, young people, survivors and the adults who support them.",
}

const KIND_LABELS = { EMERGENCY: "Emergency", HELPLINE: "Helplines", REFERRAL: "Support organisations" } as const

export default async function SupportPage() {
  await connection()
  const [page, contacts] = await Promise.all([getPage("support"), listPublicSupportContacts()])
  const groups = (["EMERGENCY", "HELPLINE", "REFERRAL"] as const)
    .map((kind) => ({ kind, items: contacts.filter((c) => c.kind === kind) }))
    .filter((g) => g.items.length > 0)

  return (
    <>
      <PageHero accent="sage" art="shelter" eyebrow="Finding support" title={page.title === "Finding support" ? "You deserve to be safe and supported" : page.title}>
        <p>
          Whatever has happened, you are not alone, and it is not your fault. This page explains some ways to seek
          help. Restored Bloom is not an emergency, medical or counselling service.
        </p>
      </PageHero>
      <Container className="max-w-3xl py-12">
        <ReviewBanner reviewed={page.reviewed} />
        <Markdown>{page.body}</Markdown>

        <section aria-labelledby="contacts-heading" className="mt-14">
          <h2 id="contacts-heading" className="text-3xl text-plum-900">
            Organisations that may be able to help
          </h2>
          {groups.length === 0 ? (
            <p className="mt-4 rounded-3xl border border-dashed border-cream-400 bg-white p-6 leading-relaxed text-plum-700">
              We are verifying contact details for helplines and specialist support organisations in Nigeria. We will
              only list organisations here once their details have been checked. In the meantime, please speak to a
              trusted adult, a doctor or local emergency services.
            </p>
          ) : (
            <div className="mt-6 space-y-10">
              {groups.map((g) => (
                <div key={g.kind}>
                  <h3 className="font-sans text-sm font-bold uppercase tracking-[0.14em] text-plum-900">{KIND_LABELS[g.kind]}</h3>
                  <ul className="mt-4 space-y-4">
                    {g.items.map((c) => (
                      <li key={c.id} className="rounded-3xl card-soft p-6">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-display text-xl text-plum-900">{c.name}</h4>
                          {c.area && <Badge tone="cream">{c.area}</Badge>}
                        </div>
                        <p className="mt-2 leading-relaxed text-plum-800">{c.description}</p>
                        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                          {c.phone && (
                            <a href={`tel:${c.phone.replace(/[^\d+]/g, "")}`} className="inline-flex items-center gap-1.5 font-semibold text-lagoon-700 underline-offset-4 hover:underline">
                              <Phone className="h-4 w-4" aria-hidden="true" /> {c.phone}
                            </a>
                          )}
                          {c.website && (
                            <a href={c.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-lagoon-700 underline-offset-4 hover:underline">
                              <ExternalLink className="h-4 w-4" aria-hidden="true" /> Website<span className="sr-only"> (opens in a new tab)</span>
                            </a>
                          )}
                        </div>
                        <p className="mt-3 text-sm text-plum-600">{c.relationship}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </section>
      </Container>
    </>
  )
}
