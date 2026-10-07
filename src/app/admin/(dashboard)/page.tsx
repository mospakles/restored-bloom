import Link from "next/link"
import { AdminHeader, EmptyState, Panel, StatusBadge } from "@/components/admin/ui"
import { Notice } from "@/components/ui/misc"
import { ENQUIRY_STATUS_LABELS, ENQUIRY_TYPE_LABELS } from "@/lib/enquiry-display"
import { isEmailConfigured } from "@/lib/env"
import { formatDateTime } from "@/lib/utils"
import { can } from "@/lib/permissions"
import { requirePagePermission } from "@/server/session"
import { dashboardOverview } from "@/server/operations"

function Stat({ label, value, href }: { label: string; value: number | string; href?: string }) {
  const body = (
    <>
      <span className="block text-3xl font-display text-plum-900">{value}</span>
      <span className="mt-1 block text-sm text-plum-700">{label}</span>
    </>
  )
  return href ? (
    <Link href={href} className="rounded-2xl border border-cream-300 bg-white p-5 transition-shadow hover:shadow-md">
      {body}
    </Link>
  ) : (
    <div className="rounded-2xl border border-cream-300 bg-white p-5">{body}</div>
  )
}

export default async function AdminHome({ searchParams }: { searchParams: Promise<{ denied?: string }> }) {
  const actor = await requirePagePermission()
  const { denied } = await searchParams
  const o = await dashboardOverview(actor)

  return (
    <>
      <AdminHeader title={`Welcome, ${actor.name.split(" ")[0]}`} description="All figures are live counts from the database." />
      {denied && (
        <Notice tone="warning" className="mb-6" role="alert">
          You don&apos;t have permission to view that page.
        </Notice>
      )}
      {!isEmailConfigured() && can(actor.role, "settings:manage") && (
        <Notice tone="warning" title="Email is not configured" className="mb-6">
          Notification emails, acknowledgements, password-reset links and the newsletter are disabled until SMTP
          settings are added. See the README.
        </Notice>
      )}

      {o.showEnquiries && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="New enquiries" value={o.newCount} href="/admin/enquiries?status=NEW" />
            <Stat label="Open and assigned to me" value={o.mine} href="/admin/enquiries?assigned=me" />
            <Stat label="Open outreach requests" value={o.openByType.OUTREACH ?? 0} href="/admin/enquiries?type=OUTREACH" />
            <Stat label="Open volunteer enquiries" value={o.openByType.VOLUNTEER ?? 0} href="/admin/enquiries?type=VOLUNTEER" />
          </div>
          <Panel title="Recent enquiries" className="mt-6" actions={<Link href="/admin/enquiries" className="text-sm font-semibold text-rose-700 hover:underline">View all</Link>}>
            {o.recent.length === 0 ? (
              <EmptyState title="No enquiries yet">Submissions from the website forms will appear here.</EmptyState>
            ) : (
              <ul className="divide-y divide-cream-200">
                {o.recent.map((e) => (
                  <li key={e.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
                    <Link href={`/admin/enquiries/${e.id}`} className="min-w-0 font-medium text-plum-900 hover:underline">
                      {e.organisation || e.name}{" "}
                      <span className="text-sm font-normal text-plum-600">· {ENQUIRY_TYPE_LABELS[e.type]} · {e.reference}</span>
                    </Link>
                    <span className="flex items-center gap-3 text-sm text-plum-600">
                      {formatDateTime(e.createdAt)}
                      <StatusBadge status={e.status} label={ENQUIRY_STATUS_LABELS[e.status]} />
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {o.showEvents && (
          <Panel title="Upcoming events">
            {o.upcoming.length === 0 ? (
              <p className="text-plum-700">No upcoming events.</p>
            ) : (
              <ul className="divide-y divide-cream-200">
                {o.upcoming.map((e) => (
                  <li key={e.id} className="flex items-center justify-between gap-3 py-3">
                    <div>
                      <p className="font-medium text-plum-900">{e.title}</p>
                      <p className="text-sm text-plum-600">{formatDateTime(e.startsAt)}</p>
                    </div>
                    <div className="text-right text-sm">
                      <StatusBadge status={e.status} />
                      <p className="mt-1 text-plum-700">
                        {e._count.registrations}
                        {e.capacity ? ` / ${e.capacity}` : ""} registered
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        )}
        {o.showContent && (
          <Panel title="Resources">
            <dl className="grid grid-cols-3 gap-4 text-center">
              {(["PUBLISHED", "DRAFT", "ARCHIVED"] as const).map((s) => (
                <div key={s}>
                  <dt className="text-sm text-plum-600">{s.charAt(0) + s.slice(1).toLowerCase()}</dt>
                  <dd className="font-display text-2xl text-plum-900">{o.resources[s] ?? 0}</dd>
                </div>
              ))}
            </dl>
            {o.subscribers !== null && (
              <p className="mt-4 border-t border-cream-200 pt-4 text-sm text-plum-700">
                Confirmed newsletter subscribers: <strong className="text-plum-900">{o.subscribers}</strong>
              </p>
            )}
          </Panel>
        )}
      </div>
    </>
  )
}
