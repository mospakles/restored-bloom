import type { Metadata } from "next"
import { AdminHeader, Panel } from "@/components/admin/ui"
import { SettingsForm } from "@/components/admin/forms"
import { isEmailConfigured } from "@/lib/env"
import { requirePagePermission } from "@/server/session"
import { getSettings } from "@/server/settings"
import { saveSettingsAction } from "../actions"

export const metadata: Metadata = { title: "Site settings" }

export default async function SettingsPage() {
  await requirePagePermission("settings:manage")
  const settings = await getSettings()
  return (
    <>
      <AdminHeader title="Site settings" description="Contact details, founder biography, programme status and newsletter." />
      <Panel>
        <SettingsForm action={saveSettingsAction} settings={settings} emailConfigured={isEmailConfigured()} />
      </Panel>
    </>
  )
}
