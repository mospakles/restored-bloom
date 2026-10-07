import type { Metadata } from "next"
import { PageContainer, SectionWrapper } from "@/components/layout/section-wrapper"
import { ResourceSearch } from "@/components/support/resource-search"
import { CounselorDirectory } from "@/components/support/counselor-directory"

export const metadata: Metadata = {
  title: "Resource Library",
  description: "Browse our healing library, guides for survivors, parents, teenagers, women, and people of faith.",
}

export default function ResourcesPage() {
  return (
    <>
      <div className="bg-teal-800 py-20">
        <PageContainer>
          <div className="max-w-2xl">
            <p className="text-teal-300 text-sm font-semibold uppercase tracking-widest mb-3">Healing Library</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">Resources for Every Story</h1>
            <p className="text-teal-100 text-lg leading-relaxed">Practical, hope-filled guides for survivors, parents, teenagers, women, and those on a faith journey.</p>
          </div>
        </PageContainer>
      </div>

      <SectionWrapper className="bg-stone-50">
        <PageContainer>
          {/* Tab headings */}
          <div className="flex gap-1 bg-white border border-stone-200 rounded-2xl p-1 mb-8 w-fit">
            <span className="px-5 py-2 rounded-xl bg-teal-700 text-white text-sm font-medium">Articles & Guides</span>
            <a href="#counselors" className="px-5 py-2 rounded-xl text-stone-600 hover:bg-stone-50 text-sm font-medium transition-colors">Counsellor Directory</a>
          </div>
          <ResourceSearch />
        </PageContainer>
      </SectionWrapper>

      <SectionWrapper className="bg-white" id="counselors">
        <PageContainer>
          <div className="mb-10">
            <p className="text-sm font-semibold text-teal-700 uppercase tracking-widest mb-3">Counsellor Directory</p>
            <h2 className="text-3xl font-bold text-stone-900 mb-3">Find a Qualified Counsellor</h2>
            <p className="text-stone-500 max-w-2xl">All counsellors and therapists in our directory are vetted, trauma-informed professionals. Use the filters to find someone who fits your needs.</p>
          </div>
          <CounselorDirectory />
        </PageContainer>
      </SectionWrapper>
    </>
  )
}
