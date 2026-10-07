import type { Metadata } from "next"
import Link from "next/link"
import { Shield, Heart, Users, MessageSquare, ArrowRight, CheckCircle } from "lucide-react"
import { PageContainer, SectionWrapper, SectionHeader } from "@/components/layout/section-wrapper"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Teen Support",
  description: "A safe, teen-friendly space covering consent, healthy relationships, online safety, and support for teen survivors.",
}

const topics = [
  { emoji: "🤝", title: "What Consent Really Means", desc: "Consent is enthusiastic, ongoing, and can be withdrawn at any time. If you felt pressured, that's not consent." },
  { emoji: "💚", title: "What Healthy Relationships Look Like", desc: "Respect, trust, communication, and safety. Red flags are real, and you deserve to recognize them." },
  { emoji: "📱", title: "Online Safety & Exploitation", desc: "Recognising grooming, inappropriate requests, and how to protect yourself online." },
  { emoji: "🛡️", title: "If Something Has Already Happened", desc: "It was not your fault. You are not alone. There are people who can help you, including us." },
  { emoji: "🧠", title: "Your Mental Health Matters", desc: "Anxiety, depression, and trauma responses are real and treatable. Reaching out is strength, not weakness." },
  { emoji: "👥", title: "Supporting a Friend", desc: "If a friend has disclosed abuse to you, how to listen, what to say, and how to help them get support." },
]

const truths = [
  "It is never your fault, no matter what you were wearing, where you were, or what you were doing.",
  "You don't have to have 'proof' for your experience to be real and valid.",
  "You can get help without your parents knowing (in most cases).",
  "You don't have to report to anyone you're not comfortable with.",
  "Healing is possible. Many people who have been through what you're going through have found their way to a good life.",
]

export default function TeenSupportPage() {
  return (
    <>
      <div className="bg-emerald-800 py-20">
        <PageContainer>
          <div className="max-w-2xl">
            <p className="text-emerald-300 text-sm font-semibold uppercase tracking-widest mb-3">For Teenagers</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">This Is a Safe Space. For Real.</h1>
            <p className="text-emerald-100 text-lg leading-relaxed mb-8">
              No lectures. No judgment. Just honest information about relationships, consent, and safety, and real support if something has happened to you.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="light" size="lg" asChild><Link href="/get-help">Talk to Someone</Link></Button>
              <Button variant="outline-white" size="lg" asChild><Link href="/get-help#anonymous">Stay Anonymous</Link></Button>
            </div>
          </div>
        </PageContainer>
      </div>

      <SectionWrapper className="bg-white">
        <PageContainer>
          <SectionHeader eyebrow="Topics for Teens" title="What You Need to Know" subtitle="Written for you, clear, honest, and without the usual awkwardness." centered />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {topics.map(({ emoji, title, desc }) => (
              <div key={title} className="bg-stone-50 rounded-2xl border border-stone-100 p-5 hover:border-emerald-200 hover:shadow-sm transition-all">
                <span className="text-3xl mb-4 block">{emoji}</span>
                <h3 className="font-bold text-stone-900 mb-2 leading-snug">{title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </PageContainer>
      </SectionWrapper>

      {/* Truths */}
      <SectionWrapper className="bg-emerald-50">
        <PageContainer narrow>
          <SectionHeader eyebrow="Important" title="Things We Want You to Know" centered />
          <div className="space-y-3">
            {truths.map((truth, i) => (
              <div key={i} className="bg-white rounded-2xl border border-emerald-100 p-4 flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                <p className="text-stone-700 leading-relaxed">{truth}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 bg-emerald-800 rounded-3xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-3">Ready to talk?</h3>
            <p className="text-emerald-200 mb-6">You can reach out completely anonymously. No one will know. You don't need your parents' permission.</p>
            <Button variant="light" size="lg" asChild><Link href="/get-help"><MessageSquare className="h-5 w-5" />Get Help Now</Link></Button>
          </div>
        </PageContainer>
      </SectionWrapper>
    </>
  )
}
