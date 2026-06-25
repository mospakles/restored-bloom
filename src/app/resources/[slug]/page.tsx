import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Clock, Tag, Download, Share2 } from "lucide-react"
import { PageContainer, SectionWrapper } from "@/components/layout/section-wrapper"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SAMPLE_RESOURCES } from "@/lib/data"
import { notFound } from "next/navigation"

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const resource = SAMPLE_RESOURCES.find(r => r.slug === slug)
  if (!resource) return { title: "Resource Not Found" }
  return { title: resource.title, description: resource.excerpt }
}

const sampleContent = `
## Overview

This resource has been carefully prepared by our team of trauma-informed specialists to provide you with accurate, compassionate, and practical information.

## Understanding the Topic

Sexual trauma and abuse create ripple effects that can touch every area of a person's life, physical health, emotional wellbeing, relationships, spirituality, and sense of self. Understanding these effects is the first step toward healing.

### Common Responses to Trauma

Many survivors experience responses that may include:

- **Hypervigilance**, an ongoing state of alertness, as though danger is always present
- **Flashbacks and intrusive memories**, unwanted recollections of traumatic events
- **Avoidance**, steering clear of people, places, or situations that remind you of the trauma
- **Changes in mood**, including depression, anxiety, irritability, or emotional numbness
- **Physical symptoms**, including sleep disruption, fatigue, and somatic complaints

These responses are **not signs of weakness**. They are normal responses to abnormal experiences.

## The Path to Healing

Healing is not linear, it is a journey with peaks and valleys, progress and setbacks. And every step forward, however small, is significant.

### Evidence-Based Approaches

Research shows that the following approaches are effective for trauma recovery:

1. **Trauma-focused therapy**, approaches like EMDR, CPT, and TF-CBT help process traumatic memories safely
2. **Somatic work**, body-based approaches to release trauma stored in the nervous system
3. **Community and connection**, healing happens in relationship; isolation makes it harder
4. **Faith and spirituality**, for many survivors, spiritual resources provide profound comfort and meaning

## Practical Next Steps

1. Acknowledge that what happened was not your fault
2. Reach out to a trusted person or professional
3. Access one of the support resources on this page
4. Be patient and compassionate with yourself

## A Final Word

You are not broken. You are not defined by what was done to you. You are a whole person with profound worth, and healing, however long it takes, is possible for you.
`

export default async function ResourceDetailPage({ params }: Props) {
  const { slug } = await params
  const resource = SAMPLE_RESOURCES.find(r => r.slug === slug)
  if (!resource) notFound()

  const categoryColors: Record<string, "teal" | "lavender" | "blush" | "sage"> = {
    survivors: "teal", faith: "lavender", parents: "blush", teenagers: "sage", women: "lavender"
  }

  return (
    <>
      <div className="bg-stone-100 border-b border-stone-200 py-4">
        <PageContainer>
          <Link href="/resources" className="inline-flex items-center gap-2 text-sm text-teal-700 hover:text-teal-900 font-medium">
            <ArrowLeft className="h-4 w-4" /> Back to Resource Library
          </Link>
        </PageContainer>
      </div>

      <SectionWrapper className="bg-white">
        <PageContainer narrow>
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <Badge variant={categoryColors[resource.category] ?? "teal"} className="capitalize">{resource.category}</Badge>
            {resource.read_time && (
              <span className="flex items-center gap-1.5 text-sm text-stone-400"><Clock className="h-4 w-4" />{resource.read_time} min read</span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4 leading-tight">{resource.title}</h1>
          <p className="text-xl text-stone-500 mb-8 leading-relaxed">{resource.excerpt}</p>

          {resource.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8 pb-8 border-b border-stone-100">
              {resource.tags.map(tag => (
                <span key={tag} className="flex items-center gap-1 text-xs bg-stone-100 text-stone-600 px-2.5 py-1 rounded-full">
                  <Tag className="h-3 w-3" />#{tag}
                </span>
              ))}
            </div>
          )}

          <article className="prose prose-stone prose-lg max-w-none">
            {sampleContent.split('\n').map((line, i) => {
              if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold text-stone-900 mt-8 mb-3">{line.slice(3)}</h2>
              if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold text-stone-800 mt-6 mb-2">{line.slice(4)}</h3>
              if (line.startsWith('- **')) {
                const parts = line.slice(2).split('**')
                return <div key={i} className="flex gap-2 mb-1.5"><span className="text-teal-500 mt-1">•</span><p className="text-stone-600"><strong>{parts[1]}</strong>{parts[2]}</p></div>
              }
              if (line.match(/^\d+\. /)) return <p key={i} className="text-stone-600 mb-1.5 ml-4">{line}</p>
              if (line.trim()) return <p key={i} className="text-stone-600 leading-relaxed mb-4">{line}</p>
              return null
            })}
          </article>

          <div className="mt-10 pt-8 border-t border-stone-100 flex flex-wrap gap-3">
            {resource.downloadable && (
              <Button variant="outline"><Download className="h-4 w-4" />Download PDF</Button>
            )}
            <Button variant="outline"><Share2 className="h-4 w-4" />Share Resource</Button>
            <Button asChild><Link href="/get-help">Get Personal Support</Link></Button>
          </div>
        </PageContainer>
      </SectionWrapper>
    </>
  )
}
