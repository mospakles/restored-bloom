"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { echoValues, type FormState } from "@/lib/form-state"
import { formDataToObject, type FieldErrors } from "@/lib/validation"
import { ForbiddenError, NotFoundError } from "@/server/actor"
import { requireActor } from "@/server/session"
import { addNote, assignEnquiry, deleteEnquiry, updateEnquiryStatus } from "@/server/enquiries"
import { deleteResource, removeResourceFile, saveResource, setResourceStatus } from "@/server/resources"
import { deleteEvent, saveEvent, setEventStatus, setRegistrationStatus } from "@/server/events"
import { deleteSupportContact, savePage, saveSupportContact } from "@/server/pages"
import { deleteSubscriber } from "@/server/newsletter"
import { updateSettings } from "@/server/settings"
import { createStaffUser, updateStaffUser } from "@/server/users"
import { runRetention } from "@/server/operations"
import { flattenErrors } from "@/lib/validation"

type Result = { message?: string; errors?: FieldErrors } | void

/**
 * Runs a dashboard mutation and converts failures into form state. Every
 * mutation re-checks the signed-in user (and the service layer re-checks the
 * specific permission) — the UI hiding a button is never the only control.
 */
async function run(prev: FormState, formData: FormData, fn: () => Promise<Result>, success = "Saved"): Promise<FormState> {
  const submission = (prev.submission ?? 0) + 1
  try {
    await requireActor()
    const result = await fn()
    if (result?.errors) {
      return { status: "error", message: "Please check the highlighted fields.", errors: result.errors, values: echoValues(formData), submission }
    }
    return { status: "success", title: success, message: result?.message ?? success, submission }
  } catch (error) {
    if (error && typeof error === "object" && "digest" in error && String(error.digest).startsWith("NEXT_REDIRECT")) throw error
    const message =
      error instanceof ForbiddenError
        ? "You don't have permission to do that."
        : error instanceof NotFoundError
          ? error.message
          : error instanceof Error && error.message.length < 200 && !/prisma|sql|database/i.test(error.message)
            ? error.message
            : "Something went wrong. Please try again."
    if (!(error instanceof ForbiddenError || error instanceof NotFoundError)) {
      console.error("[admin] action failed", error instanceof Error ? error.name : "unknown")
    }
    return { status: "error", message, errors: {}, values: echoValues(formData), submission }
  }
}

const str = (fd: FormData, k: string) => String(fd.get(k) ?? "")

// ─── Enquiries ───────────────────────────────────────────────────────────────

export async function setEnquiryStatusAction(prev: FormState, fd: FormData) {
  return run(prev, fd, async () => {
    const actor = await requireActor("enquiries:update")
    await updateEnquiryStatus(actor, str(fd, "id"), str(fd, "status"))
    revalidatePath("/admin/enquiries", "layout")
  }, "Status updated")
}

export async function assignEnquiryAction(prev: FormState, fd: FormData) {
  return run(prev, fd, async () => {
    const actor = await requireActor("enquiries:update")
    await assignEnquiry(actor, str(fd, "id"), str(fd, "assigneeId") || null)
    revalidatePath("/admin/enquiries", "layout")
  }, "Assignment updated")
}

export async function addNoteAction(prev: FormState, fd: FormData) {
  return run(prev, fd, async () => {
    const actor = await requireActor("notes:write")
    await addNote(actor, str(fd, "id"), str(fd, "body"))
    revalidatePath(`/admin/enquiries/${str(fd, "id")}`)
  }, "Note added")
}

export async function deleteEnquiryAction(prev: FormState, fd: FormData): Promise<FormState> {
  const state = await run(prev, fd, async () => {
    const actor = await requireActor("enquiries:delete")
    await deleteEnquiry(actor, str(fd, "id"))
  }, "Enquiry deleted")
  if (state.status === "success") redirect("/admin/enquiries?deleted=1")
  return state
}

// ─── Resources ───────────────────────────────────────────────────────────────

