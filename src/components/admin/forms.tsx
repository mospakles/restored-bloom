"use client"

import { useRef, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { ActionForm, SubmitButton } from "@/components/forms/form"
import { Acknowledge, ChoiceGroup, SelectField, TextArea, TextField } from "@/components/forms/fields"
import { Button } from "@/components/ui/button"
import { Notice } from "@/components/ui/misc"
import type { FormState } from "@/lib/form-state"
import { RESOURCE_CATEGORY_LABELS, PROGRAMMES, PROGRAMME_STATUS_LABELS } from "@/lib/content"
import { ROLE_LABELS } from "@/lib/permissions"

type Action = (state: FormState, formData: FormData) => Promise<FormState>

export function NoteForm({ action, enquiryId }: { action: Action; enquiryId: string }) {
  return (
    <ActionForm action={action} id="note" resetOnSuccess className="space-y-3">
      <input type="hidden" name="id" value={enquiryId} />
      <TextArea name="body" label="Add a note" rows={3} maxLength={4000} required />
      <SubmitButton size="sm" pendingLabel="Saving…">
        Add note
      </SubmitButton>
    </ActionForm>
  )
}

export function ResourceForm({
  action,
  resource,
}: {
  action: Action
  resource?: { id: string; title: string; slug: string; summary: string; body: string; category: string; reviewNote: string | null }
}) {
  return (
    <ActionForm action={action} id="resource" resetOnSuccess>
      {resource && <input type="hidden" name="id" value={resource.id} />}
      <TextField name="title" label="Title" required defaultValue={resource?.title} maxLength={160} />
      <TextField name="slug" label="URL slug" hint="Leave blank to generate from the title." defaultValue={resource?.slug} maxLength={80} />
      <SelectField name="category" label="Category" options={RESOURCE_CATEGORY_LABELS} required defaultValue={resource?.category} />
      <TextArea name="summary" label="Summary" hint="One or two sentences shown in listings." rows={2} required defaultValue={resource?.summary} maxLength={300} />
      <TextArea
        name="body"
        label="Content (Markdown)"
        hint="Use ## for headings, - for lists, **bold**, [link text](https://…). Images and raw HTML are not displayed."
        rows={16}
        defaultValue={resource?.body}
        className="font-mono"
      />
      <TextField
        name="reviewNote"
        label="Review record"
        hint="Who reviewed this for accuracy and age-appropriateness, and when. Not shown publicly."
        defaultValue={resource?.reviewNote ?? ""}
        maxLength={500}
      />
      <SubmitButton pendingLabel="Saving…">{resource ? "Save changes" : "Create draft"}</SubmitButton>
    </ActionForm>
  )
}

/** Upload goes to a dedicated route handler (permission-checked), keeping server-action body limits small. */
export function FileUpload({ resourceId }: { resourceId: string }) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [message, setMessage] = useState<{ tone: "error" | "ok"; text: string } | null>(null)
  const [pending, start] = useTransition()

  return (
    <form
      className="space-y-3"
      onSubmit={(e) => {
        e.preventDefault()
        const file = inputRef.current?.files?.[0]
        if (!file) return setMessage({ tone: "error", text: "Choose a file first." })
        if (file.size > 8 * 1024 * 1024) return setMessage({ tone: "error", text: "Files must be 8 MB or smaller." })
        const body = new FormData()
        body.set("file", file)
        start(async () => {
          const res = await fetch(`/api/admin/resources/${resourceId}/file`, { method: "POST", body })
          const json = (await res.json().catch(() => ({}))) as { error?: string }
          if (!res.ok) setMessage({ tone: "error", text: json.error ?? "Upload failed." })
          else {
            setMessage({ tone: "ok", text: "File uploaded." })
            if (inputRef.current) inputRef.current.value = ""
            router.refresh()
          }
        })
      }}
    >
      <label htmlFor="upload" className="block text-sm font-semibold text-plum-900">
        Attach a downloadable file
      </label>
      <p className="text-sm text-plum-600">PDF, PNG or JPEG, up to 8 MB. Replaces any existing file.</p>
      <input
        id="upload"
        ref={inputRef}
        type="file"
        accept="application/pdf,image/png,image/jpeg"
        className="block w-full text-sm file:mr-3 file:rounded-full file:border-0 file:bg-cream-200 file:px-4 file:py-2 file:font-semibold file:text-plum-900"
      />
      <Button type="submit" size="sm" disabled={pending}>
        {pending ? "Uploading…" : "Upload"}
      </Button>
      <p role="status" className={message?.tone === "error" ? "text-sm text-rose-700" : "text-sm text-sage-700"}>
        {message?.text}
      </p>
    </form>
  )
}

