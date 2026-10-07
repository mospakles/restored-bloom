/**
 * Integration tests against a real PostgreSQL database.
 * Runs only when TEST_DATABASE_URL is set (see README → Testing). The database
 * is wiped between tests — never point this at real data.
 */
import { afterAll, beforeEach, describe, expect, it } from "vitest"

const enabled = Boolean(process.env.TEST_DATABASE_URL)

describe.skipIf(!enabled)("integration", async () => {
  const { prisma } = await import("@/lib/db")
  const { submitEnquiry, listEnquiries, updateEnquiryStatus, addNote, getEnquiry, deleteEnquiry } = await import("@/server/enquiries")
  const { registerForEvent, listUpcomingEvents, setEventStatus } = await import("@/server/events")
  const { searchResources, saveResource, setResourceStatus, getPublishedResource, getDownloadableFile } = await import("@/server/resources")
  const { createStaffUser, updateStaffUser } = await import("@/server/users")
  const { listPublicSupportContacts, saveSupportContact } = await import("@/server/pages")
  const { hit } = await import("@/server/throttle")
  const { ForbiddenError } = await import("@/server/actor")
  type Actor = import("@/server/actor").Actor

  const admin: Actor = { id: "u-admin", email: "admin@test.example", name: "Admin", role: "ADMIN" }
  const editor: Actor = { id: "u-editor", email: "editor@test.example", name: "Editor", role: "EDITOR" }
  const coordinator: Actor = { id: "u-coord", email: "coord@test.example", name: "Coord", role: "COORDINATOR" }

  async function reset() {
    await prisma.$executeRawUnsafe(
      `TRUNCATE "AuditLog","EnquiryNote","Enquiry","EventRegistration","Event","Resource","ResourceFile","SupportContact","Subscriber","FormThrottle","Setting","Page","session","account","verification","user" CASCADE`,
    )
    for (const a of [admin, editor, coordinator]) {
      await prisma.user.create({ data: { id: a.id, email: a.email, name: a.name, role: a.role, emailVerified: true } })
    }
  }

  beforeEach(reset)
  afterAll(async () => {
    await prisma.$disconnect()
  })

  const outreach = {
    organisation: "Example Mosque Youth Wing",
    hostType: "faith",
    contactName: "Ada",
    contactRole: "Coordinator",
    email: "ada@example.com",
    phone: "+2348000000000",
    location: "Lagos",
    audiences: ["teenagers", "parents"],
    participants: "50–100",
    support: "teen-session",
    preferredDates: "Next month",
    noPersonalInfo: "on",
    privacy: "on",
  }

  describe("enquiries", () => {
    it("stores a valid outreach request with consent and a reference", async () => {
      const r = await submitEnquiry("OUTREACH", outreach)
      expect(r.ok).toBe(true)
      if (!r.ok) return
      expect(r.reference).toMatch(/^RB-OUT-[A-Z0-9]{6}$/)
      const row = await prisma.enquiry.findUniqueOrThrow({ where: { id: r.id } })
      expect(row.status).toBe("NEW")
      expect(row.organisation).toBe("Example Mosque Youth Wing")
      expect(row.consentAt).toBeInstanceOf(Date)
      const details = row.details as Record<string, unknown>
      expect(details.hostType).toBe("faith")
      expect(details.audiences).toEqual(["teenagers", "parents"])
      expect(details.involvesChildren).toBe(true)
    })

    it("stores nothing when validation fails", async () => {
      const r = await submitEnquiry("OUTREACH", { ...outreach, privacy: undefined })
      expect(r.ok).toBe(false)
      expect(await prisma.enquiry.count()).toBe(0)
    })

    it("enforces permissions server-side", async () => {
      const r = await submitEnquiry("CONTACT", { name: "A", email: "a@example.com", topic: "general", message: "Hello there!", privacy: "on" })
      if (!r.ok) throw new Error("setup failed")
      await expect(listEnquiries(editor, {})).rejects.toBeInstanceOf(ForbiddenError)
      await expect(updateEnquiryStatus(editor, r.id, "CLOSED")).rejects.toBeInstanceOf(ForbiddenError)
      await expect(deleteEnquiry(coordinator, r.id)).rejects.toBeInstanceOf(ForbiddenError)

      await updateEnquiryStatus(coordinator, r.id, "CONTACTED")
      await addNote(coordinator, r.id, "Called back")
      const e = await getEnquiry(coordinator, r.id)
      expect(e.status).toBe("CONTACTED")
      expect(e.notes).toHaveLength(1)

      const audit = await prisma.auditLog.findMany({ where: { entityId: r.id } })
      expect(audit.map((a) => a.action)).toEqual(expect.arrayContaining(["enquiry.status", "enquiry.note.add"]))
      // Audit metadata never contains submission contents
      expect(JSON.stringify(audit)).not.toContain("Hello there")
      expect(JSON.stringify(audit)).not.toContain("Called back")
    })

    it("hides closed enquiries by default", async () => {
      const r = await submitEnquiry("CONTACT", { name: "A", email: "a@example.com", topic: "general", message: "Hello there!", privacy: "on" })
      if (!r.ok) throw new Error("setup failed")
      await updateEnquiryStatus(admin, r.id, "CLOSED")
      expect((await listEnquiries(admin, {})).total).toBe(0)
      expect((await listEnquiries(admin, { status: "all" })).total).toBe(1)
    })
  })

  describe("event registration", () => {
    async function makeEvent(overrides: Record<string, unknown> = {}) {
      return prisma.event.create({
        data: {
          title: "Workshop",
          slug: `workshop-${Math.random().toString(36).slice(2)}`,
          summary: "Summary text",
          description: "Description",
          startsAt: new Date(Date.now() + 86_400_000),
          location: "Lagos",
          capacity: 2,
          status: "PUBLISHED",
          ...overrides,
        },
      })
    }
    const reg = (eventId: string, email: string) => ({ eventId, name: "Guest", email, privacy: "on" })

    it("confirms, detects duplicates and enforces capacity", async () => {
      const event = await makeEvent()
      expect((await registerForEvent(reg(event.id, "one@example.com"))).status).toBe("registered")
      expect((await registerForEvent(reg(event.id, "ONE@example.com"))).status).toBe("duplicate")
      expect((await registerForEvent(reg(event.id, "two@example.com"))).status).toBe("registered")
      expect((await registerForEvent(reg(event.id, "three@example.com"))).status).toBe("full")
      expect(await prisma.eventRegistration.count({ where: { eventId: event.id } })).toBe(2)
    })

    it("never exceeds capacity under concurrent registrations", async () => {
      const event = await makeEvent({ capacity: 3 })
      const results = await Promise.all(
        Array.from({ length: 8 }, (_, i) => registerForEvent(reg(event.id, `p${i}@example.com`))),
      )
      expect(results.filter((r) => r.status === "registered")).toHaveLength(3)
      expect(await prisma.eventRegistration.count({ where: { eventId: event.id, status: "CONFIRMED" } })).toBe(3)
    })

    it("rejects registrations for drafts, past and cancelled events", async () => {
      const draft = await makeEvent({ status: "DRAFT" })
      const past = await makeEvent({ startsAt: new Date(Date.now() - 86_400_000) })
      const cancelled = await makeEvent()
      await setEventStatus(editor, cancelled.id, "CANCELLED")
      expect((await registerForEvent(reg(draft.id, "a@example.com"))).status).toBe("not-found")
      expect((await registerForEvent(reg(past.id, "a@example.com"))).status).toBe("closed")
      expect((await registerForEvent(reg(cancelled.id, "a@example.com"))).status).toBe("closed")
    })

    it("lists only published or cancelled upcoming events publicly", async () => {
      await makeEvent({ status: "DRAFT", title: "Hidden" })
      await makeEvent({ title: "Visible" })
      const titles = (await listUpcomingEvents()).map((e) => e.title)
      expect(titles).toEqual(["Visible"])
    })
  })

  describe("content publishing", () => {
    it("only exposes published resources and their files", async () => {
      const saved = await saveResource(editor, null, {
        title: "Body safety basics",
        summary: "A short guide for parents",
        body: "## Hello",
        category: "PARENTS",
      })
      if (!saved.ok) throw new Error("setup failed")
      const r = await prisma.resource.findUniqueOrThrow({ where: { id: saved.id } })
      const file = await prisma.resourceFile.create({
        data: { filename: "guide.pdf", mimeType: "application/pdf", size: 4, data: new Uint8Array([0x25, 0x50, 0x44, 0x46]) },
      })
      await prisma.resource.update({ where: { id: r.id }, data: { fileId: file.id } })

      expect(await searchResources({})).toHaveLength(0)
      expect(await getPublishedResource(r.slug)).toBeNull()
      expect(await getDownloadableFile(file.id, null)).toBeNull()
      expect(await getDownloadableFile(file.id, editor)).not.toBeNull()

      await expect(setResourceStatus(coordinator, r.id, "PUBLISHED")).rejects.toBeInstanceOf(ForbiddenError)
      await setResourceStatus(editor, r.id, "PUBLISHED")

      expect((await searchResources({ q: "safety" })).map((x) => x.id)).toEqual([r.id])
      expect(await searchResources({ q: "unrelated" })).toHaveLength(0)
      expect(await getDownloadableFile(file.id, null)).not.toBeNull()

      await setResourceStatus(editor, r.id, "ARCHIVED")
      expect(await getPublishedResource(r.slug)).toBeNull()
    })

    it("shows support contacts only when verified and published", async () => {
      const bad = await saveSupportContact(admin, null, {
        name: "Example Line",
        kind: "HELPLINE",
        description: "Example description",
        relationship: "Listed for information only.",
        published: "on",
      })
      expect(bad.ok).toBe(false)
      const good = await saveSupportContact(admin, null, {
        name: "Example Line",
        kind: "HELPLINE",
        description: "Example description",
        relationship: "Listed for information only.",
        verified: "on",
        verifiedNote: "Checked by phone",
        published: "on",
      })
      expect(good.ok).toBe(true)
      expect(await listPublicSupportContacts()).toHaveLength(1)
      await expect(saveSupportContact(editor, null, {})).rejects.toBeInstanceOf(ForbiddenError)
    })
  })

  describe("users", () => {
    it("never removes the last active administrator", async () => {
      await expect(updateStaffUser(admin, admin.id, { role: "EDITOR" })).rejects.toThrow(/at least one active administrator/)
      await expect(createStaffUser(coordinator, {})).rejects.toBeInstanceOf(ForbiddenError)
    })
  })

  describe("throttle", () => {
    it("blocks after the limit within the window", async () => {
      const results = []
      for (let i = 0; i < 4; i++) results.push(await hit("test-key", 3, 600))
      expect(results).toEqual([true, true, true, false])
    })
  })
})