export async function saveResourceAction(prev: FormState, fd: FormData): Promise<FormState> {
  const id = str(fd, "id") || null
  let newId: string | null = null
  const state = await run(prev, fd, async () => {
    const actor = await requireActor("resources:manage")
    const result = await saveResource(actor, id, formDataToObject(fd))
    if (!result.ok) return { errors: result.errors }
    newId = result.id
    revalidatePath("/admin/resources")
    revalidatePath("/resources", "layout")
  }, "Resource saved")
  if (state.status === "success" && !id && newId) redirect(`/admin/resources/${newId}?created=1`)
  return state
}

export async function setResourceStatusAction(prev: FormState, fd: FormData) {
  return run(prev, fd, async () => {
    const actor = await requireActor("resources:manage")
    await setResourceStatus(actor, str(fd, "id"), str(fd, "status"))
    revalidatePath("/admin/resources", "layout")
    revalidatePath("/resources", "layout")
  }, "Status updated")
}

export async function deleteResourceAction(prev: FormState, fd: FormData): Promise<FormState> {
  const state = await run(prev, fd, async () => {
    const actor = await requireActor("resources:manage")
    await deleteResource(actor, str(fd, "id"))
    revalidatePath("/resources", "layout")
  }, "Deleted")
  if (state.status === "success") redirect("/admin/resources")
  return state
}

export async function removeResourceFileAction(prev: FormState, fd: FormData) {
  return run(prev, fd, async () => {
    const actor = await requireActor("resources:manage")
    await removeResourceFile(actor, str(fd, "id"))
    revalidatePath(`/admin/resources/${str(fd, "id")}`)
  }, "File removed")
}

// ─── Events ──────────────────────────────────────────────────────────────────

export async function saveEventAction(prev: FormState, fd: FormData): Promise<FormState> {
  const id = str(fd, "id") || null
  let newId: string | null = null
  const state = await run(prev, fd, async () => {
    const actor = await requireActor("events:manage")
    const result = await saveEvent(actor, id, formDataToObject(fd))
    if (!result.ok) return { errors: result.errors }
    newId = result.id
    revalidatePath("/admin/events")
    revalidatePath("/events", "layout")
  }, "Event saved")
  if (state.status === "success" && !id && newId) redirect(`/admin/events/${newId}?created=1`)
  return state
}

export async function setEventStatusAction(prev: FormState, fd: FormData) {
  return run(prev, fd, async () => {
    const actor = await requireActor("events:manage")
    await setEventStatus(actor, str(fd, "id"), str(fd, "status"))
    revalidatePath("/admin/events", "layout")
    revalidatePath("/events", "layout")
  }, "Status updated")
}

export async function deleteEventAction(prev: FormState, fd: FormData): Promise<FormState> {
  const state = await run(prev, fd, async () => {
    const actor = await requireActor("events:manage")
    await deleteEvent(actor, str(fd, "id"))
  }, "Deleted")
  if (state.status === "success") redirect("/admin/events")
  return state
}

export async function setRegistrationStatusAction(prev: FormState, fd: FormData) {
  return run(prev, fd, async () => {
    const actor = await requireActor("registrations:manage")
    const status = str(fd, "status") === "CONFIRMED" ? "CONFIRMED" : "CANCELLED"
    const eventId = await setRegistrationStatus(actor, str(fd, "id"), status)
    revalidatePath(`/admin/events/${eventId}/registrations`)
    revalidatePath("/events", "layout")
  }, "Registration updated")
}

// ─── Content ─────────────────────────────────────────────────────────────────

export async function savePageAction(prev: FormState, fd: FormData) {
  return run(prev, fd, async () => {
    const actor = await requireActor("content:manage")
    const slug = str(fd, "slug")
    const result = await savePage(actor, slug, formDataToObject(fd))
    if (!result.ok) return { errors: result.errors }
    revalidatePath("/", "layout")
  }, "Page saved")
}

