import type { Metadata } from "next"
import Link from "next/link"
import { Download } from "lucide-react"
import { AdminHeader, EmptyState, StatusBadge, Table, Td, Th } from "@/components/admin/ui"
import { InlineAction } from "@/components/admin/inline-action"
import { buttonVariants } from "@/components/ui/button"
import { Notice } from "@/components/ui/misc"
import { can } from "@/lib/permissions"
import { cn, formatDateTime } from "@/lib/utils"
import { requirePagePermission } from "@/server/session"
import { isNewsletterAvailable, listSubscribers } from "@/server/newsletter"
import { deleteSubscriberAction } from "../actions"

export const metadata: Metadata = { title: "Subscribers" }

export default async function SubscribersPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const actor = await requirePagePermission("subscribers:manage")
  const { status } = await searchParams
  const [{ items, counts }, available] = await Promise.all([listSubscribers(actor, status), isNewsletterAvailable()])
  const tabs = [
    ["", "All"],
    ["SUBSCRIBED", `Confirmed (${counts.SUBSCRIBED ?? 0})`],
    ["PENDING", `Awaiting confirmation (${counts.PENDING ?? 0})`],
    ["UNSUBSCRIBED", `Unsubscribed (${counts.UNSUBSCRIBED ?? 0})`],
  ] as const
  return (
    <>
      <AdminHeader
        title="Newsletter subscribers"
        description="Double opt-in: people are only counted as subscribed after confirming by email."
        actions={
          can(actor.role, "subscribers:export") && (
            <a href="/api/admin/export?kind=subscribers" className={buttonVariants({ variant: "outline", size: "sm" })}>
              <Download className="h-4 w-4" aria-hidden="true" /> Export confirmed
            </a>
          )
        }
      />
      {!available && (
        <Notice tone="info" className="mb-6">
          The signup form is currently hidden from the website (it needs email configured and the newsletter enabled in
          Site settings).
        </Notice>
      )}
      <nav aria-label="Filter subscribers" className="mb-6 flex flex-wrap gap-2">
        {tabs.map(([value, label]) => (
          <Link
            key={value}
            href={value ? `/admin/subscribers?status=${value}` : "/admin/subscribers"}
            aria-current={(status ?? "") === value ? "page" : undefined}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium",
              (status ?? "") === value ? "border-plum-800 bg-plum-800 text-cream-50" : "border-cream-300 bg-white text-plum-800",
            )}
          >
            {label}
          </Link>
        ))}
      </nav>
      {items.length === 0 ? (
        <EmptyState title="No subscribers" />
      ) : (
        <Table caption="Subscribers">
          <thead>
            <tr>
              <Th>Email</Th>
              <Th>Status</Th>
              <Th>Consent recorded</Th>
              <Th>
                <span className="sr-only">Actions</span>
              </Th>
            </tr>
          </thead>
          <tbody>
            {items.map((s) => (
              <tr key={s.id}>
                <Td>{s.email}</Td>
                <Td>
                  <StatusBadge status={s.status} />
                </Td>
                <Td className="whitespace-nowrap">
                  {formatDateTime(s.consentAt)} <span className="text-plum-500">(v{s.consentVersion})</span>
                </Td>
                <Td>
                  <InlineAction
                    action={deleteSubscriberAction}
                    fields={{ id: s.id }}
                    label="Delete"
                    variant="ghost"
                    confirm={`Delete ${s.email} permanently (e.g. for a data deletion request)?`}
                  />
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}
