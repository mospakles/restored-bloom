"use client"

import { useState } from "react"
import { Clock, Eye, CheckCircle, MessageSquare, AlertCircle, Search, Filter } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface HelpRequest {
  id: string
  reference_code: string
  category: string
  message: string
  contact_method: string
  status: "pending" | "in-review" | "responded" | "closed"
  is_anonymous: boolean
  created_at: string
  email?: string
}

const MOCK_REQUESTS: HelpRequest[] = [
  {
    id: "1",
    reference_code: "HOG-A4BX9R21",
    category: "abuse-support",
    message: "I was abused as a child and I'm struggling to cope as an adult. I've never told anyone and I don't know where to start. I'm scared.",
    contact_method: "none",
    status: "pending",
    is_anonymous: true,
    created_at: "2025-06-22",
  },
  {
    id: "2",
    reference_code: "HOG-C7TY2K88",
    category: "counseling",
    message: "I would like to be connected with a trauma-informed therapist in Lagos who works with female survivors. I have private insurance.",
    contact_method: "email",
    status: "in-review",
    is_anonymous: false,
    email: "a**@gmail.com",
    created_at: "2025-06-21",
  },
  {
    id: "3",
    reference_code: "HOG-M2QP5N44",
    category: "emergency",
    message: "My teenage daughter has just disclosed abuse by a family friend. We are in shock. What do we do right now?",
    contact_method: "phone",
    status: "responded",
    is_anonymous: false,
    created_at: "2025-06-20",
  },
  {
    id: "4",
    reference_code: "HOG-R8LT7W36",
    category: "sexual-health",
    message: "I have questions about STI testing options available in Nigeria and what confidential clinics exist.",
    contact_method: "check-back",
    status: "responded",
    is_anonymous: true,
    created_at: "2025-06-19",
  },
]

const statusConfig = {
  pending: { label: "Pending", variant: "warning" as const, icon: Clock },
  "in-review": { label: "In Review", variant: "secondary" as const, icon: Eye },
  responded: { label: "Responded", variant: "success" as const, icon: CheckCircle },
  closed: { label: "Closed", variant: "secondary" as const, icon: CheckCircle },
}

const categoryLabels: Record<string, string> = {
  "abuse-support": "Abuse Support",
  "sexual-health": "Sexual Health",
  counseling: "Counselling",
  legal: "Legal",
  emergency: "Emergency",
  other: "Other",
}

export function RequestsManagementPanel() {
  const [requests, setRequests] = useState(MOCK_REQUESTS)
  const [filter, setFilter] = useState<string>("all")
  const [expanded, setExpanded] = useState<string | null>(null)
  const [search, setSearch] = useState("")

  const updateStatus = (id: string, status: HelpRequest["status"]) => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)))
  }

  const filtered = requests.filter((r) => {
    const matchFilter = filter === "all" || r.status === filter
    const matchSearch =
      !search ||
      r.reference_code.toLowerCase().includes(search.toLowerCase()) ||
      r.category.includes(search.toLowerCase()) ||
      r.message.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
          <input
            type="search"
            placeholder="Search by reference code, category, or message…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["all", "pending", "in-review", "responded", "closed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-3 py-2 rounded-xl text-sm font-medium border transition-all",
                filter === f
                  ? "bg-teal-700 text-white border-teal-700"
                  : "bg-white text-stone-600 border-stone-200 hover:border-teal-200"
              )}
            >
              {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1).replace("-", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Requests list */}
      <div className="space-y-3">
        {filtered.map((req) => {
          const status = statusConfig[req.status]
          const StatusIcon = status.icon
          const isOpen = expanded === req.id
          const isEmergency = req.category === "emergency"

          return (
            <div
              key={req.id}
              className={cn(
                "bg-white rounded-2xl border p-5 transition-all",
                isEmergency ? "border-red-200 bg-red-50/30" : "border-stone-100",
                isOpen && "shadow-md"
              )}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  {isEmergency && (
                    <div className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-100 px-2.5 py-1 rounded-full">
                      <AlertCircle className="h-3.5 w-3.5" />
                      URGENT
                    </div>
                  )}
                  <span className="font-mono text-sm font-bold text-stone-700 bg-stone-100 px-2.5 py-1 rounded-lg">
                    {req.reference_code}
                  </span>
                  <Badge variant={categoryLabels[req.category] === "Emergency" ? "red" : "teal"}>
                    {categoryLabels[req.category]}
                  </Badge>
                  <Badge variant={status.variant}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {status.label}
                  </Badge>
                  {req.is_anonymous && (
                    <span className="text-xs text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">Anonymous</span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-stone-400">
                  <Clock className="h-3.5 w-3.5" />
                  {req.created_at}
                </div>
              </div>

              <p className="text-stone-600 text-sm leading-relaxed mt-3 italic">
                "{isOpen ? req.message : req.message.slice(0, 150) + (req.message.length > 150 ? "…" : "")}"
              </p>

              {req.message.length > 150 && (
                <button
                  onClick={() => setExpanded(isOpen ? null : req.id)}
                  className="text-xs text-teal-700 hover:underline mt-2"
                >
                  {isOpen ? "Show less" : "Read full message"}
                </button>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-stone-100">
                <div className="text-xs text-stone-400">
                  Contact: <span className="font-medium text-stone-600">{req.contact_method === "none" ? "No response needed" : req.contact_method}</span>
                  {req.email && <span> · {req.email}</span>}
                </div>
                <div className="flex gap-2">
                  {req.status === "pending" && (
                    <Button size="sm" variant="outline" onClick={() => updateStatus(req.id, "in-review")}>
                      Mark In Review
                    </Button>
                  )}
                  {req.status === "in-review" && (
                    <Button size="sm" onClick={() => updateStatus(req.id, "responded")}>
                      <MessageSquare className="h-3.5 w-3.5" />
                      Mark Responded
                    </Button>
                  )}
                  {req.status === "responded" && (
                    <Button size="sm" variant="outline" onClick={() => updateStatus(req.id, "closed")}>
                      Close Request
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-stone-400 bg-white rounded-2xl border border-stone-100">
            <Search className="h-8 w-8 mx-auto mb-2 opacity-40" />
            <p>No requests match your filter.</p>
          </div>
        )}
      </div>
    </div>
  )
}
