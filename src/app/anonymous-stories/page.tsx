import type { Metadata } from "next"
import { AlertTriangle, Heart } from "lucide-react"
import { PageContainer, SectionWrapper, SectionHeader } from "@/components/layout/section-wrapper"
import { Badge } from "@/components/ui/badge"
import { StorySubmissionForm } from "@/components/support/story-submission-form"
import { SAMPLE_STORIES } from "@/lib/data"

export const metadata: Metadata = { title: "Anonymous Story Wall", description: "Read and share anonymous stories from survivors. You are not alone." }

const categoryLabels: Record<string, string> = {
  "adult-survivor": "Adult Survivor", "male-survivor": "Male Survivor",
  parent: "Parent", "faith-journey": "Faith Journey", recovery: "Recovery",
}

export default function AnonymousStoriesPage() {
  return (
    <>
      <div className="bg-purple-800 py-20">
        <PageContainer>
          <div className="max-w-2xl">
            <p className="text-purple-300 text-sm font-semibold uppercase tracking-widest mb-3">Anonymous Story Wall</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">You Are Not Alone</h1>
            <p className="text-purple-100 text-lg leading-relaxed">Stories shared anonymously by survivors and those on their healing journey. Each one is a reminder that hope is possible, and that your story matters.</p>
          </div>
        </PageContainer>
      </div>

      <SectionWrapper className="bg-stone-50">
        <PageContainer>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-8 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-amber-800 text-sm">Content Warning</p>
              <p className="text-amber-700 text-sm">Some stories on this page contain descriptions of abuse and trauma. Stories with a trigger warning are clearly marked. Please read at your own pace and care for yourself.</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {SAMPLE_STORIES.map(story => (
              <article key={story.id} className="bg-white rounded-2xl border border-purple-100 p-6 flex flex-col">
                {story.trigger_warning && (
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 bg-amber-50 rounded-lg px-3 py-1.5 mb-3 w-fit">
                    <AlertTriangle className="h-3.5 w-3.5" />Trigger Warning
                  </div>
                )}
                <Badge variant="lavender" className="w-fit mb-4">{categoryLabels[story.category] ?? story.category}</Badge>
                <blockquote className="flex-1 text-stone-700 leading-relaxed italic text-sm mb-5">
                  "{story.content}"
                </blockquote>
                <div className="flex items-center justify-between pt-4 border-t border-stone-100 mt-auto">
                  <span className="text-xs text-stone-400">{story.author_alias ?? "Anonymous"}</span>
                  <div className="flex items-center gap-1.5 text-xs text-stone-400">
                    <Heart className="h-3.5 w-3.5 text-rose-400" />
                    {story.helpful_count} found this helpful
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Submission form */}
          <div id="submit" className="max-w-2xl mx-auto">
            <SectionHeader
              eyebrow="Your Voice Matters"
              title="Share Your Story"
              subtitle="Your experience could be the lifeline someone else needs. All submissions are anonymous by default and reviewed before publication."
              centered
            />
            <StorySubmissionForm />
          </div>
        </PageContainer>
      </SectionWrapper>
    </>
  )
}
