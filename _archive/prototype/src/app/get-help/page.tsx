import type { Metadata } from "next"
import Link from "next/link"
import { Phone, Shield, Clock, Lock, CheckCircle, AlertTriangle } from "lucide-react"
import { PageContainer, SectionWrapper, SectionHeader } from "@/components/layout/section-wrapper"
import { AnonymousHelpForm } from "@/components/support/anonymous-help-form"
import { CRISIS_LINES } from "@/lib/data"

export const metadata: Metadata = { title: "Get Help", description: "Reach out for confidential, compassionate support. Anonymous help request available 24/7." }

export default function GetHelpPage() {
  return (
    <>
      <div className="bg-teal-800 py-20">
        <PageContainer>
          <div className="max-w-2xl">
            <p className="text-teal-300 text-sm font-semibold uppercase tracking-widest mb-3">We Are Here For You</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">Get Help Now</h1>
            <p className="text-teal-100 text-lg leading-relaxed">Reaching out takes courage. Whatever you are carrying, you don't have to carry it alone. All forms of support on this page are fully confidential.</p>
          </div>
        </PageContainer>
      </div>

      <SectionWrapper className="bg-stone-50">
        <PageContainer>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2" id="anonymous">
              <AnonymousHelpForm />
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Privacy note */}
              <div className="bg-white rounded-2xl border border-teal-100 p-5">
                <div className="flex items-center gap-2 text-teal-700 font-semibold mb-3">
                  <Lock className="h-5 w-5" />
                  Your Privacy is Sacred
                </div>
                <ul className="space-y-2">
                  {["All submissions encrypted end-to-end","Anonymous mode stores zero personal data","No tracking or IP logging in anonymous mode","Your story is never shared without consent"].map(i => (
                    <li key={i} className="flex items-start gap-2 text-sm text-stone-600">
                      <CheckCircle className="h-4 w-4 text-teal-500 mt-0.5 shrink-0" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Response time */}
              <div className="bg-white rounded-2xl border border-stone-100 p-5">
                <div className="flex items-center gap-2 text-stone-700 font-semibold mb-2">
                  <Clock className="h-5 w-5 text-teal-600" />
                  Response Time
                </div>
                <p className="text-sm text-stone-500">We aim to respond to all requests within <strong className="text-stone-700">48 hours</strong>. For emergencies, please use the crisis lines below.</p>
              </div>

              {/* Crisis lines */}
              <div className="bg-red-50 border border-red-200 rounded-2xl p-5" id="emergency">
                <div className="flex items-center gap-2 text-red-700 font-semibold mb-3">
                  <AlertTriangle className="h-5 w-5" />
                  Immediate Crisis Support
                </div>
                <div className="space-y-2">
                  {CRISIS_LINES.map(line => (
                    <div key={line.country} className="text-sm">
                      <span className="font-semibold text-stone-800">{line.country}:</span>{" "}
                      <span className="text-red-700 font-bold">{line.number}</span>
                      <p className="text-xs text-stone-500">{line.organization}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </SectionWrapper>
    </>
  )
}
