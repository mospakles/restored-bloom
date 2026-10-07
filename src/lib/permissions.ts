/**
 * Role-based permissions. This module is pure (no I/O) so it can be imported
 * anywhere and unit-tested. Enforcement happens server-side in the service
 * layer via `assertCan` (see src/server/actor.ts).
 */

export const ROLES = ["ADMIN", "EDITOR", "COORDINATOR"] as const
export type Role = (typeof ROLES)[number]

export const ROLE_LABELS: Record<Role, string> = {
  ADMIN: "Administrator",
  EDITOR: "Content editor",
  COORDINATOR: "Outreach coordinator",
}

export const PERMISSIONS = [
  "enquiries:read",
  "enquiries:update",
  "enquiries:delete",
  "enquiries:export",
  "notes:read",
  "notes:write",
  "resources:manage",
  "events:manage",
  "registrations:manage",
  "registrations:export",
  "content:manage",
  "support-contacts:manage",
  "subscribers:manage",
  "subscribers:export",
  "settings:manage",
  "users:manage",
  "audit:read",
  "retention:manage",
] as const
export type Permission = (typeof PERMISSIONS)[number]

const MATRIX: Record<Role, readonly Permission[]> = {
  ADMIN: PERMISSIONS,
  EDITOR: ["resources:manage", "events:manage", "content:manage", "subscribers:manage", "subscribers:export"],
  COORDINATOR: [
    "enquiries:read",
    "enquiries:update",
    "enquiries:export",
    "notes:read",
    "notes:write",
    "registrations:manage",
    "registrations:export",
  ],
}

export function isRole(value: unknown): value is Role {
  return typeof value === "string" && (ROLES as readonly string[]).includes(value)
}

export function can(role: string | null | undefined, permission: Permission): boolean {
  if (!isRole(role)) return false
  return MATRIX[role].includes(permission)
}

export function permissionsFor(role: string | null | undefined): Permission[] {
  return isRole(role) ? [...MATRIX[role]] : []
}
