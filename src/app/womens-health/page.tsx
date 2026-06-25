import type { Metadata } from "next"
import Link from "next/link"
import { Heart, Shield, BookOpen, Users, ArrowRight, CheckCircle } from "lucide-react"
import { PageContainer, SectionWrapper, SectionHeader } from "@/components/layout/section-wrapper"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Women's Sexual Health",
  description: "Honest, shame-free sexual health information and support for women, rooted in dignity and respect.",
}

const topics = [
  { title: "Intimate Health Education", icon: BookOpen, color: "bg-purple-50 text-purple-700", desc: "Clear, shame-free information about women's bodies, reproductive health, and intimate wellness." },
  { title: "STI Awareness & Prevention", icon: Shield, color: "bg-teal-50 text-teal-700", desc: "Factual, stigma-free guidance on sexually transmitted infections, testing, treatment, and prevention." },
  { title: "Reproductive Health", icon: Heart, color: "bg-rose-50 text-rose-600", desc: "Guidance on menstrual health, fertility, contraception, and navigating reproductive healthcare in Nigeria." },
  { title: "Relationship Wellness", icon: Users, color: "bg-amber-50 text-amber-600", desc: "Understanding healthy vs. unhealthy relationships, consent, and emotional safety in intimacy." },
  { title: "Healing After Abuse", icon: Heart, color: "bg-emerald-50 text-emerald-700", desc: "Support for women navigating sexual trauma, your experience is valid and healing is possible." },
  { title: "Finding Confidential Care", icon: Shield, color: "bg-indigo-50 text-indigo-700", desc: "How to access discreet, respectful healthcare in Nigeria without judgment or fear." },
]

const myths = [
  { myth: "\"STIs only affect certain types of people\"", truth: "STIs can affect anyone who is sexually active, regardless of background, status, or relationship type." },
  { myth: "\"You can always tell if someone has an STI\"", truth: "Many STIs have no visible symptoms. The only way to know for certain is through testing." },
  { myth: "\"Only women with many partners get reproductive problems\"", truth: "Reproductive health challenges can affect any woman and are medical conditions, not moral judgments." },
  { myth: "\"Seeking sexual health care is shameful\"", truth: "Taking care of your body is an act of self-respect and wisdom. You deserve health care without shame." },
]

export default function WomensHealthPage() {
  return (
    <>
      <div className="bg-purple-800 py-20">
        <PageContainer>
          <div className="max-w-2xl">
            <p className="text-purple-300 text-sm font-semibold uppercase tracking-widest mb-3">Women's Sexual Health</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">Your Body. Your Worth. Your Health.</h1>
            <p className="text-purple-100 text-lg leading-relaxed mb-8">
              Honest, shame-free sexual health information and support for women, rooted in dignity, compassion, and respect for your whole person.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="light" size="lg" asChild><Link href="/resources">Browse Resources</Link></Button>
              <Button variant="outline-white" size="lg" asChild><Link href="/get-help">Get Support</Link></Button>
            </div>
          </div>
        </PageContainer>
      </div>

      <SectionWrapper className="bg-white">
        <PageContainer>
          <SectionHeader eyebrow="What We Cover" title="Health Topics for Women" subtitle="No topic is off-limits. Everything here is presented with accuracy, dignity, and zero judgment." centered />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {topics.map(({ title, icon: Icon, color, desc }) => (
              <div key={title} className="bg-stone-50 rounded-2xl border border-stone-100 p-5 hover:border-purple-200 hover:shadow-sm transition-all">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-4 ${color}`}><Icon className="h-5 w-5" /></div>
                <h3 className="font-bold text-stone-900 mb-2">{title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </PageContainer>
      </SectionWrapper>

      {/* Myth busting */}
      <SectionWrapper className="bg-stone-50">
        <PageContainer>
          <SectionHeader eyebrow="Setting the Record Straight" title="Myths vs. Truth" subtitle="Sexual health misinformation causes real harm. Let's replace shame with facts." />
          <div className="grid md:grid-cols-2 gap-5">
            {myths.map(({ myth, truth }) => (
              <div key={myth} className="bg-white rounded-2xl border border-stone-100 p-5">
                <div className="bg-red-50 border border-red-100 rounded-xl p-3 mb-3">
                  <p className="text-sm text-red-700 font-medium">{myth}</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-teal-500 mt-0.5 shrink-0" />
                  <p className="text-sm text-stone-600 leading-relaxed">{truth}</p>
                </div>
              </div>
            ))}
          </div>
        </PageContainer>
      </SectionWrapper>

      <SectionWrapper className="bg-purple-800">
        <PageContainer narrow>
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Your Health Matters</h2>
            <p className="text-purple-200 mb-8 text-lg max-w-xl mx-auto">Whether you have questions, concerns, or need support, we are here. No shame, no judgment, only care.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="light" size="lg" asChild><Link href="/get-help">Get Confidential Support</Link></Button>
              <Button variant="outline-white" size="lg" asChild><Link href="/resources">Read Our Resources</Link></Button>
            </div>
          </div>
        </PageContainer>
      </SectionWrapper>
    </>
  )
}
