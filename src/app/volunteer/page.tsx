import type { Metadata } from "next"
import { CheckCircle } from "lucide-react"
import { PageContainer, SectionWrapper, SectionHeader } from "@/components/layout/section-wrapper"
import { VolunteerForm } from "@/components/support/volunteer-form"

export const metadata: Metadata = { title: "Volunteer", description: "Apply to join the Restored Bloom volunteer team and lend your professional skills to survivors." }

const benefits = [
  "Make a direct, measurable impact on survivors' lives",
  "Join a compassionate, professionally-run team",
  "Access ongoing training and support resources",
  "Flexible volunteering, contribute on your schedule",
  "Certificate of volunteer service provided",
  "Work alongside experts in trauma-informed care",
]

export default function VolunteerPage() {
  return (
    <>
      <div className="bg-emerald-800 py-20">
        <PageContainer>
          <div className="max-w-2xl">
            <p className="text-emerald-300 text-sm font-semibold uppercase tracking-widest mb-3">Join the Mission</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">Lend Your Skills. Change a Life.</h1>
            <p className="text-emerald-100 text-lg leading-relaxed">We are building a network of compassionate professionals who believe every survivor deserves support. There is a place for your gifts here.</p>
          </div>
        </PageContainer>
      </div>

      <SectionWrapper className="bg-stone-50">
        <PageContainer>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <VolunteerForm />
            </div>
            <div className="space-y-5">
              <div className="bg-white rounded-2xl border border-stone-100 p-6 shadow-sm">
                <h3 className="font-bold text-stone-900 mb-4 text-lg">Why Volunteer with Us</h3>
                <ul className="space-y-3">
                  {benefits.map(b => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-stone-600">
                      <CheckCircle className="h-4 w-4 text-teal-500 mt-0.5 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-teal-50 border border-teal-100 rounded-2xl p-5">
                <h3 className="font-bold text-teal-900 mb-2">Application Process</h3>
                <ol className="space-y-2">
                  {["Submit your application below", "Our team reviews your credentials (5–7 days)", "Interview and safeguarding check", "Onboarding and orientation", "Start making a difference"].map((step, i) => (
                    <li key={step} className="flex items-start gap-2 text-sm text-teal-800">
                      <span className="w-5 h-5 bg-teal-700 text-white rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5">{i+1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </PageContainer>
      </SectionWrapper>
    </>
  )
}
