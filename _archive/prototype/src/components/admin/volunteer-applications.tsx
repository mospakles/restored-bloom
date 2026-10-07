"use client"

import { useState } from "react"
import { CheckCircle, XCircle, Clock, Eye, Mail } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface VolunteerApp {
  id: string
  full_name: string
  email: string
  phone: string
  role: string
  organization?: string
  qualifications: string
  experience: string
  motivation: string
  status: "pending" | "under-review" | "approved" | "rejected"
  created_at: string
}

const MOCK_APPS: VolunteerApp[] = [
  {
    id: "1",
    full_name: "Dr. Ngozi Adeyemi",
    email: "ngozi.a@gmail.com",
    phone: "+234 801 234 5678",
    role: "therapist",
    organization: "Lagos University Teaching Hospital",
    qualifications: "PhD Clinical Psychology, Licensed Therapist CPNP, EMDR certified. 12 years experience.",
    experience: "Worked with survivors of sexual abuse at LUTH for 8 years. Specialised in trauma-focused CBT.",
    motivation: "I believe every survivor deserves accessible care. Restored Bloom fills a critical gap in Nigeria.",
    status: "pending",
    created_at: "2025-06-20",
  },
  {
    id: "2",
    full_name: "Barrister Emeka Okafor",
    email: "emeka.okafor@law.ng",
    phone: "+234 803 987 6543",
    role: "lawyer",
    organization: "Okafor & Associates",
    qualifications: "LLB, BL, 15 years practice. Specialisation in family law and sexual violence cases.",
    experience: "Represented over 40 survivors in court. Familiar with VAPP Act and CAMA.",
    motivation: "Legal knowledge should never be a barrier for a survivor seeking justice.",
    status: "under-review",
    created_at: "2025-06-18",
  },
  {
    id: "3",
    full_name: "Sister Mary Afolabi",
    email: "mary.afolabi@catholicng.org",
    phone: "+234 706 112 3344",
    role: "faith-leader",
    organization: "Catholic Archdiocese of Lagos",
    qualifications: "Certified pastoral counsellor, 20 years ministry experience, safeguarding trained.",
    experience: "Prayer support and pastoral counselling for abuse survivors within parish settings.",
    motivation: "Healing is spiritual as well as physical. I want to walk alongside survivors in their faith journey.",
    status: "approved",
    created_at: "2025-06-10",
  },
]

const roleLabels: Record<string, string> = {
  therapist: "Therapist",
  lawyer: "Lawyer",
  "faith-leader": "Faith Leader",
  counselor: "Counsellor",
  "social-worker": "Social Worker",
  "child-advocate": "Child Advocate",
  medical: "Medical",
  educator: "Educator",
  "content-writer": "Content Writer",
  "tech-volunteer": "Tech Volunteer",
}

const statusConfig = {
  pending: { label: "Pending", variant: "warning" as const },
  "under-review": { label: "Under Review", variant: "secondary" as const },
  approved: { label: "Approved", variant: "success" as const },
  rejected: { label: "Rejected", variant: "destructive" as const },
}

export function VolunteerApplicationsPanel() {
  const [apps, setApps] = useState(MOCK_APPS)
  const [expanded, setExpanded] = useState<string | null>(null)

  const updateStatus = (id: string, status: VolunteerApp["status"]) => {
    setApps((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)))
  }

  return (
    <div className="space-y-4">
      {apps.map((app) => {
        const status = statusConfig[app.status]
        const isOpen = expanded === app.id

        return (
          <div
            key={app.id}
            className={cn(
              "bg-white rounded-2xl border p-5 transition-all",
              app.status === "pending" && "border-amber-200",
              app.status === "under-review" && "border-blue-200",
              app.status === "approved" && "border-teal-200",
              app.status === "rejected" && "border-stone-200 opacity-60"
            )}
          >
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-50 rounded-full flex items-center justify-center text-teal-700 font-semibold text-sm shrink-0">
                  {app.full_name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <p className="font-bold text-stone-900">{app.full_name}</p>
                  <p className="text-xs text-stone-400">{app.organization ?? "Independent"}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="teal">{roleLabels[app.role] ?? app.role}</Badge>
                <Badge variant={status.variant}>{status.label}</Badge>
              </div>
            </div>

            {/* Contact */}
            <div className="flex flex-wrap gap-4 mb-3 text-xs text-stone-400">
              <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" />{app.email}</span>
              <span>{app.phone}</span>
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{app.created_at}</span>
            </div>

            {/* Summary */}
            <div className="space-y-2 mb-3">
              <p className="text-sm text-stone-600">
                <span className="font-semibold text-stone-700">Qualifications: </span>
                {app.qualifications}
              </p>
            </div>

            {/* Expanded details */}
            {isOpen && (
              <div className="mt-3 pt-3 border-t border-stone-100 space-y-3">
                <div>
                  <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1">Experience</p>
                  <p className="text-sm text-stone-600">{app.experience}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1">Motivation</p>
                  <p className="text-sm text-stone-600 italic">"{app.motivation}"</p>
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-stone-100">
              <button
                onClick={() => setExpanded(isOpen ? null : app.id)}
                className="text-xs text-teal-700 hover:underline flex items-center gap-1"
              >
                <Eye className="h-3.5 w-3.5" />
                {isOpen ? "Show less" : "View full application"}
              </button>

              <div className="flex gap-2">
                {app.status === "pending" && (
                  <Button size="sm" variant="outline" onClick={() => updateStatus(app.id, "under-review")}>
                    Begin Review
                  </Button>
                )}
                {(app.status === "pending" || app.status === "under-review") && (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateStatus(app.id, "rejected")}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <XCircle className="h-4 w-4" />
                      Decline
                    </Button>
                    <Button size="sm" onClick={() => updateStatus(app.id, "approved")}>
                      <CheckCircle className="h-4 w-4" />
                      Approve
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
