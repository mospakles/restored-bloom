import type { Metadata } from "next"
import Link from "next/link"
import { Shield, Heart, Users, ArrowRight, CheckCircle, AlertTriangle, Phone } from "lucide-react"
import { PageContainer, SectionWrapper, SectionHeader } from "@/components/layout/section-wrapper"
import { Button } from "@/components/ui/button"
import { CRISIS_LINES } from "@/lib/data"

export const metadata: Metadata = {
  title: "Sexual Abuse Support",
  description: "Compassionate, confidential support for survivors of sexual abuse, children, teenagers, adults, and male survivors.",
}

const supportTypes = [
  { title: "Children & Teenagers", icon: Shield, desc: "Age-appropriate, trauma-informed support for young survivors, with parental guidance available.", items: ["Age-appropriate counselling referrals", "School and caregiver resources", "Safe reporting pathways", "Child protection guidance"] },
  { title: "Adult Survivors", icon: Heart, desc: "Support for adults processing past or recent abuse, at any stage of their healing journey.", items: ["Trauma-focused therapy referrals", "Support groups", "Legal guidance", "Crisis support 24/7"] },
  { title: "Male Survivors", icon: Users, desc: "Dedicated, stigma-free support for men and boys, because abuse affects everyone.", items: ["Male-specific resources", "Peer support connections", "Mental health referrals", "Confidential guidance"] },
]

const warningSignsChildren = ["Sudden changes in behaviour or mood", "Withdrawal from friends, family, or activities", "Unexplained physical symptoms", "Age-inappropriate sexual knowledge or behaviour", "Nightmares or sleep disturbances", "Reluctance to be around certain adults", "Regression to younger behaviours"]

export default function SexualAbuseSupportPage() {
  return (
    <>
      <div className="bg-teal-800 py-20">
        <PageContainer>
          <div className="max-w-2xl">
            <p className="text-teal-300 text-sm font-semibold uppercase tracking-widest mb-3">Sexual Abuse Support</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
              You Are Believed.<br />You Are Not Alone.
            </h1>
            <p className="text-teal-100 text-lg leading-relaxed mb-8">
              Compassionate, trauma-informed support for survivors of sexual abuse, children, teenagers, adults, and male survivors. Whatever your story, you deserve care.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="light" size="lg" asChild><Link href="/get-help"><Shield className="h-5 w-5" />Get Help Now</Link></Button>
              <Button variant="outline-white" size="lg" asChild><Link href="/get-help#anonymous">Speak Anonymously</Link></Button>
            </div>
          </div>
        </PageContainer>
      </div>

      {/* Crisis banner */}
      <div className="bg-red-900 py-4">
        <PageContainer>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="text-red-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"><AlertTriangle className="h-4 w-4" />Immediate Crisis Support</span>
            {CRISIS_LINES.slice(0, 3).map((line) => (
              <span key={line.country} className="text-sm"><span className="text-white font-semibold">{line.country}:</span> <span className="text-red-300 font-bold">{line.number}</span></span>
            ))}
          </div>
        </PageContainer>
      </div>

      {/* Support types */}
      <SectionWrapper className="bg-white">
        <PageContainer>
          <SectionHeader eyebrow="Who We Support" title="Support for Every Survivor" subtitle="Abuse does not discriminate. Neither does our care." centered />
          <div className="grid md:grid-cols-3 gap-6">
            {supportTypes.map(({ title, icon: Icon, desc, items }) => (
              <div key={title} className="bg-stone-50 rounded-2xl border border-stone-100 p-6">
                <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center mb-4"><Icon className="h-6 w-6 text-teal-700" /></div>
                <h3 className="font-bold text-stone-900 text-lg mb-2">{title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed mb-4">{desc}</p>
                <ul className="space-y-1.5">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-stone-500"><CheckCircle className="h-3.5 w-3.5 text-teal-500 shrink-0" />{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </PageContainer>
      </SectionWrapper>

      {/* Warning signs */}
      <SectionWrapper className="bg-stone-50">
        <PageContainer>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionHeader eyebrow="For Parents & Caregivers" title="Warning Signs to Watch For" subtitle="Early recognition can make all the difference. These signs may indicate a child is experiencing abuse." />
              <ul className="space-y-2">
                {warningSignsChildren.map((sign) => (
                  <li key={sign} className="flex items-start gap-2.5 text-stone-600 text-sm">
                    <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />{sign}
                  </li>
                ))}
              </ul>
              <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                <strong>If you suspect abuse:</strong> Don't confront the suspected perpetrator. Remain calm with the child. Report to authorities or contact us immediately.
              </div>
            </div>
            <div className="bg-white rounded-3xl border border-stone-100 p-7 shadow-sm">
              <h3 className="font-bold text-stone-900 text-xl mb-5">What Happens When You Reach Out</h3>
              <ol className="space-y-5">
                {[
                  { title: "You contact us", desc: "By form, anonymously, or by phone, completely on your terms." },
                  { title: "We listen", desc: "A trained responder reviews your message with compassion and without judgment." },
                  { title: "We respond", desc: "We share relevant resources, support options, and next steps within 48 hours." },
                  { title: "We connect you", desc: "If appropriate, we refer you to a qualified local counsellor or specialist." },
                ].map((step, i) => (
                  <li key={step.title} className="flex items-start gap-4">
                    <span className="w-8 h-8 bg-teal-700 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">{i + 1}</span>
                    <div>
                      <p className="font-semibold text-stone-900">{step.title}</p>
                      <p className="text-sm text-stone-500">{step.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <Button asChild className="w-full mt-7"><Link href="/get-help"><ArrowRight className="h-4 w-4" />Start Here</Link></Button>
            </div>
          </div>
        </PageContainer>
      </SectionWrapper>

      {/* Resources CTA */}
      <SectionWrapper className="bg-teal-800">
        <PageContainer narrow>
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Take the First Step?</h2>
            <p className="text-teal-200 mb-8 text-lg max-w-xl mx-auto">Your healing begins with one decision, to reach out. We will meet you exactly where you are.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="light" size="lg" asChild><Link href="/get-help">Get Help Now</Link></Button>
              <Button variant="outline-white" size="lg" asChild><Link href="/resources">Browse Resources</Link></Button>
              <Button variant="outline-white" size="lg" asChild><Link href="/anonymous-stories">Read Stories</Link></Button>
            </div>
          </div>
        </PageContainer>
      </SectionWrapper>
    </>
  )
}
