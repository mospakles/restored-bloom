import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { PageContainer, SectionWrapper } from "@/components/layout/section-wrapper"
import { StoryModerationPanel } from "@/components/admin/story-moderation"

export const metadata: Metadata = { title: "Admin, Story Moderation" }

export default function AdminStoriesPage() {
  return (
    <SectionWrapper className="bg-stone-50">
      <PageContainer>
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-teal-700 hover:underline mb-6">
          <ArrowLeft className="h-4 w-4" />Back to Dashboard
        </Link>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-stone-900 mb-1">Story Moderation</h1>
          <p className="text-stone-500">Review, approve, and manage submitted survivor stories.</p>
        </div>
        <StoryModerationPanel />
      </PageContainer>
    </SectionWrapper>
  )
}
