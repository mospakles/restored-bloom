import type { Metadata } from "next"
import Link from "next/link"
import { Heart, BookOpen, Star, Sunrise, ArrowRight } from "lucide-react"
import { PageContainer, SectionWrapper, SectionHeader } from "@/components/layout/section-wrapper"
import { Button } from "@/components/ui/button"
import { PrayerRequestForm } from "@/components/support/prayer-request-form"

export const metadata: Metadata = {
  title: "Faith & Healing",
  description: "Faith-centered resources for survivors, devotionals, prayer, and hope for restoration.",
}

const devotionals = [
  { title: "When God Feels Far Away", verse: "Psalm 34:18", preview: "The LORD is close to the brokenhearted and saves those who are crushed in spirit. Healing begins not with having all the answers, but with knowing you are not alone." },
  { title: "Shame Has No Power Over You", verse: "Isaiah 61:7", preview: "Instead of your shame you will receive a double portion... You were not designed to carry shame that was never yours to bear." },
  { title: "Your Pain Is Seen", verse: "Genesis 16:13", preview: "She gave this name to the LORD who spoke to her: 'You are the God who sees me.' Whatever you have endured, you have been seen, every moment, every tear." },
  { title: "Healing Is Not Linear", verse: "Lamentations 3:22–23", preview: "His mercies are new every morning. Some days will be harder than others. And every morning you wake up is a new merciful beginning." },
]

const questions = [
  { q: "Why did God allow this to happen?", a: "This is one of the most profound and painful questions a survivor can ask. We don't have a simple answer, and anyone who claims to is not being honest. What we believe is that God is with you in your pain, not absent from it." },
  { q: "Is it wrong to feel angry at God?", a: "No. The Psalms are filled with anguished, angry prayers. God can handle your anger. Bringing your true feelings, including rage, to God is an act of faith, not rebellion." },
  { q: "Does forgiveness mean excusing what happened?", a: "Absolutely not. Forgiveness does not mean what was done was acceptable, that there are no consequences, or that you must resume a relationship with your abuser. Forgiveness is a process about your freedom, not their absolution." },
  { q: "Can someone who has been abused lead a flourishing life?", a: "Yes, wholeheartedly yes. Healing is real. Many survivors go on to experience deep joy, meaningful relationships, and profound purpose. Your story is not finished." },
]

export default function FaithHealingPage() {
  return (
    <>
      <div className="bg-indigo-900 py-20">
        <PageContainer>
          <div className="max-w-2xl">
            <p className="text-indigo-300 text-sm font-semibold uppercase tracking-widest mb-3">Faith & Healing</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
              He Heals the<br />Brokenhearted.
            </h1>
            <p className="text-indigo-100 text-lg leading-relaxed mb-3">
              "He heals the brokenhearted and binds up their wounds.", Psalm 147:3
            </p>
            <p className="text-indigo-200 leading-relaxed mb-8">
              Faith-centered resources for survivors. You are welcome here regardless of your denomination, background, or where you are with God right now.
            </p>
            <Button variant="light" size="lg" asChild><Link href="#devotionals"><BookOpen className="h-5 w-5" />Read Devotionals</Link></Button>
          </div>
        </PageContainer>
      </div>

      {/* Devotionals */}
      <SectionWrapper className="bg-white" id="devotionals">
        <PageContainer>
          <SectionHeader eyebrow="Devotionals" title="Words for the Hard Days" subtitle="Brief, compassionate devotionals written for survivors, honest, hope-filled, and real." />
          <div className="grid md:grid-cols-2 gap-5">
            {devotionals.map(({ title, verse, preview }) => (
              <div key={title} className="bg-stone-50 rounded-2xl border border-stone-100 p-6 hover:border-indigo-100 hover:shadow-sm transition-all">
                <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-2">{verse}</p>
                <h3 className="font-bold text-stone-900 text-lg mb-3 font-display">{title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed italic">"{preview}"</p>
                <button className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-700 hover:gap-2.5 transition-all">
                  Read full devotional <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </PageContainer>
      </SectionWrapper>

      {/* Hard questions */}
      <SectionWrapper className="bg-stone-50">
        <PageContainer>
          <SectionHeader eyebrow="Honest Conversations" title="The Hard Questions" subtitle="Questions survivors often carry about faith, God, and healing, answered with honesty and compassion." />
          <div className="space-y-4">
            {questions.map(({ q, a }) => (
              <div key={q} className="bg-white rounded-2xl border border-stone-100 p-6">
                <h3 className="font-bold text-stone-900 mb-3 text-lg">{q}</h3>
                <p className="text-stone-600 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </PageContainer>
      </SectionWrapper>

      {/* Prayer requests */}
      <SectionWrapper className="bg-indigo-50">
        <PageContainer>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionHeader eyebrow="Community Prayer" title="You Don't Have to Pray Alone" subtitle="Submit a prayer request and our community will pray with you. All requests are anonymous by default." />
              <div className="bg-white rounded-2xl border border-indigo-100 p-5 mb-5">
                <blockquote className="italic text-stone-600 text-lg leading-relaxed font-display">
                  "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God."
                </blockquote>
                <p className="text-sm text-stone-400 mt-2">— Philippians 4:6</p>
              </div>
            </div>
            <PrayerRequestForm />
          </div>
        </PageContainer>
      </SectionWrapper>
    </>
  )
}
