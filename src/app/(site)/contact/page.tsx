import type { Metadata } from "next"
import Link from "next/link"
import { connection } from "next/server"
import { Clock, Mail, MapPin, Phone } from "lucide-react"
import { Container, SectionHeading } from "@/components/ui/misc"
import { PageHero } from "@/components/site/blocks"
import { ContactForm } from "@/components/forms/public-forms"
import { createFormToken } from "@/lib/security"
import { getSettings } from "@/server/settings"

export const metadata: Metadata = {
  title: "Contact",
  description: "General enquiries for Restored Bloom. This form is not an emergency channel.",
}

export default async function ContactPage() {
  await connection()
  const settings = await getSettings()
  const details = [
    { icon: MapPin, label: "Based in", value: settings.location || "Lagos, Nigeria" },
    settings.contactEmail && {
      icon: Mail,
      label: "Email",
      value: settings.contactEmail,
      href: `mailto:${settings.contactEmail}`,
    },
    settings.contactPhone && {
      icon: Phone,
      label: "Phone",
      value: settings.contactPhone,
      href: `tel:${settings.contactPhone.replace(/[^\d+]/g, "")}`,
    },
    settings.officeHours && { icon: Clock, label: "Hours", value: settings.officeHours },
  ].filter(Boolean) as { icon: typeof MapPin; label: string; value: string; href?: string }[]

  return (
    <>
      <PageHero eyebrow="Contact" title="Get in touch">
        <p>
          To invite us to your school, community or organisation, please use the{" "}
          <Link href="/invite-us#enquire" className="font-semibold text-rose-700 underline underline-offset-4">
            invitation form
          </Link>
          . For volunteering and partnerships, see{" "}
          <Link href="/get-involved" className="font-semibold text-rose-700 underline underline-offset-4">
            get involved
          </Link>
          .
        </p>
      </PageHero>
      <section className="py-16">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeading title="General enquiries" />
            <dl className="mt-8 space-y-5">
              {details.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex gap-3">
                  <Icon className="mt-1 h-5 w-5 shrink-0 text-rose-700" aria-hidden="true" />
                  <div>
                    <dt className="text-sm font-semibold text-plum-600">{label}</dt>
                    <dd className="text-lg text-plum-900">
                      {href ? (
                        <a href={href} className="underline-offset-4 hover:underline">
                          {value}
                        </a>
                      ) : (
                        value
                      )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
            <div className="mt-10 rounded-3xl border border-sage-200 bg-sage-50 p-6">
              <h2 className="text-xl text-plum-900">Need support?</h2>
              <p className="mt-2 leading-relaxed text-plum-800">
                Restored Bloom is not an emergency, medical or counselling service. If anyone is in immediate danger,
                contact local emergency services.
              </p>
              <Link href="/support" className="mt-3 inline-block font-semibold text-sage-800 underline underline-offset-4">
                Finding support
              </Link>
            </div>
          </div>
          <div className="rounded-[2rem] border border-cream-300 bg-white p-5 sm:p-8">
            <ContactForm token={createFormToken()} />
          </div>
        </Container>
      </section>
    </>
  )
}
