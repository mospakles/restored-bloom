import type { Metadata } from "next"
import { AdminHeader, Panel } from "@/components/admin/ui"
import { RetentionForm } from "@/components/admin/forms"
import { formatDate } from "@/lib/utils"
import { requirePagePermission } from "@/server/session"
import { retentionPreview } from "@/server/operations"
import { runRetentionAction } from "../actions"

export const metadata: Metadata = { title: "Data retention" }

export default async function DataPage() {
  const actor = await requirePagePermission("retention:manage")
  const p = await retentionPreview(actor)
  return (
    <>
      <AdminHeader
        title="Data retention"
        description={`Retention period: ${p.retentionMonths} months (change in Site settings). Records older than ${formatDate(p.cutoff)} are eligible for deletion.`}
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Eligible for deletion now">
          <ul className="space-y-2 text-plum-800">
            <li>
              <strong>{p.enquiries}</strong> closed enquiries (closed before the cutoff), with their notes
            </li>
            <li>
              <strong>{p.registrations}</strong> registrations for events that took place before the cutoff
            </li>
            <li>
              <strong>{p.subscribers}</strong> unsubscribed records past the cutoff, or signups never confirmed within a month
            </li>
          </ul>
        </Panel>
        <Panel title="Run deletion">
          <p className="mb-4 text-sm text-plum-700">
            Deletion is permanent and is recorded in the audit log. To delete a single person&apos;s data on request,
            delete their enquiry or subscriber record directly.
          </p>
          <RetentionForm action={runRetentionAction} />
        </Panel>
      </div>
    </>
  )
}
