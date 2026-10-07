/**
 * Server-side validation for every form. Pure module (no I/O) so schemas can
 * be unit-tested and reused by the client for labels/options.
 */
import { z } from "zod"

export const CONSENT_VERSION = "2026-10-draft-1"

// ─── Shared fields ───────────────────────────────────────────────────────────

const trimmed = (max: number) => z.string().trim().max(max, `Please keep this under ${max} characters`)
const requiredText = (label: string, max = 120) =>
  z.string().trim().min(1, `${label} is required`).max(max, `Please keep this under ${max} characters`)
const optionalText = (max: number) =>
  trimmed(max)
    .optional()
    .transform((v) => (v ? v : undefined))

const email = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, "Email is required")
  .max(254, "Email is too long")
  .pipe(z.email("Please enter a valid email address"))

const phoneRequired = z
  .string()
  .trim()
  .min(1, "Phone number is required")
  .regex(/^\+?[0-9 ()-]{7,20}$/, "Please enter a valid phone number")

const phoneOptional = z
  .string()
  .trim()
  .optional()
  .transform((v) => (v ? v : undefined))
  .pipe(
    z
      .string()
      .regex(/^\+?[0-9 ()-]{7,20}$/, "Please enter a valid phone number")
      .optional(),
  )

const checked = (message: string) =>
  z.preprocess((v) => v === true || v === "on" || v === "true", z.literal(true, message))

const privacy = checked("Please confirm you have read the privacy notice")

function multi<T extends readonly [string, ...string[]]>(values: T, message: string) {
  return z.array(z.enum(values)).min(1, message)
}

// ─── Outreach request ("Invite us") ──────────────────────────────────────────
// Restored Bloom can be invited by any school, community, organisation or group.

export const HOST_TYPES = {
  "school-primary": "Primary school",
  "school-secondary": "Secondary school",
  "school-other": "Other school or college",
  faith: "Church, mosque or faith community",
  community: "Community or residents' association",
  youth: "Youth group, club or camp",
  ngo: "NGO or charity",
  workplace: "Workplace or business",
  health: "Hospital, clinic or health setting",
  families: "Parents' or family group",
  government: "Government or public agency",
  other: "Other",
} as const

export const AUDIENCES = {
  children: "Children (under 12)",
  teenagers: "Teenagers (12–17)",
  "young-adults": "Young adults (18–25)",
  parents: "Parents and caregivers",
  educators: "Teachers, youth workers or faith leaders",
  staff: "Staff, volunteers or professionals",
  community: "General community or mixed audience",
} as const

export const PARTICIPANT_RANGES = ["Under 50", "50–100", "101–250", "251–500", "More than 500", "Not sure yet"] as const

export const OUTREACH_SUPPORT = {
  "children-session": "Awareness session for children",
  "teen-session": "Awareness session for teenagers or young people",
  "parent-session": "Parent and caregiver sensitisation",
  "staff-training": "Training or briefing for staff, teachers or leaders",
  "community-talk": "Community awareness talk or workshop",
  "event-speaker": "Speaking at an event, service or programme",
  campaign: "Awareness campaign or outreach day",
  "not-sure": "Not sure — we would like to talk it through",
} as const

export const outreachRequestSchema = z.object({
  organisation: requiredText("Organisation or group name", 160),
  hostType: z.enum(Object.keys(HOST_TYPES) as [keyof typeof HOST_TYPES], "Please choose the type of organisation or group"),
  contactName: requiredText("Contact person", 120),
  contactRole: requiredText("Role", 120),
  email,
  phone: phoneRequired,
  location: requiredText("Location", 160),
  audiences: multi(Object.keys(AUDIENCES) as [keyof typeof AUDIENCES], "Please choose at least one audience"),
  participants: z.enum(PARTICIPANT_RANGES, "Please choose an estimate"),
  support: z.enum(Object.keys(OUTREACH_SUPPORT) as [keyof typeof OUTREACH_SUPPORT], "Please choose the kind of support"),
  preferredDates: requiredText("Preferred dates", 300),
  logistics: optionalText(2000),
  noPersonalInfo: checked(
    "Please confirm you have not included anyone's personal details or any disclosures of abuse",
  ),
  privacy,
})
export type OutreachRequestInput = z.infer<typeof outreachRequestSchema>

/** True when any of the requested audiences are under 18, so child-safeguarding arrangements apply. */
export function involvesChildren(audiences: readonly string[]): boolean {
  return audiences.some((a) => a === "children" || a === "teenagers")
}

// ─── Volunteer enquiry ───────────────────────────────────────────────────────

export const VOLUNTEER_AREAS = {
  events: "Event and logistics support",
  communications: "Communications and social media",
  design: "Design and creative",
  admin: "Administration",
  fundraising: "Fundraising",
  professional: "Professional expertise (e.g. counselling, education, law, health)",
} as const

export const volunteerEnquirySchema = z.object({
  name: requiredText("Name", 120),
  email,
  phone: phoneOptional,
  location: requiredText("City or area", 120),
  areas: multi(Object.keys(VOLUNTEER_AREAS) as [keyof typeof VOLUNTEER_AREAS], "Please choose at least one area"),
  background: optionalText(500),
  availability: optionalText(300),
  message: optionalText(1500),
  screeningAcknowledged: checked(
    "Please confirm you understand that screening and approval are required before any work with children",
  ),
  privacy,
})
export type VolunteerEnquiryInput = z.infer<typeof volunteerEnquirySchema>

