import "server-only"
import { cache } from "react"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { can, isRole, type Permission } from "@/lib/permissions"
import { ForbiddenError, type Actor } from "@/server/actor"

/**
 * Returns the signed-in staff member, re-read from the database so that role
 * changes and deactivation take effect immediately.
 */
export const getActor = cache(async (): Promise<Actor | null> => {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return null
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, email: true, name: true, role: true, active: true },
  })
  if (!user || !user.active || !isRole(user.role)) return null
  return { id: user.id, email: user.email, name: user.name, role: user.role }
})

/** For pages: redirects to sign-in when signed out, and to the dashboard home when not permitted. */
export async function requirePagePermission(permission?: Permission): Promise<Actor> {
  const actor = await getActor()
  if (!actor) redirect("/admin/sign-in")
  if (permission && !can(actor.role, permission)) redirect("/admin?denied=1")
  return actor
}

/** For server actions and route handlers: throws instead of redirecting. */
export async function requireActor(permission?: Permission): Promise<Actor> {
  const actor = await getActor()
  if (!actor) throw new ForbiddenError(permission ?? "enquiries:read")
  if (permission && !can(actor.role, permission)) throw new ForbiddenError(permission)
  return actor
}
