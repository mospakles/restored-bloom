import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Save } from "lucide-react"
import { PageContainer, SectionWrapper } from "@/components/layout/section-wrapper"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = { title: "Admin, Settings" }

export default function AdminSettingsPage() {
  return (
    <SectionWrapper className="bg-stone-50">
      <PageContainer narrow>
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-teal-700 hover:underline mb-6">
          <ArrowLeft className="h-4 w-4" />Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-stone-900 mb-8">Platform Settings</h1>
        <div className="space-y-6">
          {[
            { section: "General", fields: [{ label: "Platform Name", value: "Restored Bloom" }, { label: "Support Email", value: "support@havenofgrace.org" }, { label: "Emergency Email", value: "crisis@havenofgrace.org" }] },
            { section: "Moderation", fields: [{ label: "Story Review Mode", value: "Manual approval required" }, { label: "Help Request Notify Email", value: "admin@havenofgrace.org" }] },
          ].map(({ section, fields }) => (
            <div key={section} className="bg-white rounded-2xl border border-stone-100 p-6">
              <h2 className="font-bold text-stone-900 mb-4 text-lg">{section}</h2>
              <div className="space-y-4">
                {fields.map(({ label, value }) => (
                  <div key={label}>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">{label}</label>
                    <input defaultValue={value} className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
                  </div>
                ))}
              </div>
            </div>
          ))}
          <Button size="lg"><Save className="h-4 w-4" />Save Settings</Button>
        </div>
      </PageContainer>
    </SectionWrapper>
  )
}
