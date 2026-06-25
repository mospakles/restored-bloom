import type { Metadata } from "next"
import Link from "next/link"
import { PageContainer, SectionWrapper, SectionHeader } from "@/components/layout/section-wrapper"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = { title: "Mission & Vision", description: "The mission, vision, and strategic direction of Restored Bloom." }

export default function MissionPage() {
  return (
    <>
      <div className="bg-teal-800 py-20">
        <PageContainer narrow>
          <p className="text-teal-300 text-sm font-semibold uppercase tracking-widest mb-3">Our Purpose</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">Mission & Vision</h1>
        </PageContainer>
      </div>
      <SectionWrapper className="bg-white">
        <PageContainer narrow>
          <div className="space-y-10">
            {[
              { title: "Our Mission", content: "To provide hope, healing, support, advocacy, and access to help for those suffering in silence due to sexual abuse, trauma, sexual health challenges, exploitation, shame, fear, or social stigma." },
              { title: "Our Vision", content: "A world where every survivor has immediate access to compassionate, trauma-informed support, where shame no longer silences, and every person who suffers can find healing, community, and hope." },
              { title: "Our Approach", content: "We combine evidence-based trauma care with faith-centered wisdom, digital accessibility, and community. We believe healing requires both professional support and human connection, and we work to provide both." },
              { title: "Our Commitment to Safeguarding", content: "Restored Bloom operates with the highest standards of safeguarding, particularly regarding children and vulnerable adults. We maintain clear policies, vet all volunteers, and prioritise the physical and digital safety of every person who uses our platform." },
            ].map(({ title, content }) => (
              <div key={title} className="border-l-4 border-teal-600 pl-6">
                <h2 className="text-2xl font-bold text-stone-900 mb-3">{title}</h2>
                <p className="text-stone-600 leading-relaxed text-lg">{content}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild><Link href="/about">About Restored Bloom</Link></Button>
            <Button variant="outline" asChild><Link href="/volunteer">Join Our Team</Link></Button>
          </div>
        </PageContainer>
      </SectionWrapper>
    </>
  )
}
