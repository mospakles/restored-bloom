import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { AdminHeader, Panel, StatusBadge } from "@/components/admin/ui"
import { InlineAction, SelectAction } from "@/components/admin/inline-action"
import { NoteForm } from "@/components/admin/forms"
import {
  describeDetails,
  ENQUIRY_STATUS_LABELS,
  ENQUIRY_STATUSES,
  ENQUIRY_TYPE_LABELS,
  organisationLabel,
} from "@/lib/enquiry-display"
import { can } from "@/lib/permissions"
import { formatDateTime } from "@/lib/utils"
import { NotFoundError } from "@/server/actor"
import { requirePagePermission } from "@/server/session"
import { assignableStaff, getEnquiry } from "@/server/enquiries"
import { addNoteAction, assignEnquiryAction, deleteEnquiryAction, setEnquiryStatusAction } from "../../actions"

export const metadata: Metadata = { title: "Enquiry" }

export default async function EnquiryPage({ params }: { params: Promise<{ id: string }> }) {
  const actor = await requirePagePermission("enquiries:read")
  const { id } = await params
  const enquiry = await getEnquiry(actor, id).catch((e) => {
    if (e instanceof NotFoundError) notFound()
    throw e
  })
  const staff = await assignableStaff()
  const canUpdate = can(actor.role, "enquiries:update")
  const details = describeDetails(enquiry.type, enquiry.details)

  const rows: { label: string; value: React.ReactNode }[] = [
    { label: "Name", value: enquiry.name },
    ...(enquiry.organisation ? [{ label: organisationLabel(enquiry.type), value: enquiry.organisation }] : []),
    { label: "Email", value: <a href={`mailto:${enquiry.email}`} className="text-rose-700 underline underline-offset-2">{enquiry.email}</a> },
    ...(enquiry.phone ? [{ label: "Phone", value: <a href={`tel:${enquiry.phone}`} className="text-rose-700 underline underline-offset-2">{enquiry.phone}</a> }] : []),
    ...details,
  ]

  return (
    <>
      <AdminHeader
        back={{ href: "/admin/enquiries", label: "All enquiries" }}
        title={enquiry.organisation || enquiry.name}
        description={
          <span className="flex flex-wrap items-center gap-2">
            <span className="font-mono">{enquiry.reference}</span> · {ENQUIRY_TYPE_LABELS[enquiry.type]} · received{" "}
            {formatDateTime(enquiry.createdAt)}
            <StatusBadge status={enquiry.status} label={ENQUIRY_STATUS_LABELS[enquiry.status]} />
          </span>
        }
      />
      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <div className="space-y-6">
          <Panel title="Submission">
            <dl className="grid gap-x-6 gap-y-4 sm:grid-cols-[12rem_1fr]">
              {rows.map((r) => (
                <div key={r.label} className="contents">
                  <dt className="text-sm font-semibold text-plum-600">{r.label}</dt>
                  <dd className="break-words text-plum-900">{r.value}</dd>
                </div>
              ))}
            </dl>
            {enquiry.message && (
              <div className="mt-6 border-t border-cream-200 pt-5">
                <h3 className="text-sm font-semibold text-plum-600">Message</h3>
                <p className="mt-2 whitespace-pre-wrap break-words leading-relaxed text-plum-900">{enquiry.message}</p>
              </div>
            )}
            <p className="mt-6 border-t border-cream-200 pt-4 text-xs text-plum-600">
              Privacy consent recorded {formatDateTime(enquiry.consentAt)} (notice version {enquiry.consentVersion}).
            </p>
          </Panel>

          {can(actor.role, "notes:read") && (
            <Panel title="Internal notes">
              <p className="mb-4 text-sm text-plum-600">
                Visible only to staff with enquiry access. Keep notes factual and operational; do not record
                safeguarding case details here.
              </p>
              {enquiry.notes && enquiry.notes.length > 0 ? (
                <ol className="mb-6 space-y-4">
                  {enquiry.notes.map((n) => (
                    <li key={n.id} className="rounded-xl bg-cream-100 p-4">
                      <p className="whitespace-pre-wrap break-words text-plum-900">{n.body}</p>
                      <p className="mt-2 text-xs text-plum-600">
                        {n.author?.name ?? "Former user"} · {formatDateTime(n.createdAt)}
                      </p>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="mb-6 text-plum-700">No notes yet.</p>
              )}
              {can(actor.role, "notes:write") && <NoteForm action={addNoteAction} enquiryId={enquiry.id} />}
            </Panel>
          )}
        </div>

        <div className="space-y-6">
          {canUpdate && (
            <Panel title="Manage">
              <div className="space-y-5">
                <SelectAction
                  action={setEnquiryStatusAction}
                  fields={{ id: enquiry.id }}
                  name="status"
                  label="Status"
                  value={enquiry.status}
                  options={ENQUIRY_STATUSES.map((s) => ({ value: s, label: ENQUIRY_STATUS_LABELS[s] }))}
                />
                <SelectAction
                  action={assignEnquiryAction}
                  fields={{ id: enquiry.id }}
                  name="assigneeId"
                  label="Assigned to"
                  value={enquiry.assignedToId ?? ""}
                  options={[{ value: "", label: "Unassigned" }, ...staff.map((s) => ({ value: s.id, label: s.name }))]}
                />
              </div>
            </Panel>
          )}
          {enquiry.type === "VOLUNTEER" && (
            <Panel title="Volunteer screening reminder">
              <p className="text-sm leading-relaxed text-plum-800">
                An &ldquo;Approved&rdquo; status here records an internal decision only. Screening, references and any
                checks required before working with children must be completed and recorded through your separate
                safeguarding process.
              </p>
            </Panel>
          )}
          {can(actor.role, "enquiries:delete") && (
            <Panel title="Delete">
              <p className="mb-3 text-sm text-plum-700">Permanently deletes this enquiry and its notes. This is recorded in the audit log.</p>
              <InlineAction
                action={deleteEnquiryAction}
                fields={{ id: enquiry.id }}
                label="Delete enquiry"
                variant="danger"
                confirm={`Permanently delete enquiry ${enquiry.reference}? This cannot be undone.`}
              />
            </Panel>
          )}
        </div>
      </div>
    </>
  )
}
