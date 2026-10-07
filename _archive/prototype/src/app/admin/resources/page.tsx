import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Plus, Clock, Eye } from "lucide-react"
import { PageContainer, SectionWrapper } from "@/components/layout/section-wrapper"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SAMPLE_RESOURCES } from "@/lib/data"

export const metadata: Metadata = { title: "Admin, Resource Management" }

const categoryColors: Record<string, "teal" | "lavender" | "blush" | "sage"> = {
  survivors: "teal", faith: "lavender", parents: "blush", teenagers: "sage", women: "lavender",
}

export default function AdminResourcesPage() {
  return (
    <SectionWrapper className="bg-stone-50">
      <PageContainer>
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-teal-700 hover:underline mb-6">
          <ArrowLeft className="h-4 w-4" />Back to Dashboard
        </Link>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-stone-900 mb-1">Resource Management</h1>
            <p className="text-stone-500">Publish, edit, and manage healing library resources.</p>
          </div>
          <Button><Plus className="h-4 w-4" />Add Resource</Button>
        </div>
        <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-stone-100">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider">Title</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider hidden md:table-cell">Category</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider hidden lg:table-cell">Read Time</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider">Status</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {SAMPLE_RESOURCES.map((resource) => (
                <tr key={resource.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-medium text-stone-900">{resource.title}</p>
                    <p className="text-xs text-stone-400 mt-0.5 hidden sm:block">{resource.excerpt.slice(0, 60)}…</p>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <Badge variant={categoryColors[resource.category] ?? "teal"} className="capitalize">{resource.category}</Badge>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    {resource.read_time && (
                      <span className="flex items-center gap-1 text-stone-500 text-xs"><Clock className="h-3.5 w-3.5" />{resource.read_time} min</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${resource.published ? "bg-teal-50 text-teal-700" : "bg-stone-100 text-stone-500"}`}>
                      {resource.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <Link href={`/resources/${resource.slug}`} className="text-teal-700 hover:underline text-xs flex items-center gap-1">
                      <Eye className="h-3.5 w-3.5" />View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageContainer>
    </SectionWrapper>
  )
}
