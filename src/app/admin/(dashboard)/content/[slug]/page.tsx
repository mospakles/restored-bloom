import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { AdminHeader, Panel } from "@/components/admin/ui"
import { PageForm } from "@/components/admin/forms"
import { requirePagePermission } from "@/server/session"
import { getPage, isEditableSlug } from "@/server/pages"
import { savePageAction } from "../../actions"

export const metadata: Metadata = { title: "Edit page" }

export default async function EditPage({ params }: { params: Promise<{ slug: string }> }) {
  await requirePagePermission("content:manage")
  const { slug } = await params
  if (!isEditableSlug(slug)) notFound()
  const page = await getPage(slug)
  return (
    <>
      <AdminHeader
        back={{ href: "/admin/content", label: "Pages & policies" }}
        title={page.title}
        description={
          <Link href={page.path} target="_blank" className="text-rose-700 hover:underline">
            View {page.path}
          </Link>
        }
      />
      <Panel>
        <PageForm action={savePageAction} page={page} />
      </Panel>
    </>
  )
}
