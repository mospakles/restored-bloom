import type { Metadata } from "next"
import Link from "next/link"
import { Shield, AlertTriangle, Heart, CheckCircle, ArrowRight } from "lucide-react"
import { PageContainer, SectionWrapper, SectionHeader } from "@/components/layout/section-wrapper"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Parent & Guardian Resources",
  description: "Guides for parents and caregivers on protecting children, recognising abuse, and supporting a child who has disclosed.",
}

const steps = [
  { title: "Stay Calm", desc: "Your reaction sets the tone. Take a breath. Your child needs to see that they are safe with you right now." },
  { title: "Believe Them", desc: "Children rarely fabricate abuse. Say clearly: 'I believe you. Thank you for telling me. This is not your fault.'" },
  { title: "Don't Interrogate", desc: "Ask open questions gently. Don't press for details. Avoid questions starting with 'Why did you…'" },
  { title: "Don't Confront the Abuser", desc: "This can put you and your child at risk and may interfere with legal processes. Contact authorities first." },
  { title: "Seek Professional Help", desc: "Contact the police, a child protection agency, or a trusted medical professional. Contact us for guidance." },
  { title: "Get Support for Yourself", desc: "Parents also need care. What you're experiencing is a crisis, reach out for your own support too." },
]

const preventionTips = [
  "Teach children the correct names for all body parts from an early age",
  "Have age-appropriate conversations about consent and body autonomy",
  "Teach children they have the right to say no, even to adults",
  "Create a home environment where children feel safe to talk about anything",
  "Know who your children spend time with and trust your instincts",
  "Monitor online activity without invading privacy, have open conversations about online safety",
  "Teach children the difference between safe secrets (surprises) and unsafe secrets",
]

export default function ParentResourcesPage() {
  return (
    <>
      <div className="bg-amber-800 py-20">
        <PageContainer>
          <div className="max-w-2xl">
            <p className="text-amber-300 text-sm font-semibold uppercase tracking-widest mb-3">For Parents & Guardians</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">Protecting the Children You Love</h1>
            <p className="text-amber-100 text-lg leading-relaxed mb-8">
              Practical guidance for parents and caregivers on prevention, recognising warning signs, and supporting a child who has disclosed abuse.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="light" size="lg" asChild><Link href="/get-help">Get Urgent Help</Link></Button>
              <Button variant="outline-white" size="lg" asChild><Link href="/resources">Browse Resources</Link></Button>
            </div>
          </div>
        </PageContainer>
      </div>

      {/* My child just disclosed */}
      <SectionWrapper className="bg-white">
        <PageContainer>
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-10 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-bold text-red-800">My child just told me something happened to them</p>
              <p className="text-red-700 text-sm mt-1">If this is happening right now, follow the steps below and contact us or authorities immediately. You are not alone in this.</p>
            </div>
          </div>
          <SectionHeader eyebrow="Immediate Response Guide" title="What to Do If a Child Discloses" subtitle="The next few minutes matter. Here's how to respond in a way that helps, not harms." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {steps.map(({ title, desc }, i) => (
              <div key={title} className="bg-stone-50 rounded-2xl border border-stone-100 p-5">
                <div className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-bold mb-4">{i + 1}</div>
                <h3 className="font-bold text-stone-900 mb-2">{title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </PageContainer>
      </SectionWrapper>

      {/* Prevention */}
      <SectionWrapper className="bg-stone-50">
        <PageContainer>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <SectionHeader eyebrow="Prevention" title="Building a Safer Environment for Your Child" subtitle="The most powerful protection is a child who knows their worth and feels safe to talk." />
              <ul className="space-y-2.5">
                {preventionTips.map((tip) => (
                  <li key={tip} className="flex items-start gap-2.5 text-stone-600 text-sm">
                    <CheckCircle className="h-4 w-4 text-teal-500 mt-0.5 shrink-0" />{tip}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-stone-100 p-6 shadow-sm">
                <h3 className="font-bold text-stone-900 mb-4 flex items-center gap-2"><Heart className="h-5 w-5 text-rose-500" />Support for Yourself</h3>
                <p className="text-stone-600 text-sm leading-relaxed mb-4">Discovering your child has been abused is traumatic. Your feelings, shock, guilt, rage, grief, are completely valid. You need support too.</p>
                <Button asChild className="w-full"><Link href="/get-help">Get Parent Support</Link></Button>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                <p className="font-semibold text-amber-800 mb-2 text-sm">Remember: It is not your fault.</p>
                <p className="text-amber-700 text-sm leading-relaxed">No parent can protect their child from everything. Abusers are often people we trust. Please don't blame yourself, channel your energy into your child's healing and your own.</p>
              </div>
            </div>
          </div>
        </PageContainer>
      </SectionWrapper>

      <SectionWrapper className="bg-amber-800">
        <PageContainer narrow>
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">You Don't Have to Navigate This Alone</h2>
            <p className="text-amber-200 mb-8 text-lg max-w-xl mx-auto">Our team can help you understand your options, connect with the right support, and find your footing in an overwhelming situation.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="light" size="lg" asChild><Link href="/get-help">Contact Us Now</Link></Button>
              <Button variant="outline-white" size="lg" asChild><Link href="/resources">Browse Parent Resources</Link></Button>
            </div>
          </div>
        </PageContainer>
      </SectionWrapper>
    </>
  )
}