export async function saveSupportContactAction(prev: FormState, fd: FormData): Promise<FormState> {
  const id = str(fd, "id") || null
  const state = await run(prev, fd, async () => {
    const actor = await requireActor("support-contacts:manage")
    const result = await saveSupportContact(actor, id, formDataToObject(fd))
    if (!result.ok) return { errors: result.errors }
    revalidatePath("/support")
  }, "Support contact saved")
  if (state.status === "success" && !id) redirect("/admin/support-contacts?created=1")
  return state
}

export async function deleteSupportContactAction(prev: FormState, fd: FormData): Promise<FormState> {
  const state = await run(prev, fd, async () => {
    const actor = await requireActor("support-contacts:manage")
    await deleteSupportContact(actor, str(fd, "id"))
    revalidatePath("/support")
  }, "Deleted")
  if (state.status === "success") redirect("/admin/support-contacts")
  return state
}

export async function deleteSubscriberAction(prev: FormState, fd: FormData) {
  return run(prev, fd, async () => {
    const actor = await requireActor("subscribers:manage")
    await deleteSubscriber(actor, str(fd, "id"))
    revalidatePath("/admin/subscribers")
  }, "Subscriber deleted")
}

// ─── Settings & users ────────────────────────────────────────────────────────

export async function saveSettingsAction(prev: FormState, fd: FormData) {
  return run(prev, fd, async () => {
    const actor = await requireActor("settings:manage")
    const programmeStatus: Record<string, string> = {}
    for (const [k, v] of fd.entries()) {
      if (k.startsWith("programme:") && typeof v === "string") programmeStatus[k.slice(10)] = v
    }
    const result = await updateSettings(actor, {
      contactEmail: str(fd, "contactEmail"),
      contactPhone: str(fd, "contactPhone"),
      officeHours: str(fd, "officeHours"),
      location: str(fd, "location"),
      instagram: str(fd, "instagram"),
      facebook: str(fd, "facebook"),
      x: str(fd, "x"),
      linkedin: str(fd, "linkedin"),
      registrationNotice: str(fd, "registrationNotice"),
      founderBio: str(fd, "founderBio"),
      founderBioApproved: fd.get("founderBioApproved") === "on",
      newsletterEnabled: fd.get("newsletterEnabled") === "on",
      programmeStatus,
      retentionMonths: Number(str(fd, "retentionMonths") || 24),
    })
    if (!result.ok) return { errors: flattenErrors(result.error) }
    revalidatePath("/", "layout")
  }, "Settings saved")
}

export async function createUserAction(prev: FormState, fd: FormData) {
  return run(prev, fd, async () => {
    const actor = await requireActor("users:manage")
    const result = await createStaffUser(actor, formDataToObject(fd))
    if (!result.ok) return { errors: result.errors }
    revalidatePath("/admin/users")
    return {
      message: result.invited
        ? "User created. They've been emailed a link to choose their password."
        : "User created. Share the initial password with them securely and ask them to change it after signing in.",
    }
  }, "User created")
}

export async function updateUserAction(prev: FormState, fd: FormData) {
  return run(prev, fd, async () => {
    const actor = await requireActor("users:manage")
    const active = fd.get("active")
    await updateStaffUser(actor, str(fd, "id"), {
      role: str(fd, "role") || undefined,
      active: active === null ? undefined : active === "true",
    })
    revalidatePath("/admin/users")
  }, "User updated")
}

export async function runRetentionAction(prev: FormState, fd: FormData) {
  return run(prev, fd, async () => {
    const actor = await requireActor("retention:manage")
    if (str(fd, "confirm") !== "DELETE") return { errors: { confirm: 'Type DELETE to confirm' } }
    const r = await runRetention(actor)
    revalidatePath("/admin", "layout")
    return {
      message: `Deleted ${r.enquiries} closed enquiries, ${r.registrations} old event registrations and ${r.subscribers} lapsed subscriber records.`,
    }
  }, "Retention run complete")
}