export function EventForm({
  action,
  event,
}: {
  action: Action
  event?: {
    id: string
    title: string
    slug: string
    summary: string
    description: string
    startsAt: string
    endsAt: string
    location: string
    isOnline: boolean
    audience: string | null
    capacity: number | null
    registrationOpen: boolean
  }
}) {
  return (
    <ActionForm action={action} id="event" resetOnSuccess>
      {event && <input type="hidden" name="id" value={event.id} />}
      <TextField name="title" label="Title" required defaultValue={event?.title} maxLength={160} />
      <TextField name="slug" label="URL slug" hint="Leave blank to generate from the title." defaultValue={event?.slug} maxLength={80} />
      <TextArea name="summary" label="Summary" rows={2} required defaultValue={event?.summary} maxLength={300} />
      <TextArea name="description" label="Description (Markdown)" rows={10} required defaultValue={event?.description} className="font-mono" />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField name="startsAt" label="Starts (Lagos time)" type="datetime-local" required defaultValue={event?.startsAt} />
        <TextField name="endsAt" label="Ends (Lagos time)" type="datetime-local" defaultValue={event?.endsAt} />
        <TextField name="location" label="Location" required defaultValue={event?.location} hint="Venue and area, or 'Online'" maxLength={200} />
        <TextField name="audience" label="Audience" defaultValue={event?.audience ?? ""} hint="e.g. Parents and caregivers" maxLength={160} />
        <TextField
          name="capacity"
          label="Capacity"
          type="number"
          min={1}
          defaultValue={event?.capacity ?? ""}
          hint="Leave blank for unlimited places."
        />
      </div>
      <div className="space-y-3">
        <Acknowledge name="isOnline" defaultChecked={event?.isOnline}>
          This is an online event
        </Acknowledge>
        <Acknowledge name="registrationOpen" defaultChecked={event ? event.registrationOpen : true}>
          Registration is open (only applies once the event is published)
        </Acknowledge>
      </div>
      <SubmitButton pendingLabel="Saving…">{event ? "Save changes" : "Create draft"}</SubmitButton>
    </ActionForm>
  )
}

export function PageForm({
  action,
  page,
}: {
  action: Action
  page: { slug: string; title: string; body: string; reviewed: boolean; reviewNote: string | null }
}) {
  return (
    <ActionForm action={action} id="page" resetOnSuccess>
      <input type="hidden" name="slug" value={page.slug} />
      <TextField name="title" label="Title" required defaultValue={page.title} maxLength={120} />
      <TextArea name="body" label="Content (Markdown)" rows={22} required defaultValue={page.body} className="font-mono" />
      <Notice tone="info">
        Mark this page as reviewed only after the founder and, where relevant, an appropriately qualified professional
        (legal, safeguarding or data protection) have approved the wording. Until then the public page shows a
        &ldquo;draft&rdquo; notice.
      </Notice>
      <Acknowledge name="reviewed" defaultChecked={page.reviewed}>
        This page has been reviewed and approved for publication
      </Acknowledge>
      <TextField
        name="reviewNote"
        label="Review record"
        hint="e.g. 'Approved by founder and reviewed by [adviser], 12 March 2027'"
        defaultValue={page.reviewNote ?? ""}
        maxLength={300}
      />
      <SubmitButton pendingLabel="Saving…">Save page</SubmitButton>
    </ActionForm>
  )
}

