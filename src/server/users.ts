import "server-only"
import { z } from "zod"
import { auth, PASSWORD_MIN_LENGTH } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { env, isEmailConfigured } from "@/lib/env"
import { ROLES } from "@/lib/permissions"
import { randomToken } from "@/lib/security"
import { flattenErrors } from "@/lib/validation"
import { assertCan, audit, NotFoundError, type Actor } from "@/server/actor"

export async function listUsers(actor: Actor) {
  assertCan(actor, "users:manage")
  return prisma.user.findMany({
    orderBy: [{ active: "desc" }, { name: "asc" }],
    select: { id: true, name: true, email: true, role: true, active: true, createdAt: true },
  })
}

const createInput = z.object({
  name: z.string().trim().min(2, "Name is required").max(120),
  email: z.string().trim().toLowerCase().pipe(z.email("Enter a valid email address")),
  role: z.enum(ROLES, "Choose a role"),
  password: z
    .string()
    .optional()
    .transform((v) => v || undefined)
    .pipe(z.string().min(PASSWORD_MIN_LENGTH, `Use at least ${PASSWORD_MIN_LENGTH} characters`).max(128).optional()),
})

/**
 * Low-level account creation shared by the dashboard and the CLI scripts.
 * Does not check permissions — callers must.
 */
export async function createAccount(data: { name: string; email: string; role: string; password: string }) {
  const ctx = await auth.$context
  const hash = await ctx.password.hash(data.password)
  const user = await ctx.internalAdapter.createUser({
    name: data.name,
    email: data.email.toLowerCase(),
    emailVerified: true,
    role: data.role,
    active: true,
  }, { method: "admin" })
  await ctx.internalAdapter.linkAccount({
    userId: user.id,
    providerId: "credential",
    accountId: user.id,
    password: hash,
  })
  return user
}

export async function setAccountPassword(userId: string, password: string) {
  const ctx = await auth.$context
  const hash = await ctx.password.hash(password)
  const accounts = await ctx.internalAdapter.findAccounts(userId)
  if (accounts.some((a) => a.providerId === "credential")) await ctx.internalAdapter.updatePassword(userId, hash)
  else await ctx.internalAdapter.linkAccount({ userId, providerId: "credential", accountId: userId, password: hash })
  await prisma.session.deleteMany({ where: { userId } })
}

export async function createStaffUser(actor: Actor, input: Record<string, unknown>) {
  assertCan(actor, "users:manage")
  const parsed = createInput.safeParse(input)
  if (!parsed.success) return { ok: false as const, errors: flattenErrors(parsed.error) }
  const { name, email, role, password } = parsed.data
  if (!password && !isEmailConfigured()) {
    return {
      ok: false as const,
      errors: { password: "Email is not configured, so set an initial password and share it securely." },
    }
  }
  if (await prisma.user.findUnique({ where: { email } })) {
    return { ok: false as const, errors: { email: "A user with this email already exists" } }
  }
  const user = await createAccount({ name, email, role, password: password ?? randomToken(24) })
  await audit(actor, "user.create", "User", user.id, { role })
  if (!password) {
    await auth.api.requestPasswordReset({ body: { email, redirectTo: `${env.siteUrl}/admin/reset-password` } })
  }
  return { ok: true as const, invited: !password }
}

async function activeAdminCount() {
  return prisma.user.count({ where: { role: "ADMIN", active: true } })
}

export async function updateStaffUser(actor: Actor, userId: string, changes: { role?: string; active?: boolean }) {
  assertCan(actor, "users:manage")
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) throw new NotFoundError("User")
  const role = changes.role ?? user.role
  const active = changes.active ?? user.active
  if (!(ROLES as readonly string[]).includes(role)) throw new Error("Invalid role")
  const losingAdmin = user.role === "ADMIN" && user.active && (role !== "ADMIN" || !active)
  if (losingAdmin && (await activeAdminCount()) <= 1) {
    throw new Error("There must always be at least one active administrator")
  }
  if (userId === actor.id && !active) throw new Error("You cannot deactivate your own account")
  await prisma.user.update({ where: { id: userId }, data: { role, active } })
  if (!active) await prisma.session.deleteMany({ where: { userId } })
  await audit(actor, "user.update", "User", userId, { role, active })
}
