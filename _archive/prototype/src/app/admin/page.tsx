import type { Metadata } from "next"
import Link from "next/link"
import { Users, FileText, BookOpen, Briefcase, BarChart2, Settings, AlertCircle, CheckCircle, Clock } from "lucide-react"
import { PageContainer, SectionWrapper } from "@/components/layout/section-wrapper"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = { title: "Admin Dashboard", description: "Restored Bloom administration panel." }

const stats = [
  { label: "Total Users", value: "1,248", change: "+12 this week", icon: Users, color: "bg-teal-50 text-teal-700" },
  { label: "Pending Requests", value: "34", change: "8 urgent", icon: FileText, color: "bg-amber-50 text-amber-700" },
  { label: "Stories Pending Review", value: "12", change: "3 flagged", icon: BookOpen, color: "bg-purple-50 text-purple-700" },
  { label: "Volunteer Applications", value: "7", change: "2 new today", icon: Briefcase, color: "bg-blue-50 text-blue-700" },
]

const adminLinks = [
  { label: "User Management", href: "/admin/users", icon: Users, desc: "View, manage, and moderate user accounts" },
  { label: "Story Moderation", href: "/admin/stories", icon: BookOpen, desc: "Review and approve submitted stories" },
  { label: "Help Requests", href: "/admin/resources", icon: FileText, desc: "Manage anonymous help requests" },
  { label: "Volunteer Applications", href: "/admin/volunteers", icon: Briefcase, desc: "Review and approve volunteer applications" },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart2, desc: "Platform usage and impact metrics" },
  { label: "Settings", href: "/admin/settings", icon: Settings, desc: "Platform configuration and policies" },
]

const recentActivity = [
  { text: "New help request submitted", time: "5 mins ago", type: "request" },
  { text: "Story #48 approved for publication", time: "22 mins ago", type: "story" },
  { text: "Volunteer application from Dr. Amaka Obi", time: "1 hour ago", type: "volunteer" },
  { text: "User account flagged for review", time: "3 hours ago", type: "alert" },
]

export default function AdminDashboardPage() {
  return (
    <SectionWrapper className="bg-stone-50">
      <PageContainer>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-stone-900 mb-1">Admin Dashboard</h1>
          <p className="text-stone-500">Restored Bloom platform administration</p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map(({ label, value, change, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-2xl border border-stone-100 p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}><Icon className="h-5 w-5" /></div>
              </div>
              <p className="text-2xl font-bold text-stone-900 mb-0.5">{value}</p>
              <p className="text-sm text-stone-500">{label}</p>
              <p className="text-xs text-stone-400 mt-1">{change}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Admin Links */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
            {adminLinks.map(({ label, href, icon: Icon, desc }) => (
              <Link key={href} href={href} className="bg-white rounded-2xl border border-stone-100 p-5 hover:border-teal-200 hover:shadow-sm transition-all group">
                <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center mb-3 group-hover:bg-teal-100 transition-colors">
                  <Icon className="h-5 w-5 text-teal-700" />
                </div>
                <h3 className="font-bold text-stone-900 mb-1 group-hover:text-teal-700 transition-colors">{label}</h3>
                <p className="text-sm text-stone-500">{desc}</p>
              </Link>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl border border-stone-100 shadow-sm">
            <div className="p-5 border-b border-stone-100">
              <h2 className="font-bold text-stone-900">Recent Activity</h2>
            </div>
            <div className="p-5 space-y-4">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${item.type === "alert" ? "bg-red-400" : item.type === "request" ? "bg-amber-400" : "bg-teal-400"}`} />
                  <div>
                    <p className="text-sm text-stone-700">{item.text}</p>
                    <p className="text-xs text-stone-400 flex items-center gap-1 mt-0.5"><Clock className="h-3 w-3" />{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageContainer>
    </SectionWrapper>
  )
}
