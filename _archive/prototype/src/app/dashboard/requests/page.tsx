"use client"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Copy, CheckCircle, Clock, Search } from "lucide-react"
import { PageContainer, SectionWrapper } from "@/components/layout/section-wrapper"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const REQUESTS = [
  { id: "1", ref: "HOG-A4BX9R21", category: "Sexual Abuse Support", message: "I was abused as a child and I'm struggling to cope as an adult. I've never told anyone before.", status: "responded", date: "Jun 20, 2025" },
  { id: "2", ref: "HOG-C7TY2K88", category: "Counselling Referral", message: "I would like to be connected with a trauma-informed therapist.", status: "in-review", date: "Jun 22, 2025" },
]

const statusConfig: Record<string, { label: string; variant: "success" | "warning" | "secondary" }> = {
  responded: { label: "Responded", variant: "success" },
  "in-review": { label: "In Review", variant: "warning" },
  pending: { label: "Pending", variant: "secondary" },
  closed: { label: "Closed", variant: "secondary" },
}

export default function RequestsPage() {
  const [copied, setCopied] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)

  const copyRef = (ref: string) => {
    navigator.clipboard.writeText(ref)
    setCopied(ref)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <SectionWrapper className="bg-stone-50">
      <PageContainer>
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-teal-700 hover:underline mb-6">
          <ArrowLeft className="h-4 w-4" />Back to Dashboard
        </Link>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-stone-900 mb-1">My Help Requests</h1>
            <p className="text-stone-500">Track your submitted requests using your reference codes.</p>
          </div>
          <Button asChild><Link href="/get-help">+ New Request</Link></Button>
        </div>
        <div className="space-y-4">
          {REQUESTS.map((req) => {
            const status = statusConfig[req.status]
            const isOpen = expanded === req.id
            return (
              <div key={req.id} className="bg-white rounded-2xl border border-stone-100 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => copyRef(req.ref)} className="font-mono text-sm font-bold text-stone-700 bg-stone-100 px-2.5 py-1 rounded-lg flex items-center gap-1.5 hover:bg-stone-200 transition-colors">
                      {req.ref}
                      {copied === req.ref ? <CheckCircle className="h-3.5 w-3.5 text-teal-500" /> : <Copy className="h-3.5 w-3.5 text-stone-400" />}
                    </button>
                    <Badge variant="teal">{req.category}</Badge>
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-stone-400"><Clock className="h-3.5 w-3.5" />{req.date}</span>
                </div>
                <p className="text-sm text-stone-600 italic mb-3">"{isOpen ? req.message : req.message.slice(0, 120) + (req.message.length > 120 ? "…" : "")}"</p>
                {req.message.length > 120 && (
                  <button onClick={() => setExpanded(isOpen ? null : req.id)} className="text-xs text-teal-700 hover:underline">
                    {isOpen ? "Show less" : "Read full message"}
                  </button>
                )}
              </div>
            )
          })}
        </div>
        <div className="mt-8 bg-teal-50 border border-teal-100 rounded-2xl p-5">
          <p className="text-sm text-teal-800 font-medium mb-1">Have a reference code from an anonymous request?</p>
          <p className="text-xs text-teal-600 mb-3">You can check its status without logging in at our Get Help page.</p>
          <Button variant="outline" asChild size="sm"><Link href="/get-help">Check Anonymous Request Status</Link></Button>
        </div>
      </PageContainer>
    </SectionWrapper>
  )
}
