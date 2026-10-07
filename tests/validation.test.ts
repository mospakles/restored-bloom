import { describe, expect, it } from "vitest"
import {
  contactEnquirySchema,
  eventRegistrationSchema,
  flattenErrors,
  formDataToObject,
  partnerEnquirySchema,
  involvesChildren,
  outreachRequestSchema,
  volunteerEnquirySchema,
} from "@/lib/validation"

const validRequest = {
  organisation: "Example Community Church",
  hostType: "faith",
  contactName: "Ada Example",
  contactRole: "Youth coordinator",
  email: "ADA@Example.com ",
  phone: "+234 800 000 0000",
  location: "Ikeja, Lagos",
  audiences: ["teenagers", "parents"],
  participants: "50–100",
  support: "teen-session",
  preferredDates: "Next month",
  noPersonalInfo: "on",
  privacy: "on",
}

describe("outreach request validation", () => {
  it("accepts a request from any kind of host and normalises the email", () => {
    for (const hostType of ["school-primary", "faith", "workplace", "community", "other"]) {
      expect(outreachRequestSchema.safeParse({ ...validRequest, hostType }).success).toBe(true)
    }
    const r = outreachRequestSchema.safeParse(validRequest)
    expect(r.success).toBe(true)
    if (r.success) expect(r.data.email).toBe("ada@example.com")
  })

  it("requires the no-personal-information acknowledgement and privacy consent", () => {
    const r = outreachRequestSchema.safeParse({ ...validRequest, noPersonalInfo: undefined, privacy: undefined })
    expect(r.success).toBe(false)
    if (!r.success) {
      const errors = flattenErrors(r.error)
      expect(errors.noPersonalInfo).toMatch(/personal details/)
      expect(errors.privacy).toMatch(/privacy/)
    }
  })

  it("returns field-level errors for missing and invalid fields", () => {
    const r = outreachRequestSchema.safeParse({ ...validRequest, organisation: "  ", email: "not-an-email", hostType: "", audiences: [] })
    expect(r.success).toBe(false)
    if (!r.success) {
      const errors = flattenErrors(r.error)
      expect(errors.organisation).toBe("Organisation or group name is required")
      expect(errors.email).toBe("Please enter a valid email address")
      expect(errors.hostType).toBeDefined()
      expect(errors.audiences).toBe("Please choose at least one audience")
    }
  })

  it("rejects over-long free text", () => {
    const r = outreachRequestSchema.safeParse({ ...validRequest, logistics: "x".repeat(2001) })
    expect(r.success).toBe(false)
  })

  it("flags requests that involve under-18s", () => {
    expect(involvesChildren(["children"])).toBe(true)
    expect(involvesChildren(["parents", "teenagers"])).toBe(true)
    expect(involvesChildren(["staff", "community"])).toBe(false)
  })
})

describe("volunteer enquiry validation", () => {
  const base = { name: "Sam", email: "sam@example.com", location: "Lagos", areas: ["events"], privacy: "on" }

  it("requires the screening acknowledgement", () => {
    const r = volunteerEnquirySchema.safeParse(base)
    expect(r.success).toBe(false)
    if (!r.success) expect(flattenErrors(r.error).screeningAcknowledged).toMatch(/screening/)
  })

  it("requires at least one area and rejects unknown ones", () => {
    expect(volunteerEnquirySchema.safeParse({ ...base, screeningAcknowledged: "on", areas: [] }).success).toBe(false)
    expect(volunteerEnquirySchema.safeParse({ ...base, screeningAcknowledged: "on", areas: ["hacking"] }).success).toBe(false)
    expect(volunteerEnquirySchema.safeParse({ ...base, screeningAcknowledged: "on" }).success).toBe(true)
  })
})

describe("other schemas", () => {
  it("validates partner website URLs", () => {
    const base = {
      organisation: "Org",
      organisationType: "ngo",
      name: "N",
      role: "R",
      email: "a@example.com",
      interests: ["referral"],
      message: "Hello there",
      privacy: "on",
    }
    expect(partnerEnquirySchema.safeParse({ ...base, website: "javascript:alert(1)" }).success).toBe(false)
    expect(partnerEnquirySchema.safeParse({ ...base, website: "" }).success).toBe(true)
    expect(partnerEnquirySchema.safeParse({ ...base, website: "https://example.org" }).success).toBe(true)
  })

  it("rejects contact messages that are too short", () => {
    const r = contactEnquirySchema.safeParse({ name: "A", email: "a@example.com", topic: "general", message: "hi", privacy: "on" })
    expect(r.success).toBe(false)
  })

  it("treats an empty attendee role as not provided", () => {
    const r = eventRegistrationSchema.safeParse({ eventId: "e1", name: "A", email: "a@example.com", role: "", privacy: "on" })
    expect(r.success).toBe(true)
    if (r.success) expect(r.data.role).toBeUndefined()
  })
})

describe("formDataToObject", () => {
  it("collects repeated keys into arrays and skips framework fields", () => {
    const fd = new FormData()
    fd.append("areas", "events")
    fd.append("areas", "design")
    fd.append("name", "Sam")
    fd.append("$ACTION_ID_abc", "")
    const obj = formDataToObject(fd, ["areas", "interests"])
    expect(obj).toEqual({ areas: ["events", "design"], name: "Sam", interests: [] })
  })
})
