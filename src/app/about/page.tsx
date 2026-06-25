import type { Metadata } from "next"
import Link from "next/link"
import { Heart, Shield, Star, Lock, Megaphone, Sparkles } from "lucide-react"
import { PageContainer, SectionWrapper, SectionHeader } from "@/components/layout/section-wrapper"
import { Button } from "@/components/ui/button"
import { VALUES } from "@/lib/data"

export const metadata: Metadata = { title: "About Us", description: "Learn about Restored Bloom, our story, mission, vision, and the team behind the platform." }

const iconMap: Record<string, React.ElementType> = { Heart, Shield, Star, Sparkles, Lock, Megaphone, Sunrise: Sparkles }

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-teal-800 py-20">
        <PageContainer narrow>
          <p className="text-teal-300 text-sm font-semibold uppercase tracking-widest mb-3">About Restored Bloom</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
            We Exist for Every<br />Person Who Suffers in Silence
          </h1>
          <p className="text-teal-100 text-lg leading-relaxed max-w-2xl">
            Restored Bloom is a faith-centered, trauma-informed nonprofit platform providing hope, healing, and support for survivors of sexual abuse and those navigating sexual health challenges.
          </p>
        </PageContainer>
      </div>

      {/* Story */}
      <SectionWrapper className="bg-white">
        <PageContainer>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader eyebrow="Our Story" title="Why We Were Founded" />
              <div className="space-y-4 text-stone-600 leading-relaxed">
                <p>Restored Bloom was born from a deep, personal conviction: that no survivor of sexual abuse should have to carry their pain alone, in silence, and without access to compassionate, informed support.</p>
                <p>Too many people, women, children, teenagers, men, suffer in isolation not because help doesn&apos;t exist, but because the systems meant to help them feel unsafe, inaccessible, or judgmental. We are changing that.</p>
                <p>We believe in the power of community, the dignity of every human being, and the profound truth that healing is possible, no matter how deep the wound.</p>
              </div>
            </div>
            <div className="bg-teal-50 rounded-3xl p-8 border border-teal-100">
              <blockquote className="text-2xl font-bold text-teal-800 font-display leading-tight italic mb-4">
                &quot;From Silence to Strength.&quot;
              </blockquote>
              <p className="text-teal-700 leading-relaxed">This is our promise to every person who walks through our doors, whether online or in person. We walk with you toward wholeness, one step at a time.</p>
            </div>
          </div>
        </PageContainer>
      </SectionWrapper>

      {/* Mission & Vision */}
      <SectionWrapper className="bg-stone-50">
        <PageContainer>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 border border-stone-100 shadow-sm">
              <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center mb-5">
                <Heart className="h-6 w-6 text-teal-700" />
              </div>
              <h2 className="text-2xl font-bold text-stone-900 mb-3">Our Mission</h2>
              <p className="text-stone-600 leading-relaxed">
                To provide hope, healing, support, advocacy, and access to help for those suffering in silence due to sexual abuse, trauma, sexual health challenges, exploitation, shame, fear, or social stigma.
              </p>
            </div>
            <div className="bg-white rounded-3xl p-8 border border-stone-100 shadow-sm">
              <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center mb-5">
                <Star className="h-6 w-6 text-purple-700" />
              </div>
              <h2 className="text-2xl font-bold text-stone-900 mb-3">Our Vision</h2>
              <p className="text-stone-600 leading-relaxed">
                A world where every survivor has access to compassionate, trauma-informed support, where no one is left to face abuse, shame, or trauma in isolation, regardless of background or resources.
              </p>
            </div>
          </div>
        </PageContainer>
      </SectionWrapper>

      {/* Values */}
      <SectionWrapper className="bg-white">
        <PageContainer>
          <SectionHeader eyebrow="What We Stand For" title="Our Core Values" centered />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((value) => {
              const Icon = iconMap[value.icon] ?? Heart
              return (
                <div key={value.title} className="bg-stone-50 rounded-2xl p-5 border border-stone-100 text-center">
                  <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-teal-700" />
                  </div>
                  <h3 className="font-bold text-stone-900 mb-2">{value.title}</h3>
                  <p className="text-sm text-stone-500 leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </PageContainer>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper className="bg-teal-800">
        <PageContainer narrow>
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Join Us in This Mission</h2>
            <p className="text-teal-200 text-lg mb-8 max-w-xl mx-auto">Whether you need help, want to volunteer, or want to support us financially, there is a place for you here.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="light" size="lg" asChild><Link href="/get-help">Get Help Now</Link></Button>
              <Button variant="outline-white" size="lg" asChild><Link href="/volunteer">Volunteer</Link></Button>
              <Button variant="outline-white" size="lg" asChild><Link href="/donate">Donate</Link></Button>
            </div>
          </div>
        </PageContainer>
      </SectionWrapper>
    </>
  )
}
