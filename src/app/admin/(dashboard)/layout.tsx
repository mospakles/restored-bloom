import { connection } from "next/server"
import { AdminShell, type NavItem } from "@/components/admin/shell"
import { can, ROLE_LABELS, type Permission } from "@/lib/permissions"
import { requirePagePermission } from "@/server/session"
import { signOutAction } from "../(auth)/actions"

const NAV: (NavItem & { permission?: Permission })[] = [
  { href: "/admin", label: "Overview", icon: "overview" },
  { href: "/admin/enquiries", label: "Enquiries", icon: "enquiries", permission: "enquiries:read" },
  { href: "/admin/events", label: "Events", icon: "events", permission: "events:manage" },
  { href: "/admin/registrations", label: "Registrations", icon: "registrations", permission: "registrations:manage" },
  { href: "/admin/resources", label: "Resources", icon: "resources", permission: "resources:manage" },
  { href: "/admin/content", label: "Pages & policies", icon: "content", permission: "content:manage" },
  { href: "/admin/support-contacts", label: "Support contacts", icon: "support", permission: "support-contacts:manage" },
  { href: "/admin/subscribers", label: "Subscribers", icon: "subscribers", permission: "subscribers:manage" },
  { href: "/admin/settings", label: "Site settings", icon: "settings", permission: "settings:manage" },
  { href: "/admin/users", label: "Users", icon: "users", permission: "users:manage" },
  { href: "/admin/audit", label: "Audit log", icon: "audit", permission: "audit:read" },
  { href: "/admin/data", label: "Data retention", icon: "data", permission: "retention:manage" },
  { href: "/admin/account", label: "My account", icon: "account" },
]

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  await connection()
  const actor = await requirePagePermission()
  const nav = NAV.filter((n) => !n.permission || can(actor.role, n.permission)).map(({ href, label, icon }) => ({
    href,
    label,
    icon,
  }))
  return (
    <AdminShell
      nav={nav}
      user={{ name: actor.name, roleLabel: ROLE_LABELS[actor.role] }}
      signOut={
        <form action={signOutAction}>
          <button type="submit" className="text-sm font-medium text-plum-700 hover:underline">
            Sign out
          </button>
        </form>
      }
    >
      {children}
    </AdminShell>
  )
}
