import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { AdminHeader, Panel } from "@/components/admin/ui"
import { SupportContactForm } from "@/components/admin/forms"
import { InlineAction } from "@/components/admin/inline-action"
import { prisma } from "@/lib/db"
import { requirePagePermission } from "@/server/session"
import { deleteSupportContactAction, saveSupportContactAction } from "../../actions"

export const metadata: Metadata = { title: "Edit support contact" }

export default async function EditSupportContactPage({ params }: { params: Promise<{ id: string }> }) {
  await requirePagePermission("support-contacts:manage")
  const { id } = await params
  const contact = await prisma.supportContact.findUnique({ where: { id } })
  if (!contact) notFound()
  return (
    <>
      <AdminHeader back={{ href: "/admin/support-contacts", label: "Support contacts" }} title={contact.name} />
      <Panel>
        <SupportContactForm action={saveSupportContactAction} contact={contact} />
      </Panel>
      <Panel title="Delete" className="mt-6">
        <InlineAction action={deleteSupportContactAction} fields={{ id: contact.id }} label="Delete contact" variant="danger" confirm="Delete this contact?" />
      </Panel>
    </>
  )
}
