import type { Metadata } from "next"
import Link from "next/link"
import { AdminHeader, EmptyState, Panel, StatusBadge, Table, Td, Th } from "@/components/admin/ui"
import { SupportContactForm } from "@/components/admin/forms"
import { Notice } from "@/components/ui/misc"
import { requirePagePermission } from "@/server/session"
import { listSupportContacts } from "@/server/pages"
import { saveSupportContactAction } from "../actions"

export const metadata: Metadata = { title: "Support contacts" }

export default async function SupportContactsPage({ searchParams }: { searchParams: Promise<{ created?: string }> }) {
  const actor = await requirePagePermission("support-contacts:manage")
  const { created } = await searchParams
  const contacts = await listSupportContacts(actor)
  return (
    <>
      <AdminHeader
        title="Support contacts"
        description="Helplines and organisations listed on the public Finding support page."
      />
      <Notice tone="warning" className="mb-6" title="Verify before publishing">
        Only verified and published contacts appear publicly. Check each phone number and website directly, record how
        it was verified, and have the founder review it. Do not describe an organisation as a partner without a formal
        agreement.
      </Notice>
      {created && (
        <Notice tone="success" className="mb-6" role="status">
          Contact added.
        </Notice>
      )}
      {contacts.length === 0 ? (
        <EmptyState title="No support contacts yet" />
      ) : (
        <Table caption="Support contacts">
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Type</Th>
              <Th>Verified</Th>
              <Th>Public</Th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c.id}>
                <Td>
                  <Link href={`/admin/support-contacts/${c.id}`} className="font-medium hover:underline">
                    {c.name}
                  </Link>
                </Td>
                <Td>{c.kind.charAt(0) + c.kind.slice(1).toLowerCase()}</Td>
                <Td>{c.verified ? <StatusBadge status="CONFIRMED" label="Verified" /> : <StatusBadge status="DRAFT" label="Not verified" />}</Td>
                <Td>{c.published ? <StatusBadge status="PUBLISHED" label="Shown" /> : <StatusBadge status="ARCHIVED" label="Hidden" />}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Panel title="Add a contact" className="mt-8">
        <SupportContactForm action={saveSupportContactAction} />
      </Panel>
    </>
  )
}
