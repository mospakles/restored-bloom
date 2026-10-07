"use client"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Clock, BookmarkX, ArrowRight } from "lucide-react"
import { PageContainer, SectionWrapper } from "@/components/layout/section-wrapper"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SAMPLE_RESOURCES } from "@/lib/data"

const categoryColors: Record<string, "teal" | "lavender" | "blush" | "sage"> = {
  survivors: "teal", faith: "lavender", parents: "blush", teenagers: "sage", women: "lavender",
}

export default function SavedResourcesPage() {
  const [saved, setSaved] = useState(SAMPLE_RESOURCES.slice(0, 4))
  const remove = (id: string) => setSaved((prev) => prev.filter((r) => r.id !== id))

  return (
    <SectionWrapper className="bg-stone-50">
      <PageContainer>
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-teal-700 hover:underline mb-6">
          <ArrowLeft className="h-4 w-4" />Back to Dashboard
        </Link>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-stone-900 mb-1">Saved Resources</h1>
            <p className="text-stone-500">{saved.length} resource{saved.length !== 1 ? "s" : ""} bookmarked</p>
          </div>
          <Button variant="outline" asChild><Link href="/resources">Browse More</Link></Button>
        </div>
        {saved.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-100 p-12 text-center">
            <p className="text-stone-400 mb-4">You haven't saved any resources yet.</p>
            <Button asChild><Link href="/resources">Browse Resources</Link></Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {saved.map((resource) => (
              <div key={resource.id} className="bg-white rounded-2xl border border-stone-100 p-5 group">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <Badge variant={categoryColors[resource.category] ?? "teal"} className="capitalize">{resource.category}</Badge>
                  <button onClick={() => remove(resource.id)} className="text-stone-300 hover:text-red-400 transition-colors" aria-label="Remove bookmark">
                    <BookmarkX className="h-5 w-5" />
                  </button>
                </div>
                <h3 className="font-bold text-stone-900 mb-2 leading-snug group-hover:text-teal-700 transition-colors">{resource.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed mb-4 line-clamp-2">{resource.excerpt}</p>
                {resource.read_time && (
                  <div className="flex items-center gap-1 text-xs text-stone-400 mb-3"><Clock className="h-3.5 w-3.5" />{resource.read_time} min read</div>
                )}
                <Link href={`/resources/${resource.slug}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:gap-2.5 transition-all">
                  Read article <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </PageContainer>
    </SectionWrapper>
  )
}