// ─── Partner enquiry ─────────────────────────────────────────────────────────

export const ORGANISATION_TYPES = {
  school: "School or education body",
  ngo: "Non-profit or community organisation",
  faith: "Faith-based organisation",
  health: "Health or counselling service",
  legal: "Legal or advocacy organisation",
  government: "Government agency",
  business: "Business",
  other: "Other",
} as const

export const PARTNERSHIP_INTERESTS = {
  referral: "Survivor support or referral pathway",
  expertise: "Professional expertise or content review",
  delivery: "Co-delivering programmes",
  venue: "Venue or logistics",
  materials: "Educational materials",
  other: "Something else",
} as const

export const partnerEnquirySchema = z.object({
  organisation: requiredText("Organisation name", 160),
  organisationType: z.enum(Object.keys(ORGANISATION_TYPES) as [keyof typeof ORGANISATION_TYPES], "Please choose an organisation type"),
  name: requiredText("Contact name", 120),
  role: requiredText("Role", 120),
  email,
  phone: phoneOptional,
  website: optionalText(200).pipe(z.url({ protocol: /^https?$/, error: "Please enter a full web address, starting with https://" }).optional()),
  interests: multi(Object.keys(PARTNERSHIP_INTERESTS) as [keyof typeof PARTNERSHIP_INTERESTS], "Please choose at least one area"),
  message: requiredText("A short description", 2000),
  privacy,
})
export type PartnerEnquiryInput = z.infer<typeof partnerEnquirySchema>

// ─── Sponsor enquiry ─────────────────────────────────────────────────────────

export const SPONSORSHIP_INTERESTS = {
  materials: "Outreach and learning materials",
  school: "Sponsoring an outreach session (school, community or organisation)",
  parents: "Parent and educator sessions",
  events: "Community awareness events",
  general: "General support for the foundation",
} as const

export const SPONSOR_TYPES = { individual: "An individual", organisation: "An organisation or business" } as const

export const sponsorEnquirySchema = z.object({
  name: requiredText("Name", 120),
  sponsorType: z.enum(Object.keys(SPONSOR_TYPES) as [keyof typeof SPONSOR_TYPES], "Please choose one"),
  organisation: optionalText(160),
  email,
  phone: phoneOptional,
  interests: multi(Object.keys(SPONSORSHIP_INTERESTS) as [keyof typeof SPONSORSHIP_INTERESTS], "Please choose at least one area"),
  message: optionalText(1500),
  privacy,
})
export type SponsorEnquiryInput = z.infer<typeof sponsorEnquirySchema>

// ─── General contact ─────────────────────────────────────────────────────────

export const CONTACT_TOPICS = {
  general: "General enquiry",
  media: "Media or speaking request",
  resources: "Question about resources",
  website: "Website feedback or accessibility",
  other: "Other",
} as const

export const contactEnquirySchema = z.object({
  name: requiredText("Name", 120),
  email,
  phone: phoneOptional,
  topic: z.enum(Object.keys(CONTACT_TOPICS) as [keyof typeof CONTACT_TOPICS], "Please choose a topic"),
  message: requiredText("Message", 2000).refine((v) => v.length >= 10, "Please write a little more (at least 10 characters)"),
  privacy,
})
export type ContactEnquiryInput = z.infer<typeof contactEnquirySchema>

// ─── Event registration ──────────────────────────────────────────────────────

export const ATTENDEE_ROLES = {
  parent: "Parent or caregiver",
  educator: "Teacher or school staff",
  professional: "Professional (health, social care, legal)",
  community: "Community member",
  other: "Other",
} as const

export const eventRegistrationSchema = z.object({
  eventId: z.string().min(1).max(40),
  name: requiredText("Name", 120),
  email,
  phone: phoneOptional,
  organisation: optionalText(160),
  role: z
    .enum(Object.keys(ATTENDEE_ROLES) as [keyof typeof ATTENDEE_ROLES])
    .optional()
    .or(z.literal("").transform(() => undefined)),
  privacy,
})
export type EventRegistrationInput = z.infer<typeof eventRegistrationSchema>

// ─── Newsletter ──────────────────────────────────────────────────────────────

export const NEWSLETTER_CONSENT_TEXT =
  "I would like to receive occasional email updates from Restored Bloom. I can unsubscribe at any time."

export const newsletterSchema = z.object({
  email,
  consent: checked("Please tick the box to confirm you would like to receive updates"),
})

// ─── Helpers ─────────────────────────────────────────────────────────────────

export type FieldErrors = Record<string, string>

/** Converts FormData to a plain object; repeated keys become arrays when listed in `arrays`. */
export function formDataToObject(formData: FormData, arrays: string[] = []): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const key of new Set(formData.keys())) {
    if (key.startsWith("$ACTION")) continue
    const values = formData.getAll(key).filter((v): v is string => typeof v === "string")
    out[key] = arrays.includes(key) ? values : values[0]
  }
  for (const key of arrays) if (!(key in out)) out[key] = []
  return out
}

export function flattenErrors(error: z.ZodError): FieldErrors {
  const errors: FieldErrors = {}
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "_form"
    if (!errors[key]) errors[key] = issue.message
  }
  return errors
}
