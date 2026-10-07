import type { Metadata } from "next"
import { AdminHeader, Panel, StatusBadge, Table, Td, Th } from "@/components/admin/ui"
import { CreateUserForm } from "@/components/admin/forms"
import { InlineAction, SelectAction } from "@/components/admin/inline-action"
import { isEmailConfigured } from "@/lib/env"
import { ROLE_LABELS, ROLES, isRole, permissionsFor } from "@/lib/permissions"
import { formatDate } from "@/lib/utils"
import { requirePagePermission } from "@/server/session"
import { listUsers } from "@/server/users"
import { createUserAction, updateUserAction } from "../actions"

export const metadata: Metadata = { title: "Users" }

export default async function UsersPage() {
  const actor = await requirePagePermission("users:manage")
  const users = await listUsers(actor)
  return (
    <>
      <AdminHeader title="Users" description="Staff accounts. There is no public registration — accounts are created here." />
      <Table caption="Staff users">
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Role</Th>
            <Th>Status</Th>
            <Th>
              <span className="sr-only">Actions</span>
            </Th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <Td>
                <span className="font-medium">{u.name}</span>
                {u.id === actor.id && <span className="ml-2 text-xs text-plum-500">(you)</span>}
                <span className="block text-plum-600">{u.email}</span>
                <span className="block text-xs text-plum-500">Added {formatDate(u.createdAt)}</span>
              </Td>
              <Td className="min-w-56">
                <SelectAction
                  action={updateUserAction}
                  fields={{ id: u.id }}
                  name="role"
                  label={`Role for ${u.name}`}
                  value={isRole(u.role) ? u.role : "COORDINATOR"}
                  options={ROLES.map((r) => ({ value: r, label: ROLE_LABELS[r] }))}
                />
              </Td>
              <Td>{u.active ? <StatusBadge status="CONFIRMED" label="Active" /> : <StatusBadge status="CANCELLED" label="Deactivated" />}</Td>
              <Td>
                {u.id !== actor.id &&
                  (u.active ? (
                    <InlineAction
                      action={updateUserAction}
                      fields={{ id: u.id, active: "false" }}
                      label="Deactivate"
                      variant="ghost"
                      confirm={`Deactivate ${u.name}? They will be signed out immediately.`}
                    />
                  ) : (
                    <InlineAction action={updateUserAction} fields={{ id: u.id, active: "true" }} label="Reactivate" variant="ghost" />
                  ))}
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <Panel title="Add a user">
          <CreateUserForm action={createUserAction} emailConfigured={isEmailConfigured()} />
        </Panel>
        <Panel title="What each role can do">
          <dl className="space-y-4 text-sm">
            {ROLES.map((r) => (
              <div key={r}>
                <dt className="font-semibold text-plum-900">{ROLE_LABELS[r]}</dt>
                <dd className="mt-1 text-plum-700">{permissionsFor(r).join(", ")}</dd>
              </div>
            ))}
          </dl>
        </Panel>
      </div>
    </>
  )
}
