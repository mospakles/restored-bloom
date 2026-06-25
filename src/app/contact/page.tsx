import type { Metadata } from "next"
import { Mail, Phone, MapPin, Clock, Shield } from "lucide-react"
import { PageContainer, SectionWrapper } from "@/components/layout/section-wrapper"
import { ContactForm } from "@/components/support/contact-form"
import { SITE_CONFIG } from "@/lib/data"

export const metadata: Metadata = { title: "Contact Us", description: "Get in touch with the Restored Bloom team. We respond within 48 hours." }

export default function ContactPage() {
  return (
    <>
      <div className="bg-teal-800 py-20">
        <PageContainer>
          <div className="max-w-2xl">
            <p className="text-teal-300 text-sm font-semibold uppercase tracking-widest mb-3">Get in Touch</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">Contact Us</h1>
            <p className="text-teal-100 text-lg leading-relaxed">Have a question, want to partner with us, or need to reach our team? We'd love to hear from you.</p>
          </div>
        </PageContainer>
      </div>

      <SectionWrapper className="bg-stone-50">
        <PageContainer>
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 bg-white rounded-3xl border border-stone-100 shadow-sm p-8">
              <h2 className="text-2xl font-bold text-stone-900 mb-2">Send Us a Message</h2>
              <p className="text-stone-500 mb-7">For confidential help requests, please use our <a href="/get-help" className="text-teal-700 underline">anonymous help form</a> instead.</p>
              <ContactForm />
            </div>

            <div className="space-y-5">
              {[
                { icon: Mail, label: "Email", value: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}` },
                { icon: Phone, label: "Phone", value: SITE_CONFIG.phone, href: `tel:${SITE_CONFIG.phone}` },
                { icon: MapPin, label: "Location", value: "Lagos, Nigeria", href: undefined },
                { icon: Clock, label: "Response Time", value: "Within 48 hours", href: undefined },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="bg-white rounded-2xl border border-stone-100 p-5 flex items-start gap-4">
                  <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-teal-700" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-0.5">{label}</p>
                    {href ? <a href={href} className="text-stone-700 font-medium hover:text-teal-700 transition-colors">{value}</a> : <p className="text-stone-700 font-medium">{value}</p>}
                  </div>
                </div>
              ))}

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                <div className="flex items-center gap-2 text-amber-800 font-semibold mb-2 text-sm">
                  <Shield className="h-4 w-4" />
                  Need immediate help?
                </div>
                <p className="text-sm text-amber-700">Don't wait for a response. Use our <a href="/get-help" className="underline font-medium">anonymous help form</a> for urgent support, or call your local emergency services.</p>
              </div>
            </div>
          </div>
        </PageContainer>
      </SectionWrapper>
    </>
  )
}
