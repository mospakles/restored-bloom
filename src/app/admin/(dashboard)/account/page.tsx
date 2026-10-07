import type { Metadata } from "next"
import { AdminHeader, Panel } from "@/components/admin/ui"
import { ChangePasswordForm } from "@/components/admin/forms"
import { ROLE_LABELS } from "@/lib/permissions"
import { requirePagePermission } from "@/server/session"
import { changePasswordAction } from "../../(auth)/actions"

export const metadata: Metadata = { title: "My account" }

export default async function AccountPage() {
  const actor = await requirePagePermission()
  return (
    <>
      <AdminHeader title="My account" description={`${actor.email} · ${ROLE_LABELS[actor.role]}`} />
      <Panel title="Change password" className="max-w-xl">
        <ChangePasswordForm action={changePasswordAction} />
      </Panel>
    </>
  )
}
