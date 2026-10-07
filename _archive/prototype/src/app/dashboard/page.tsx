import type { Metadata } from "next"
import Link from "next/link"
import { FileText, BookmarkCheck, Bell, User, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { PageContainer, SectionWrapper } from "@/components/layout/section-wrapper"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = { title: "Dashboard", description: "Manage your Restored Bloom account, requests, and saved resources." }

const recentRequests = [
  { id: "HOG-A4BX9R21", category: "Abuse Support", status: "responded", date: "Jun 20, 2025" },
  { id: "HOG-C7TY2K88", category: "Counselling", status: "in-review", date: "Jun 22, 2025" },
]

const savedResources = [
  { title: "Understanding Your Trauma Response", category: "Survivors" },
  { title: "When Faith Meets Pain", category: "Faith" },
]

const statusConfig: Record<string, { label: string; variant: "success" | "warning" | "secondary" }> = {
  responded: { label: "Responded", variant: "success" },
  "in-review": { label: "In Review", variant: "warning" },
  pending: { label: "Pending", variant: "secondary" },
}

export default function DashboardPage() {
  return (
    <SectionWrapper className="bg-stone-50">
      <PageContainer>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-stone-900 mb-1">Welcome back</h1>
          <p className="text-stone-500">Manage your requests, saved resources, and account settings.</p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Open Requests", value: "2", icon: FileText, color: "bg-teal-50 text-teal-700" },
            { label: "Saved Resources", value: "4", icon: BookmarkCheck, color: "bg-purple-50 text-purple-700" },
            { label: "Notifications", value: "1", icon: Bell, color: "bg-amber-50 text-amber-700" },
            { label: "Profile Complete", value: "80%", icon: User, color: "bg-green-50 text-green-700" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-2xl border border-stone-100 p-5 flex items-center gap-4">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-stone-900">{value}</p>
                <p className="text-xs text-stone-400">{label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Requests */}
          <div className="bg-white rounded-2xl border border-stone-100 shadow-sm">
            <div className="p-5 border-b border-stone-100 flex items-center justify-between">
              <h2 className="font-bold text-stone-900">Recent Help Requests</h2>
              <Link href="/dashboard/requests" className="text-sm text-teal-700 hover:underline">View all</Link>
            </div>
            <div className="p-5 space-y-4">
              {recentRequests.map(req => {
                const status = statusConfig[req.status]
                return (
                  <div key={req.id} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-stone-50">
                    <div>
                      <p className="text-sm font-semibold text-stone-800">{req.category}</p>
                      <p className="text-xs text-stone-400 font-mono">{req.id}</p>
                      <div className="flex items-center gap-1 text-xs text-stone-400 mt-0.5"><Clock className="h-3 w-3" />{req.date}</div>
                    </div>
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </div>
                )
              })}
              <Button variant="outline" asChild className="w-full">
                <Link href="/get-help">+ New Request</Link>
              </Button>
            </div>
          </div>

          {/* Saved Resources */}
          <div className="bg-white rounded-2xl border border-stone-100 shadow-sm">
            <div className="p-5 border-b border-stone-100 flex items-center justify-between">
              <h2 className="font-bold text-stone-900">Saved Resources</h2>
              <Link href="/dashboard/saved" className="text-sm text-teal-700 hover:underline">View all</Link>
            </div>
            <div className="p-5 space-y-3">
              {savedResources.map(r => (
                <div key={r.title} className="p-3 rounded-xl bg-stone-50 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-stone-800">{r.title}</p>
                    <p className="text-xs text-stone-400">{r.category}</p>
                  </div>
                  <Link href="/resources" className="text-xs text-teal-700 font-medium hover:underline">Read</Link>
                </div>
              ))}
              <Button variant="outline" asChild className="w-full">
                <Link href="/resources">Browse Resources</Link>
              </Button>
            </div>
          </div>
        </div>
      </PageContainer>
    </SectionWrapper>
  )
}
