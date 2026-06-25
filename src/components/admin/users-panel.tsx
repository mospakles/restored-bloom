"use client"

import { useState } from "react"
import { Search, MoreVertical, Shield, User, ShieldAlert, CheckCircle, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AdminUser {
  id: string
  name: string
  email: string
  role: "user" | "admin" | "moderator" | "volunteer"
  status: "active" | "suspended"
  joined: string
  requests: number
}

const MOCK_USERS: AdminUser[] = [
  { id: "1", name: "Amaka Obi", email: "amaka@example.com", role: "user", status: "active", joined: "2025-03-12", requests: 2 },
  { id: "2", name: "Dr. Bola Adeyemi", email: "bola.a@example.com", role: "volunteer", status: "active", joined: "2025-02-28", requests: 0 },
  { id: "3", name: "Fatima Hassan", email: "fatima@example.com", role: "user", status: "active", joined: "2025-04-05", requests: 3 },
  { id: "4", name: "Chukwuemeka Eze", email: "emeka@example.com", role: "moderator", status: "active", joined: "2025-01-10", requests: 0 },
  { id: "5", name: "Grace Williams", email: "grace.w@example.com", role: "user", status: "suspended", joined: "2025-05-22", requests: 1 },
]

const roleConfig = {
  user: { label: "User", variant: "secondary" as const },
  admin: { label: "Admin", variant: "red" as const },
  moderator: { label: "Moderator", variant: "amber" as const },
  volunteer: { label: "Volunteer", variant: "teal" as const },
}

export function UsersManagementPanel() {
  const [users, setUsers] = useState(MOCK_USERS)
  const [search, setSearch] = useState("")
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  const toggleStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: u.status === "active" ? "suspended" : "active" } : u))
    )
  }

  const filtered = users.filter(
    (u) =>
      !search ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
          <input
            type="search"
            placeholder="Search users by name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 border-b border-stone-100">
            <tr>
              <th className="text-left px-5 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider">User</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider hidden md:table-cell">Role</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider hidden lg:table-cell">Joined</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider hidden lg:table-cell">Requests</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider">Status</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filtered.map((user) => {
              const role = roleConfig[user.role]
              return (
                <tr key={user.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-teal-50 rounded-full flex items-center justify-center text-teal-700 font-semibold text-sm shrink-0">
                        {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-medium text-stone-900">{user.name}</p>
                        <p className="text-xs text-stone-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <Badge variant={role.variant}>{role.label}</Badge>
                  </td>
                  <td className="px-5 py-4 text-stone-500 hidden lg:table-cell">{user.joined}</td>
                  <td className="px-5 py-4 text-stone-500 hidden lg:table-cell">{user.requests}</td>
                  <td className="px-5 py-4">
                    <div className={cn(
                      "inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full",
                      user.status === "active" ? "bg-teal-50 text-teal-700" : "bg-red-50 text-red-600"
                    )}>
                      {user.status === "active" ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="relative">
                      <button
                        onClick={() => setOpenMenu(openMenu === user.id ? null : user.id)}
                        className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-600 transition-colors"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                      {openMenu === user.id && (
                        <div className="absolute right-0 top-8 w-44 bg-white rounded-xl border border-stone-200 shadow-lg z-10 py-1">
                          <button
                            onClick={() => { toggleStatus(user.id); setOpenMenu(null) }}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-stone-50 transition-colors flex items-center gap-2"
                          >
                            {user.status === "active" ? (
                              <><ShieldAlert className="h-4 w-4 text-red-500" />Suspend User</>
                            ) : (
                              <><Shield className="h-4 w-4 text-teal-500" />Reinstate User</>
                            )}
                          </button>
                          <button
                            onClick={() => setOpenMenu(null)}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-stone-50 transition-colors flex items-center gap-2"
                          >
                            <User className="h-4 w-4 text-stone-400" />View Profile
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-stone-400">
            <p>No users found.</p>
          </div>
        )}
      </div>
    </div>
  )
}
