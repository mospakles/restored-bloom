"use client"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Bell, CheckCheck, MessageSquare, BookOpen, Heart } from "lucide-react"
import { PageContainer, SectionWrapper } from "@/components/layout/section-wrapper"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const NOTIFS = [
  { id: "1", icon: MessageSquare, color: "bg-teal-50 text-teal-600", title: "Your request has been responded to", desc: "Reference HOG-A4BX9R21, We have reviewed your request and shared some resources.", time: "2 hours ago", read: false },
  { id: "2", icon: BookOpen, color: "bg-purple-50 text-purple-600", title: "New resource published: Rebuilding Trust After Betrayal", desc: "A new article in the Survivors category has been added to the library.", time: "1 day ago", read: false },
  { id: "3", icon: Heart, color: "bg-rose-50 text-rose-500", title: "Your prayer request was received", desc: "Your prayer request has been added to our prayer wall.", time: "3 days ago", read: true },
  { id: "4", icon: MessageSquare, color: "bg-teal-50 text-teal-600", title: "Request HOG-C7TY2K88 is now in review", desc: "A team member has picked up your counselling referral request.", time: "5 days ago", read: true },
]

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(NOTIFS)
  const markAllRead = () => setNotifs((prev) => prev.map((n) => ({ ...n, read: true })))
  const unread = notifs.filter((n) => !n.read).length

  return (
    <SectionWrapper className="bg-stone-50">
      <PageContainer>
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-teal-700 hover:underline mb-6">
          <ArrowLeft className="h-4 w-4" />Back to Dashboard
        </Link>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-stone-900 mb-1">Notifications</h1>
            <p className="text-stone-500">{unread} unread notification{unread !== 1 ? "s" : ""}</p>
          </div>
          {unread > 0 && (
            <Button variant="outline" size="sm" onClick={markAllRead}><CheckCheck className="h-4 w-4" />Mark all read</Button>
          )}
        </div>
        <div className="space-y-3">
          {notifs.map((n) => {
            const Icon = n.icon
            return (
              <div key={n.id} className={cn("bg-white rounded-2xl border p-5 flex items-start gap-4 transition-all", n.read ? "border-stone-100 opacity-70" : "border-teal-100 shadow-sm")}>
                {!n.read && <div className="w-2 h-2 bg-teal-500 rounded-full mt-2.5 shrink-0" aria-label="Unread" />}
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", n.color, n.read && "ml-0")}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn("text-sm font-semibold text-stone-900", n.read && "font-medium")}>{n.title}</p>
                  <p className="text-sm text-stone-500 mt-0.5 leading-relaxed">{n.desc}</p>
                  <p className="text-xs text-stone-400 mt-1.5">{n.time}</p>
                </div>
              </div>
            )
          })}
        </div>
      </PageContainer>
    </SectionWrapper>
  )
}
