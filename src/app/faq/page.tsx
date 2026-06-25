import type { Metadata } from "next"
import Link from "next/link"
import { PageContainer, SectionWrapper, SectionHeader } from "@/components/layout/section-wrapper"
import { FAQAccordion } from "@/components/support/faq-accordion"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = { title: "FAQ", description: "Frequently asked questions about Restored Bloom, confidentiality, support, and who we serve." }

export default function FAQPage() {
  return (
    <>
      <div className="bg-teal-800 py-20">
        <PageContainer narrow>
          <p className="text-teal-300 text-sm font-semibold uppercase tracking-widest mb-3">Frequently Asked Questions</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">You May Be Wondering…</h1>
          <p className="text-teal-100 text-lg leading-relaxed">Common questions about our platform, confidentiality, and support services.</p>
        </PageContainer>
      </div>
      <SectionWrapper className="bg-stone-50">
        <PageContainer narrow>
          <FAQAccordion />
          <div className="mt-10 bg-white rounded-2xl border border-teal-100 p-6 text-center">
            <p className="text-stone-600 mb-4">Didn't find your answer? We're here to help.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild><Link href="/contact">Contact Us</Link></Button>
              <Button variant="outline" asChild><Link href="/get-help">Get Help Anonymously</Link></Button>
            </div>
          </div>
        </PageContainer>
      </SectionWrapper>
    </>
  )
}