export function SupportContactForm({
  action,
  contact,
}: {
  action: Action
  contact?: {
    id: string
    name: string
    kind: string
    description: string
    phone: string | null
    website: string | null
    area: string | null
    relationship: string
    verified: boolean
    verifiedNote: string | null
    published: boolean
    sortOrder: number
  }
}) {
  return (
    <ActionForm action={action} id="contact" resetOnSuccess={!!contact}>
      {contact && <input type="hidden" name="id" value={contact.id} />}
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField name="name" label="Organisation name" required defaultValue={contact?.name} />
        <SelectField
          name="kind"
          label="Type"
          required
          defaultValue={contact?.kind}
          options={{ EMERGENCY: "Emergency", HELPLINE: "Helpline", REFERRAL: "Support / referral organisation" }}
        />
        <TextField name="phone" label="Phone" defaultValue={contact?.phone ?? ""} />
        <TextField name="website" label="Website" type="url" placeholder="https://" defaultValue={contact?.website ?? ""} />
        <TextField name="area" label="Area served" defaultValue={contact?.area ?? ""} hint="e.g. Lagos State, Nationwide" />
        <TextField name="sortOrder" label="Sort order" type="number" min={0} defaultValue={String(contact?.sortOrder ?? 0)} />
      </div>
      <TextArea name="description" label="Description" rows={3} required defaultValue={contact?.description} maxLength={600} />
      <TextField
        name="relationship"
        label="Relationship statement (shown publicly)"
        required
        defaultValue={contact?.relationship ?? "Listed for information only. Not a formal partner of Restored Bloom."}
        hint="Do not describe an organisation as a partner unless a partnership has been formally agreed."
        maxLength={200}
      />
      <Acknowledge name="verified" defaultChecked={contact?.verified}>
        The name, phone number and website have been verified directly and reviewed by the founder
      </Acknowledge>
      <TextField
        name="verifiedNote"
        label="Verification record"
        hint="How and when the details were checked, and by whom."
        defaultValue={contact?.verifiedNote ?? ""}
        maxLength={300}
      />
      <Acknowledge name="published" defaultChecked={contact?.published}>
        Show on the public Support page (requires verification)
      </Acknowledge>
      <SubmitButton pendingLabel="Saving…">{contact ? "Save changes" : "Add contact"}</SubmitButton>
    </ActionForm>
  )
}

