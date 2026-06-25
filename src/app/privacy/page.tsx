import type { Metadata } from "next"
import { PageContainer, SectionWrapper } from "@/components/layout/section-wrapper"
import { Shield, Lock, Eye, Trash2 } from "lucide-react"

export const metadata: Metadata = { title: "Privacy Policy", description: "Restored Bloom Privacy Policy, how we collect, use, and protect your data." }

const sections = [
  {
    icon: Shield,
    title: "Information We Collect",
    content: [
      "For registered accounts: name (optional), email address, and password (encrypted).",
      "For help requests: only the information you choose to provide. Anonymous submissions collect zero personal data.",
      "Anonymous story submissions: content only, no IP address, no device data, no identifying information.",
      "Technical data: standard web server logs (IP address, page visited, timestamp) retained for 30 days for security purposes only.",
    ],
  },
  {
    icon: Lock,
    title: "How We Use Your Information",
    content: [
      "To respond to your help requests if you have provided contact information.",
      "To maintain your account and provide platform features.",
      "To improve our resources and services (in aggregate, anonymised form only).",
      "We never sell, trade, or share your personal information with third parties for marketing purposes.",
      "We never share your information with government authorities unless required by a valid court order.",
    ],
  },
  {
    icon: Eye,
    title: "Anonymous Submissions",
    content: [
      "When you choose anonymous submission, we do not record your IP address, device information, or any identifying data.",
      "Your secure reference code is generated client-side and not linked to any identifying information.",
      "Anonymous stories are stored as content only, not linked to any user account or device.",
    ],
  },
  {
    icon: Trash2,
    title: "Your Rights",
    content: [
      "Right of access: You may request a copy of any personal data we hold about you.",
      "Right to erasure: You may request deletion of your account and all associated data.",
      "Right to correction: You may correct inaccurate personal data at any time via your profile settings.",
      "Right to withdraw consent: You may unsubscribe from communications at any time.",
      "To exercise any of these rights, contact support@havenofgrace.org.",
    ],
  },
]

export default function PrivacyPage() {
  return (
    <>
      <div className="bg-stone-800 py-16">
        <PageContainer narrow>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-stone-400">Last updated: June 2025 · Effective: June 2025</p>
        </PageContainer>
      </div>
      <SectionWrapper className="bg-white">
        <PageContainer narrow>
          <p className="text-lg text-stone-600 leading-relaxed mb-10 p-5 bg-teal-50 border border-teal-100 rounded-2xl">
            <strong className="text-teal-800">Our commitment:</strong> Restored Bloom is built for vulnerable people. Privacy is not an afterthought, it is foundational to everything we do. We collect the minimum data possible, protect it rigorously, and never weaponise it.
          </p>
          <div className="space-y-8">
            {sections.map(({ icon: Icon, title, content }) => (
              <div key={title} className="border-b border-stone-100 pb-8 last:border-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center">
                    <Icon className="h-5 w-5 text-teal-700" />
                  </div>
                  <h2 className="text-xl font-bold text-stone-900">{title}</h2>
                </div>
                <ul className="space-y-2">
                  {content.map((item, i) => (
                    <li key={i} className="text-stone-600 leading-relaxed text-sm flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-teal-400 rounded-full mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-stone-50 rounded-2xl p-5">
            <p className="text-sm text-stone-600">Questions about this policy? Contact our Data Protection Officer at <a href="mailto:privacy@havenofgrace.org" className="text-teal-700 underline">privacy@havenofgrace.org</a></p>
          </div>
        </PageContainer>
      </SectionWrapper>
    </>
  )
}
