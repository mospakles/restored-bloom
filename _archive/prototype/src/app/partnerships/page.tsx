import type { Metadata } from "next"
import Link from "next/link"
import { Building, Heart, Globe, Handshake, ArrowRight, CheckCircle } from "lucide-react"
import { PageContainer, SectionWrapper, SectionHeader } from "@/components/layout/section-wrapper"
import { Button } from "@/components/ui/button"
import { ContactForm } from "@/components/support/contact-form"

export const metadata: Metadata = {
  title: "Partnerships",
  description: "Partner with Restored Bloom to expand access to healing and support for survivors across Africa.",
}

const partnerTypes = [
  { icon: Building, title: "Healthcare Organisations", desc: "Hospitals, clinics, and health NGOs working to improve sexual and reproductive health access.", examples: ["Joint resource development", "Referral partnerships", "Training and capacity building"] },
  { icon: Globe, title: "Faith Organisations", desc: "Churches, mosques, and faith communities who want to support survivors with pastoral care.", examples: ["Pastoral counsellor training", "Safe space designation", "Community outreach"] },
  { icon: Handshake, title: "Corporate Partners", desc: "Businesses who want to support our mission through CSR, funding, or staff volunteering.", examples: ["Programme funding", "In-kind tech support", "Staff volunteering days"] },
  { icon: Heart, title: "NGOs & Civil Society", desc: "Nonprofits and advocacy organisations working in related areas of child protection, gender, and health.", examples: ["Joint advocacy campaigns", "Resource sharing", "Co-referral agreements"] },
]

export default function PartnershipsPage() {
  return (
    <>
      <div className="bg-teal-800 py-20">
        <PageContainer>
          <div className="max-w-2xl">
            <p className="text-teal-300 text-sm font-semibold uppercase tracking-widest mb-3">Partnerships</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">Stronger Together</h1>
            <p className="text-teal-100 text-lg leading-relaxed mb-8">
              We believe no organisation can solve this crisis alone. We actively seek partnerships with healthcare providers, faith communities, NGOs, and corporate partners who share our mission.
            </p>
            <Button variant="light" size="lg" asChild><Link href="#partner-form"><Handshake className="h-5 w-5" />Become a Partner</Link></Button>
          </div>
        </PageContainer>
      </div>

      <SectionWrapper className="bg-white">
        <PageContainer>
          <SectionHeader eyebrow="Who We Partner With" title="Partnership Opportunities" subtitle="We work with a range of organisations to expand our reach and deepen our impact." centered />
          <div className="grid sm:grid-cols-2 gap-6">
            {partnerTypes.map(({ icon: Icon, title, desc, examples }) => (
              <div key={title} className="bg-stone-50 rounded-2xl border border-stone-100 p-6">
                <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center mb-4"><Icon className="h-6 w-6 text-teal-700" /></div>
                <h3 className="font-bold text-stone-900 text-lg mb-2">{title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed mb-4">{desc}</p>
                <ul className="space-y-1.5">
                  {examples.map((ex) => (
                    <li key={ex} className="flex items-center gap-2 text-xs text-stone-500"><CheckCircle className="h-3.5 w-3.5 text-teal-500 shrink-0" />{ex}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </PageContainer>
      </SectionWrapper>

      <SectionWrapper className="bg-stone-50" id="partner-form">
        <PageContainer>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <SectionHeader eyebrow="Get in Touch" title="Express Your Interest" subtitle="Fill out the form and our partnerships team will respond within 5 business days." />
              <div className="space-y-4">
                {["Aligned values around survivor care and dignity","Clear safeguarding and child protection policies","Transparent operations and governance","Commitment to confidentiality and ethics"].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <CheckCircle className="h-4 w-4 text-teal-500 mt-0.5 shrink-0" />
                    <p className="text-stone-600 text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-3xl border border-stone-100 shadow-sm p-7">
              <h3 className="font-bold text-stone-900 text-xl mb-5">Partnership Enquiry</h3>
              <ContactForm />
            </div>
          </div>
        </PageContainer>
      </SectionWrapper>
    </>
  )
}
