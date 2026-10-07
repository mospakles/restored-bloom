import type { Metadata } from "next"
import { PageContainer, SectionWrapper } from "@/components/layout/section-wrapper"
import { Shield, AlertTriangle, Users, FileText } from "lucide-react"

export const metadata: Metadata = { title: "Safeguarding Policy", description: "Restored Bloom Safeguarding Policy, protecting vulnerable adults and children on our platform." }

export default function SafeguardingPage() {
  return (
    <>
      <div className="bg-stone-800 py-16"><PageContainer narrow><h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Safeguarding Policy</h1><p className="text-stone-400">Last reviewed: June 2025</p></PageContainer></div>
      <SectionWrapper className="bg-white">
        <PageContainer narrow>
          <div className="space-y-8">
            {[
              { icon: Shield, title: "Our Safeguarding Commitment", points: ["Restored Bloom is committed to creating a safe environment for all users, with particular attention to children and vulnerable adults.", "Every person who uses our platform has the right to be treated with dignity, safety, and respect.", "We maintain a zero-tolerance policy for abuse, exploitation, or harm facilitated through our platform."] },
              { icon: Users, title: "Volunteer & Staff Screening", points: ["All volunteers who interact with users are subject to background verification.", "Volunteers complete safeguarding training before beginning any user-facing role.", "A designated Safeguarding Lead oversees all volunteer conduct and responds to concerns.", "Any volunteer found to have behaved in a manner harmful to users will be immediately suspended."] },
              { icon: AlertTriangle, title: "Reporting a Safeguarding Concern", points: ["If you have a concern about a child or vulnerable adult, including content on this platform, please report it immediately to safeguarding@havenofgrace.org.", "We take all safeguarding reports seriously and respond within 24 hours.", "Where there is an immediate risk of harm, we will work with relevant authorities."] },
              { icon: FileText, title: "Platform Content Safeguards", points: ["All submitted stories are moderated before publication.", "Anonymous help requests are reviewed by trained staff only.", "Our platform is designed to prevent the sharing of harmful, exploitative, or illegal content.", "Any content that facilitates grooming, exploitation, or harm is immediately removed and reported."] },
            ].map(({ icon: Icon, title, points }) => (
              <div key={title} className="border-b border-stone-100 pb-8 last:border-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center"><Icon className="h-5 w-5 text-teal-700" /></div>
                  <h2 className="text-xl font-bold text-stone-900">{title}</h2>
                </div>
                <ul className="space-y-2">{points.map((p, i) => <li key={i} className="text-stone-600 text-sm leading-relaxed flex items-start gap-2"><span className="w-1.5 h-1.5 bg-teal-400 rounded-full mt-2 shrink-0" />{p}</li>)}</ul>
              </div>
            ))}
          </div>
        </PageContainer>
      </SectionWrapper>
    </>
  )
}
