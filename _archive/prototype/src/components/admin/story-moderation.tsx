"use client"

import { useState } from "react"
import { CheckCircle, XCircle, AlertTriangle, Eye, Clock, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SAMPLE_STORIES } from "@/lib/data"
import { cn } from "@/lib/utils"

const categoryLabels: Record<string, string> = {
  "adult-survivor": "Adult Survivor",
  "male-survivor": "Male Survivor",
  parent: "Parent",
  "faith-journey": "Faith Journey",
  recovery: "Recovery",
  "teen-survivor": "Teen Survivor",
  caregiver: "Caregiver",
}

type StoryStatus = "pending" | "approved" | "rejected"

interface StoryWithStatus {
  id: string
  content: string
  author_alias?: string
  category: string
  trigger_warning: boolean
  helpful_count: number
  created_at: string
  status: StoryStatus
}

export function StoryModerationPanel() {
  const [stories, setStories] = useState<StoryWithStatus[]>(
    SAMPLE_STORIES.map((s) => ({ ...s, status: "pending" as StoryStatus }))
  )
  const [filter, setFilter] = useState<StoryStatus | "all">("pending")
  const [expanded, setExpanded] = useState<string | null>(null)

  const updateStatus = (id: string, status: StoryStatus) => {
    setStories((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)))
  }

  const filtered = stories.filter((s) => filter === "all" || s.status === filter)

  const counts = {
    pending: stories.filter((s) => s.status === "pending").length,
    approved: stories.filter((s) => s.status === "approved").length,
    rejected: stories.filter((s) => s.status === "rejected").length,
  }

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(["all", "pending", "approved", "rejected"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium border transition-all",
              filter === f
                ? "bg-teal-700 text-white border-teal-700"
                : "bg-white text-stone-600 border-stone-200 hover:border-teal-300"
            )}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
            {f !== "all" && (
              <span className="ml-2 bg-white/20 text-current rounded-full px-1.5 py-0.5 text-xs">
                {counts[f as StoryStatus]}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-stone-100 p-10 text-center text-stone-400">
            <p>No stories in this category.</p>
          </div>
        )}
        {filtered.map((story) => (
          <div
            key={story.id}
            className={cn(
              "bg-white rounded-2xl border p-5 transition-all",
              story.status === "pending" && "border-amber-200",
              story.status === "approved" && "border-teal-200",
              story.status === "rejected" && "border-stone-200 opacity-60"
            )}
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="lavender">{categoryLabels[story.category] ?? story.category}</Badge>
                {story.trigger_warning && (
                  <div className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full font-medium">
                    <AlertTriangle className="h-3 w-3" />
                    Trigger Warning
                  </div>
                )}
                <span
                  className={cn(
                    "text-xs font-semibold px-2.5 py-1 rounded-full",
                    story.status === "pending" && "bg-amber-50 text-amber-700",
                    story.status === "approved" && "bg-teal-50 text-teal-700",
                    story.status === "rejected" && "bg-stone-100 text-stone-500"
                  )}
                >
                  {story.status.charAt(0).toUpperCase() + story.status.slice(1)}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-stone-400 shrink-0">
                <Clock className="h-3.5 w-3.5" />
                {story.created_at}
              </div>
            </div>

            <p className="text-stone-600 text-sm leading-relaxed mb-3 italic">
              "{expanded === story.id ? story.content : story.content.slice(0, 200) + (story.content.length > 200 ? "…" : "")}"
            </p>

            {story.content.length > 200 && (
              <button
                onClick={() => setExpanded(expanded === story.id ? null : story.id)}
                className="text-xs text-teal-700 hover:underline mb-3 flex items-center gap-1"
              >
                <Eye className="h-3.5 w-3.5" />
                {expanded === story.id ? "Show less" : "Read full story"}
              </button>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-stone-100">
              <div className="flex items-center gap-1.5 text-xs text-stone-400">
                <Heart className="h-3.5 w-3.5 text-rose-400" />
                {story.helpful_count} found helpful ·{" "}
                {story.author_alias ?? "Anonymous"}
              </div>
              {story.status === "pending" && (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateStatus(story.id, "rejected")}
                    className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                  >
                    <XCircle className="h-4 w-4" />
                    Reject
                  </Button>
                  <Button size="sm" onClick={() => updateStatus(story.id, "approved")}>
                    <CheckCircle className="h-4 w-4" />
                    Approve
                  </Button>
                </div>
              )}
              {story.status === "approved" && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateStatus(story.id, "rejected")}
                  className="text-stone-500"
                >
                  Unpublish
                </Button>
              )}
              {story.status === "rejected" && (
                <Button size="sm" variant="outline" onClick={() => updateStatus(story.id, "pending")}>
                  Restore
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
