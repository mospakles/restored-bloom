import type { Metadata } from "next"
import { AdminHeader, Panel } from "@/components/admin/ui"
import { ResourceForm } from "@/components/admin/forms"
import { requirePagePermission } from "@/server/session"
import { saveResourceAction } from "../../actions"

export const metadata: Metadata = { title: "New resource" }

export default async function NewResourcePage() {
  await requirePagePermission("resources:manage")
  return (
    <>
      <AdminHeader back={{ href: "/admin/resources", label: "Resources" }} title="New resource" description="New resources are saved as drafts." />
      <Panel>
        <ResourceForm action={saveResourceAction} />
      </Panel>
    </>
  )
}
