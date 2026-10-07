import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { connection } from "next/server"
import { ResourceArticle } from "@/components/site/resource-article"
import { getPublishedResource } from "@/server/resources"

type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  await connection()
  const { slug } = await params
  const r = await getPublishedResource(slug)
  if (!r) return { title: "Resource not found" }
  return { title: r.title, description: r.summary, openGraph: { title: r.title, description: r.summary, type: "article" } }
}

export default async function ResourcePage({ params }: { params: Params }) {
  await connection()
  const { slug } = await params
  const resource = await getPublishedResource(slug)
  if (!resource) notFound()
  return <ResourceArticle resource={resource} />
}