export function SettingsForm({
  action,
  settings,
  emailConfigured,
}: {
  action: Action
  settings: {
    contactEmail: string
    contactPhone: string
    officeHours: string
    location: string
    instagram: string
    facebook: string
    x: string
    linkedin: string
    registrationNotice: string
    founderBio: string
    founderBioApproved: boolean
    newsletterEnabled: boolean
    programmeStatus: Record<string, string>
    retentionMonths: number
  }
  emailConfigured: boolean
}) {
  return (
    <ActionForm action={action} id="settings" resetOnSuccess className="space-y-10">
      <fieldset className="space-y-5">
        <legend className="mb-2 font-display text-xl text-plum-900">Public contact details</legend>
        <p className="text-sm text-plum-600">Leave a field empty to hide it. Only publish details the founder has confirmed.</p>
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField name="contactEmail" label="Contact email" type="email" defaultValue={settings.contactEmail} />
          <TextField name="contactPhone" label="Contact phone" defaultValue={settings.contactPhone} />
          <TextField name="officeHours" label="Response hours" defaultValue={settings.officeHours} hint="e.g. Weekdays, 9am–5pm" />
          <TextField name="location" label="Location" defaultValue={settings.location} />
          <TextField name="instagram" label="Instagram URL" defaultValue={settings.instagram} placeholder="https://" />
          <TextField name="facebook" label="Facebook URL" defaultValue={settings.facebook} placeholder="https://" />
          <TextField name="x" label="X (Twitter) URL" defaultValue={settings.x} placeholder="https://" />
          <TextField name="linkedin" label="LinkedIn URL" defaultValue={settings.linkedin} placeholder="https://" />
        </div>
        <TextField
          name="registrationNotice"
          label="Registration notice (footer)"
          defaultValue={settings.registrationNotice}
          hint="e.g. a CAC registration number, only once verified. Leave blank otherwise."
        />
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="mb-2 font-display text-xl text-plum-900">Founder biography</legend>
        <TextArea
          name="founderBio"
          label="Biography"
          rows={8}
          defaultValue={settings.founderBio}
          hint="Leave blank to show the draft placeholder. Separate paragraphs with a blank line. Do not list qualifications that have not been confirmed."
          maxLength={4000}
        />
        <Acknowledge name="founderBioApproved" defaultChecked={settings.founderBioApproved}>
          The founder has approved this biography (removes the draft label)
        </Acknowledge>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="mb-2 font-display text-xl text-plum-900">Programme status</legend>
        <p className="text-sm text-plum-600">Shown publicly next to each programme. Only mark a programme as running once it genuinely is.</p>
        <div className="grid gap-5 sm:grid-cols-2">
          {PROGRAMMES.map((p) => (
            <SelectField
              key={p.id}
              name={`programme:${p.id}`}
              label={p.title}
              options={PROGRAMME_STATUS_LABELS}
              defaultValue={settings.programmeStatus[p.id] ?? "planned"}
              required
            />
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="mb-2 font-display text-xl text-plum-900">Newsletter & data</legend>
        {!emailConfigured && (
          <Notice tone="warning">Email isn&apos;t configured, so the newsletter signup stays hidden even if enabled.</Notice>
        )}
        <Acknowledge name="newsletterEnabled" defaultChecked={settings.newsletterEnabled}>
          Show the newsletter signup on the website
        </Acknowledge>
        <TextField
          name="retentionMonths"
          label="Retention period (months)"
          type="number"
          min={1}
          max={120}
          required
          defaultValue={String(settings.retentionMonths)}
          hint="Closed enquiries, past event registrations and unsubscribed records older than this can be deleted from the Data retention page."
        />
      </fieldset>

      <SubmitButton pendingLabel="Saving…">Save settings</SubmitButton>
    </ActionForm>
  )
}

export function CreateUserForm({ action, emailConfigured }: { action: Action; emailConfigured: boolean }) {
  return (
    <ActionForm action={action} id="newuser" resetOnSuccess className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField name="name" label="Full name" required />
        <TextField name="email" label="Email" type="email" required />
      </div>
      <ChoiceGroup name="role" label="Role" type="radio" options={ROLE_LABELS} required columns={2} />
      <TextField
        name="password"
        label="Initial password"
        type="password"
        autoComplete="new-password"
        required={!emailConfigured}
        hint={
          emailConfigured
            ? "Optional. Leave blank to email them a link to choose their own password."
            : "Email isn't configured, so set an initial password (12+ characters) and share it securely."
        }
      />
      <SubmitButton pendingLabel="Creating…">Create user</SubmitButton>
    </ActionForm>
  )
}

export function RetentionForm({ action }: { action: Action }) {
  return (
    <ActionForm action={action} id="retention" resetOnSuccess className="space-y-4">
      <TextField name="confirm" label="Type DELETE to confirm" required autoComplete="off" />
      <SubmitButton variant="danger" pendingLabel="Deleting…">
        Delete records past the retention period
      </SubmitButton>
    </ActionForm>
  )
}

export function ChangePasswordForm({ action }: { action: Action }) {
  return (
    <ActionForm action={action} id="password" resetOnSuccess className="space-y-5">
      <TextField name="currentPassword" label="Current password" type="password" autoComplete="current-password" required />
      <TextField name="password" label="New password" type="password" autoComplete="new-password" required hint="At least 12 characters." />
      <TextField name="confirm" label="Confirm new password" type="password" autoComplete="new-password" required />
      <SubmitButton pendingLabel="Saving…">Change password</SubmitButton>
    </ActionForm>
  )
}
