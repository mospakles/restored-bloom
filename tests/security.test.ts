import { describe, expect, it } from "vitest"
import { can, permissionsFor } from "@/lib/permissions"
import { checkFormToken, createFormToken } from "@/lib/security"
import { csvCell, toCsv } from "@/lib/csv"
import { detectFileType, safeFilename } from "@/server/resources"
import { registrationAvailability } from "@/server/events"

describe("permissions", () => {
  it("gives administrators every permission", () => {
    expect(can("ADMIN", "users:manage")).toBe(true)
    expect(can("ADMIN", "enquiries:delete")).toBe(true)
  })

  it("keeps editors away from enquiries and private notes", () => {
    expect(can("EDITOR", "resources:manage")).toBe(true)
    expect(can("EDITOR", "enquiries:read")).toBe(false)
    expect(can("EDITOR", "notes:read")).toBe(false)
    expect(can("EDITOR", "users:manage")).toBe(false)
  })

  it("lets coordinators manage enquiries but not publish content or delete records", () => {
    expect(can("COORDINATOR", "enquiries:update")).toBe(true)
    expect(can("COORDINATOR", "notes:write")).toBe(true)
    expect(can("COORDINATOR", "resources:manage")).toBe(false)
    expect(can("COORDINATOR", "enquiries:delete")).toBe(false)
    expect(can("COORDINATOR", "settings:manage")).toBe(false)
  })

  it("denies unknown or missing roles", () => {
    expect(can("SUPERUSER", "enquiries:read")).toBe(false)
    expect(can(null, "enquiries:read")).toBe(false)
    expect(permissionsFor(undefined)).toEqual([])
  })
})

describe("form timing tokens", () => {
  it("accepts a token after the minimum fill time", () => {
    const t = createFormToken(1_000_000)
    expect(checkFormToken(t, 1_000_000 + 5_000)).toBe("ok")
  })
  it("rejects instant submissions, expired and tampered tokens", () => {
    const t = createFormToken(1_000_000)
    expect(checkFormToken(t, 1_000_500)).toBe("too-fast")
    expect(checkFormToken(t, 1_000_000 + 7 * 60 * 60 * 1000)).toBe("expired")
    expect(checkFormToken(t.replace(/^\d+/, "999999"), 1_010_000)).toBe("invalid")
    expect(checkFormToken(undefined)).toBe("invalid")
  })
})

describe("CSV export", () => {
  it("neutralises spreadsheet formulas and quotes special characters", () => {
    expect(csvCell("=HYPERLINK(\"x\")")).toBe(`"'=HYPERLINK(""x"")"`)
    expect(csvCell("@cmd")).toBe("'@cmd")
    expect(csvCell("a,b")).toBe('"a,b"')
    expect(csvCell(null)).toBe("")
  })
  it("writes a header row", () => {
    expect(toCsv([{ a: 1, b: "x" }])).toBe("﻿a,b\r\n1,x\r\n")
  })
})

describe("upload checks", () => {
  it("detects files by content, not extension", () => {
    expect(detectFileType(new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d]))?.mime).toBe("application/pdf")
    expect(detectFileType(new Uint8Array([0x89, 0x50, 0x4e, 0x47]))?.mime).toBe("image/png")
    expect(detectFileType(new TextEncoder().encode("<html><script>"))).toBeNull()
  })
  it("sanitises filenames", () => {
    expect(safeFilename('../../etc/"passwd".pdf', "pdf")).toBe("etcpasswd.pdf")
    expect(safeFilename("", "png")).toBe("download.png")
  })
})

describe("event availability", () => {
  const future = new Date(Date.now() + 86_400_000)
  const base = { status: "PUBLISHED" as const, registrationOpen: true, startsAt: future, capacity: 2 }
  it("reports remaining places", () => {
    expect(registrationAvailability(base, 1)).toEqual({ open: true, placesLeft: 1 })
    expect(registrationAvailability({ ...base, capacity: null }, 50)).toEqual({ open: true, placesLeft: null })
  })
  it("closes when full, past, cancelled, closed or unpublished", () => {
    expect(registrationAvailability(base, 2)).toEqual({ open: false, reason: "full" })
    expect(registrationAvailability({ ...base, startsAt: new Date(Date.now() - 1000) }, 0)).toEqual({ open: false, reason: "past" })
    expect(registrationAvailability({ ...base, status: "CANCELLED" }, 0)).toEqual({ open: false, reason: "cancelled" })
    expect(registrationAvailability({ ...base, registrationOpen: false }, 0)).toEqual({ open: false, reason: "closed" })
    expect(registrationAvailability({ ...base, status: "DRAFT" }, 0)).toEqual({ open: false, reason: "unpublished" })
  })
})
