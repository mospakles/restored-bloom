/**
 * CSV helpers. Cells beginning with characters that spreadsheet apps treat as
 * formulas are prefixed with an apostrophe to prevent CSV/formula injection.
 */
export function csvCell(value: unknown): string {
  let s = value == null ? "" : String(value)
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`
  if (/[",\n\r]/.test(s)) s = `"${s.replace(/"/g, '""')}"`
  return s
}

export function toCsv(rows: Record<string, unknown>[], headers?: string[]): string {
  const cols = headers ?? (rows[0] ? Object.keys(rows[0]) : [])
  const lines = [cols.map(csvCell).join(","), ...rows.map((r) => cols.map((c) => csvCell(r[c])).join(","))]
  return "﻿" + lines.join("\r\n") + "\r\n"
}
