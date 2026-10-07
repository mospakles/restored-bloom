import {
  AUDIENCES,
  CONTACT_TOPICS,
  HOST_TYPES,
  OUTREACH_SUPPORT,
  ORGANISATION_TYPES,
  PARTNERSHIP_INTERESTS,
  SPONSOR_TYPES,
  SPONSORSHIP_INTERESTS,
  VOLUNTEER_AREAS,
} from "@/lib/validation"

export const ENQUIRY_TYPES = ["OUTREACH", "VOLUNTEER", "PARTNER", "SPONSOR", "CONTACT"] as const
export type EnquiryTypeKey = (typeof ENQUIRY_TYPES)[number]

export const ENQUIRY_TYPE_LABELS: Record<EnquiryTypeKey, string> = {
  OUTREACH: "Outreach request",
  VOLUNTEER: "Volunteer",
  PARTNER: "Partnership",
  SPONSOR: "Sponsorship",
  CONTACT: "General contact",
}

export const ENQUIRY_STATUSES = ["NEW", "IN_REVIEW", "CONTACTED", "APPROVED", "CLOSED"] as const
export type EnquiryStatusKey = (typeof ENQUIRY_STATUSES)[number]

export const ENQUIRY_STATUS_LABELS: Record<EnquiryStatusKey, string> = {
  NEW: "New",
  IN_REVIEW: "In review",
  CONTACTED: "Contacted",
  APPROVED: "Approved",
  CLOSED: "Closed",
}

const pick = (map: Record<string, string>, v: unknown) => (typeof v === "string" ? (map[v] ?? v) : "")
const pickMany = (map: Record<string, string>, v: unknown) =>
  Array.isArray(v) ? v.map((x) => pick(map, x)).join("; ") : ""
const text = (v: unknown) => (typeof v === "string" ? v : v == null ? "" : String(v))

/** Human-readable label/value pairs for the type-specific `details` JSON. */
export function describeDetails(type: EnquiryTypeKey, details: unknown): { label: string; value: string }[] {
  const d = (details ?? {}) as Record<string, unknown>
  const rows: [string, string][] = (() => {
    switch (type) {
      case "OUTREACH":
        return [
          ["Type of host", pick(HOST_TYPES, d.hostType)],
          ["Contact role", text(d.contactRole)],
          ["Location", text(d.location)],
          ["Audiences", pickMany(AUDIENCES, d.audiences)],
          ["Estimated participants", text(d.participants)],
          ["Support requested", pick(OUTREACH_SUPPORT, d.support)],
          ["Preferred dates", text(d.preferredDates)],
          ["Involves under-18s", d.involvesChildren === undefined ? "" : d.involvesChildren ? "Yes — child-safeguarding arrangements apply" : "No"],
        ]
      case "VOLUNTEER":
        return [
          ["City or area", text(d.location)],
          ["Areas of interest", pickMany(VOLUNTEER_AREAS, d.areas)],
          ["Relevant background", text(d.background)],
          ["Availability", text(d.availability)],
        ]
      case "PARTNER":
        return [
          ["Organisation type", pick(ORGANISATION_TYPES, d.organisationType)],
          ["Contact role", text(d.role)],
          ["Website", text(d.website)],
          ["Partnership interests", pickMany(PARTNERSHIP_INTERESTS, d.interests)],
        ]
      case "SPONSOR":
        return [
          ["Enquiring as", pick(SPONSOR_TYPES, d.sponsorType)],
          ["Areas of interest", pickMany(SPONSORSHIP_INTERESTS, d.interests)],
        ]
      case "CONTACT":
        return [["Topic", pick(CONTACT_TOPICS, d.topic)]]
    }
  })()
  return rows.filter(([, v]) => v).map(([label, value]) => ({ label, value }))
}

export function organisationLabel(type: EnquiryTypeKey): string {
  return type === "OUTREACH" ? "Organisation or group" : "Organisation"
}
