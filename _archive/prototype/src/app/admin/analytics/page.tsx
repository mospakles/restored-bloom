import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { PageContainer, SectionWrapper } from "@/components/layout/section-wrapper"
import { AnalyticsDashboard } from "@/components/admin/analytics-dashboard"

export const metadata: Metadata = { title: "Admin, Analytics" }

export default function AdminAnalyticsPage() {
  return (
    <SectionWrapper className="bg-stone-50">
      <PageContainer>
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-teal-700 hover:underline mb-6">
          <ArrowLeft className="h-4 w-4" />Back to Dashboard
        </Link>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-stone-900 mb-1">Analytics</h1>
          <p className="text-stone-500">Platform usage, impact metrics, and engagement data.</p>
        </div>
        <AnalyticsDashboard />
      </PageContainer>
    </SectionWrapper>
  )
}
