import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { PageContainer, SectionWrapper } from "@/components/layout/section-wrapper"
import { VolunteerApplicationsPanel } from "@/components/admin/volunteer-applications"

export const metadata: Metadata = { title: "Admin, Volunteer Applications" }

export default function AdminVolunteersPage() {
  return (
    <SectionWrapper className="bg-stone-50">
      <PageContainer>
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-teal-700 hover:underline mb-6">
          <ArrowLeft className="h-4 w-4" />Back to Dashboard
        </Link>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-stone-900 mb-1">Volunteer Applications</h1>
          <p className="text-stone-500">Review and manage incoming volunteer applications.</p>
        </div>
        <VolunteerApplicationsPanel />
      </PageContainer>
    </SectionWrapper>
  )
}
