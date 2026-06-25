import type { Metadata } from "next"
import { PageContainer, SectionWrapper } from "@/components/layout/section-wrapper"

export const metadata: Metadata = { title: "Terms", description: "Restored Bloom Terms policy and information." }

export default function PolicyPage() {
  return (
    <>
      <div className="bg-stone-800 py-16">
        <PageContainer narrow>
          <h1 className="text-3xl md:text-4xl font-bold text-white">Terms</h1>
          <p className="text-stone-400 mt-3">Last updated: June 2025</p>
        </PageContainer>
      </div>
      <SectionWrapper className="bg-white">
        <PageContainer narrow>
          <div className="prose prose-stone max-w-none">
            <p className="text-lg text-stone-600 leading-relaxed mb-6">
              Restored Bloom is committed to the highest standards of safety, privacy, and ethical conduct. This document outlines our policies and commitments in this area.
            </p>
            <h2 className="text-2xl font-bold text-stone-900 mt-8 mb-4">Overview</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              As a nonprofit organisation serving survivors of sexual abuse and individuals navigating sensitive health challenges, we take our responsibilities extremely seriously. Every policy we maintain is designed to protect the people who come to us for help.
            </p>
            <h2 className="text-2xl font-bold text-stone-900 mt-8 mb-4">Our Commitments</h2>
            <ul className="space-y-3 text-stone-600">
              <li>We will never share your personal information without your explicit consent.</li>
              <li>All data is stored securely and accessed only by authorised personnel.</li>
              <li>Anonymous submissions are processed without storing identifying information.</li>
              <li>We comply with applicable data protection laws including NDPR (Nigeria) and GDPR principles.</li>
              <li>We maintain a zero-tolerance policy for any exploitation or misuse of the platform.</li>
            </ul>
            <h2 className="text-2xl font-bold text-stone-900 mt-8 mb-4">Contact</h2>
            <p className="text-stone-600">For questions about this policy, contact us at <a href="mailto:support@havenofgrace.org" className="text-teal-700 underline">support@havenofgrace.org</a></p>
          </div>
        </PageContainer>
      </SectionWrapper>
    </>
  )
}
