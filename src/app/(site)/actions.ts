"use server"

import { after } from "next/server"
import { clientFingerprint, checkFormToken } from "@/lib/security"
import { echoValues, type FormState } from "@/lib/form-state"
import { formDataToObject } from "@/lib/validation"
import { ENQUIRY_TYPE_LABELS } from "@/lib/enquiry-display"
import { hit } from "@/server/throttle"
import { submitEnquiry } from "@/server/enquiries"
import { registerForEvent } from "@/server/events"
import { subscribe } from "@/server/newsletter"
import { acknowledge, notifyStaff } from "@/server/notify"
import type { EnquiryType } from "@/generated/prisma/client"

const FORM_ERROR = "Please check the highlighted fields."

type Guard = { blocked: FormState } | { blocked: null }

/** Spam and abuse checks shared by every public form. */
async function guard(formData: FormData, action: string, prev: FormState, limit = 5, windowSeconds = 600): Promise<Guard> {
  const submission = (prev.submission ?? 0) + 1
  // Honeypot filled: respond as if successful so bots learn nothing; nothing is stored.
  if (String(formData.get("_website") ?? "") !== "") {
    return {
      blocked: { status: "success", title: "Thank you", message: "Your message has been received.", submission },
    }
  }
  const token = checkFormToken(formData.get("_token"))
  if (token !== "ok") {
    const message =
      token === "expired"
        ? "This form has been open for a long time. Please refresh the page and try again."
        : "Sorry, we couldn't accept that submission. Please wait a moment and try again."
    return { blocked: { status: "error", message, errors: {}, values: echoValues(formData), submission } }
  }
  const fp = await clientFingerprint()
  if (!(await hit(`form:${action}:${fp}`, limit, windowSeconds))) {
    return {
      blocked: {
        status: "error",
        message: "You've sent several submissions in a short time. Please wait a few minutes and try again.",
        errors: {},
        values: echoValues(formData),
        submission,
      },
    }
  }
  return { blocked: null }
}

const ENQUIRY_ARRAYS: Partial<Record<EnquiryType, string[]>> = {
  OUTREACH: ["audiences"],
  VOLUNTEER: ["areas"],
  PARTNER: ["interests"],
  SPONSOR: ["interests"],
}

const SUCCESS_COPY: Record<EnquiryType, { title: string; message: string }> = {
  OUTREACH: {
    title: "Thank you! Your invitation has been received",
    message:
      "A member of our team will contact you to talk through what you need, your dates and the safeguarding arrangements. Nothing is confirmed until we have spoken with you.",
  },
  VOLUNTEER: {
    title: "Thank you for offering your time",
    message:
      "We'll be in touch about current opportunities. Please remember that any role involving children requires screening and approval first, submitting this form does not authorise anyone to work with children.",
  },
  PARTNER: {
    title: "Thank you for your partnership enquiry",
    message: "We'll review your message and get back to you to explore how we might work together.",
  },
  SPONSOR: {
    title: "Thank you for your interest in supporting our work",
    message: "We'll be in touch to talk through sponsorship options. We have not taken any payment or commitment from you.",
  },
  CONTACT: {
    title: "Thank you! Your message has been received",
    message:
      "We aim to reply within a few working days. This form isn't monitored as an emergency channel, if anyone is in immediate danger, please contact local emergency services.",
  },
}

async function enquiryAction(type: EnquiryType, prev: FormState, formData: FormData): Promise<FormState> {
  const g = await guard(formData, `enquiry-${type}`, prev)
  if (g.blocked) return g.blocked
  const submission = (prev.submission ?? 0) + 1
  try {
    const result = await submitEnquiry(type, formDataToObject(formData, ENQUIRY_ARRAYS[type]))
    if (!result.ok) {
      return { status: "error", message: FORM_ERROR, errors: result.errors, values: echoValues(formData), submission }
    }
    const kind = type === "OUTREACH" ? "outreach request" : `${ENQUIRY_TYPE_LABELS[type].toLowerCase()} enquiry`
    after(async () => {
      await notifyStaff(kind, result.reference, `/admin/enquiries/${result.id}`)
      await acknowledge(result.email, kind, result.reference)
    })
    return { status: "success", ...SUCCESS_COPY[type], reference: result.reference, submission }
  } catch (error) {
    console.error("[enquiry] submission failed", error instanceof Error ? error.name : "unknown")
    return {
      status: "error",
      message: "Something went wrong on our side and your enquiry was not sent. Please try again shortly.",
      errors: {},
      values: echoValues(formData),
      submission,
    }
  }
}

export async function submitOutreachRequest(prev: FormState, formData: FormData) {
  return enquiryAction("OUTREACH", prev, formData)
}
export async function submitVolunteerEnquiry(prev: FormState, formData: FormData) {
  return enquiryAction("VOLUNTEER", prev, formData)
}
export async function submitPartnerEnquiry(prev: FormState, formData: FormData) {
  return enquiryAction("PARTNER", prev, formData)
}
export async function submitSponsorEnquiry(prev: FormState, formData: FormData) {
  return enquiryAction("SPONSOR", prev, formData)
}
export async function submitContactEnquiry(prev: FormState, formData: FormData) {
  return enquiryAction("CONTACT", prev, formData)
}

export async function submitEventRegistration(prev: FormState, formData: FormData): Promise<FormState> {
  const g = await guard(formData, "event-registration", prev, 8)
  if (g.blocked) return g.blocked
  const submission = (prev.submission ?? 0) + 1
  const values = echoValues(formData)
  try {
    const result = await registerForEvent(formDataToObject(formData))
    if (result.ok) {
      return {
        status: "success",
        title: "You're registered",
        message: `Your place at "${result.eventTitle}" is confirmed. If you can no longer attend, please let us know through the contact page so the place can be offered to someone else.`,
        submission,
      }
    }
    switch (result.status) {
      case "invalid":
        return { status: "error", message: FORM_ERROR, errors: result.errors, values, submission }
      case "duplicate":
        return {
          status: "error",
          message: "This email address is already registered for this event, there's no need to register again.",
          errors: { email: "Already registered for this event" },
          values,
          submission,
        }
      case "full":
        return { status: "error", message: "Sorry, this event is now full.", errors: {}, values, submission }
      default:
        return {
          status: "error",
          message: "Registration for this event is closed.",
          errors: {},
          values,
          submission,
        }
    }
  } catch (error) {
    console.error("[event] registration failed", error instanceof Error ? error.name : "unknown")
    return {
      status: "error",
      message: "Something went wrong and you were not registered. Please try again shortly.",
      errors: {},
      values,
      submission,
    }
  }
}

export async function submitNewsletter(prev: FormState, formData: FormData): Promise<FormState> {
  const g = await guard(formData, "newsletter", prev, 4)
  if (g.blocked) return g.blocked
  const submission = (prev.submission ?? 0) + 1
  const result = await subscribe(formDataToObject(formData))
  if (result.ok) {
    return {
      status: "success",
      title: "Please check your inbox",
      message: "We've sent you an email. Click the link inside to confirm your subscription.",
      submission,
    }
  }
  if ("unavailable" in result) {
    return { status: "error", message: "Newsletter signup isn't available right now.", errors: {}, values: {}, submission }
  }
  return { status: "error", message: FORM_ERROR, errors: result.errors, values: echoValues(formData), submission }
}
