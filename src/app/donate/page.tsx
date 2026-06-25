import type { Metadata } from "next"
import Link from "next/link"
import { Heart, CheckCircle } from "lucide-react"
import { PageContainer, SectionWrapper, SectionHeader } from "@/components/layout/section-wrapper"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = { title: "Donate", description: "Support Restored Bloom with a donation and help fund free support for survivors." }

const impacts = [
  { amount: "₦5,000", impact: "Provides one session of crisis counselling for a survivor" },
  { amount: "₦15,000", impact: "Funds three months of resource library maintenance" },
  { amount: "₦50,000", impact: "Supports a full month of anonymous help request management" },
  { amount: "₦100,000", impact: "Funds a full training for one volunteer counsellor" },
]

export default function DonatePage() {
  return (
    <>
      <div className="bg-rose-800 py-20">
        <PageContainer narrow>
          <p className="text-rose-300 text-sm font-semibold uppercase tracking-widest mb-3">Make a Difference</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">Support Survivors Today</h1>
          <p className="text-rose-100 text-lg leading-relaxed">Every donation directly funds free counselling, resource development, and crisis support for survivors who cannot afford care.</p>
        </PageContainer>
      </div>
      <SectionWrapper className="bg-stone-50">
        <PageContainer>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <SectionHeader eyebrow="Your Impact" title="What Your Gift Funds" />
              <div className="space-y-4">
                {impacts.map(({ amount, impact }) => (
                  <div key={amount} className="bg-white rounded-2xl border border-stone-100 p-5 flex items-start gap-4">
                    <div className="w-16 h-10 bg-rose-50 rounded-xl flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-rose-700">{amount}</span>
                    </div>
                    <p className="text-stone-600 text-sm leading-relaxed">{impact}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-3xl border border-stone-100 shadow-sm p-8">
              <h2 className="text-2xl font-bold text-stone-900 mb-6">Choose Your Gift</h2>
              <div className="grid grid-cols-2 gap-3 mb-5">
                {["₦5,000", "₦15,000", "₦50,000", "₦100,000"].map(amount => (
                  <button key={amount} className="border-2 border-stone-200 hover:border-teal-600 hover:bg-teal-50 text-stone-700 hover:text-teal-700 rounded-xl py-3 text-sm font-semibold transition-all">{amount}</button>
                ))}
              </div>
              <input type="text" placeholder="Or enter custom amount (₦)" className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm mb-5 focus:outline-none focus:ring-2 focus:ring-teal-500" />
              <Button className="w-full bg-rose-700 hover:bg-rose-800" size="lg">
                <Heart className="h-4 w-4" />Donate Now
              </Button>
              <p className="text-xs text-stone-400 text-center mt-3">Secure payment · Tax-deductible receipt issued</p>
              <div className="mt-5 space-y-2">
                {["100% goes to survivor support programs","Registered non-profit organisation","Annual impact report published","Full financial transparency"].map(i => (
                  <div key={i} className="flex items-center gap-2 text-xs text-stone-500"><CheckCircle className="h-3.5 w-3.5 text-teal-500 shrink-0" />{i}</div>
                ))}
              </div>
            </div>
          </div>
        </PageContainer>
      </SectionWrapper>
    </>
  )
}
