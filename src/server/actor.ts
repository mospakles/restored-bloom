import "server-only"
import { can, isRole, type Permission, type Role } from "@/lib/permissions"
import { prisma } from "@/lib/db"
import type { Prisma } from "@/generated/prisma/client"

export type Actor = { id: string; email: string; name: string; role: Role }

export class ForbiddenError extends Error {
  constructor(public permission: Permission) {
    super(`Forbidden: missing permission ${permission}`)
    this.name = "ForbiddenError"
  }
}

export class NotFoundError extends Error {
  constructor(what = "Record") {
    super(`${what} not found`)
    this.name = "NotFoundError"
  }
}

/** Throws unless the actor's role grants the permission. Call at the top of every protected service function. */
export function assertCan(actor: Actor | null | undefined, permission: Permission): asserts actor is Actor {
  if (!actor || !isRole(actor.role) || !can(actor.role, permission)) throw new ForbiddenError(permission)
}

/**
 * Records an administrative action. `metadata` must never contain submission
 * contents — only identifiers, statuses and changed field names.
 */
export async function audit(
  actor: Actor | null,
  action: string,
  entityType: string,
  entityId?: string | null,
  metadata?: Prisma.InputJsonValue,
  tx: Prisma.TransactionClient = prisma,
) {
  await tx.auditLog.create({
    data: {
      actorId: actor?.id ?? null,
      actorEmail: actor?.email ?? null,
      action,
      entityType,
      entityId: entityId ?? null,
      metadata: metadata ?? undefined,
    },
  })
}
