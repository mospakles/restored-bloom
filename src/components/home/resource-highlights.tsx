"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SAMPLE_RESOURCES } from "@/lib/data"

const categoryLabels: Record<string, string> = {
  survivors: "Survivors",
  faith: "Faith & Healing",
  parents: "Parents",
  teenagers: "Teenagers",
  women: "Women's Health",
  "sexual-health": "Sexual Health",
}

const categoryAccents: Record<string, string> = {
  survivors: "#259292",
  faith: "#C29530",
  parents: "#9A4F44",
  teenagers: "#5A7D55",
  women: "#7A5AA0",
  "sexual-health": "#259292",
}

export function ResourceHighlightsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  const [lead, ...rest] = SAMPLE_RESOURCES.slice(0, 5)
  const secondary = rest.slice(0, 4)

  return (
    <section
      aria-label="Healing library"
      style={{ backgroundColor: "#FDFAF6" }}
      className="py-20 md:py-28"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
              style={{ color: "#259292", fontFamily: "Inter, sans-serif" }}
            >
              Healing Library
            </p>
            <h2
              className="text-4xl md:text-5xl leading-[1.1]"
              style={{
                fontFamily: "DM Serif Display, Playfair Display, Georgia, serif",
                fontWeight: 400,
                color: "#101F3C",
              }}
            >
              Resources for every story.
            </h2>
          </div>
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-sm font-semibold group shrink-0 transition-all"
            style={{ color: "#1C7878", fontFamily: "Inter, sans-serif" }}
          >
            Browse all resources
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              strokeWidth={2.5}
            />
          </Link>
        </div>

        <div ref={ref} className="grid lg:grid-cols-12 gap-5">
          {/* Lead article — editorial large card */}
          {lead && (
            <motion.article
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5"
            >
              <Link
                href={`/resources/${lead.slug}`}
                className="group flex flex-col h-full rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-lg"
                style={{ backgroundColor: "#F6F0E6", borderColor: "#DDD0BA" }}
                aria-label={`Read: ${lead.title}`}
              >
                {/* Large colour block header */}
                <div
                  className="h-48 flex items-end px-8 pb-7 relative"
                  style={{
                    backgroundColor: categoryAccents[lead.category] ?? "#259292",
                    backgroundImage: "radial-gradient(ellipse at top right, rgba(255,255,255,0.12) 0%, transparent 60%)",
                  }}
                >
                  <span
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: "rgba(255,255,255,0.7)", fontFamily: "Inter, sans-serif" }}
                  >
                    {categoryLabels[lead.category] ?? lead.category}
                  </span>
                </div>

                <div className="flex flex-col flex-1 p-8">
                  <h3
                    className="text-2xl md:text-3xl leading-tight mb-4 group-hover:opacity-80 transition-opacity"
                    style={{
                      fontFamily: "DM Serif Display, Playfair Display, Georgia, serif",
                      fontWeight: 400,
                      color: "#101F3C",
                    }}
                  >
                    {lead.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed flex-1 mb-6"
                    style={{ color: "#6B7280", fontFamily: "Inter, sans-serif" }}
                  >
                    {lead.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span
                      className="inline-flex items-center gap-2 text-sm font-semibold"
                      style={{ color: categoryAccents[lead.category] ?? "#259292", fontFamily: "Inter, sans-serif" }}
                    >
                      Read article
                      <ArrowRight
                        className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                        strokeWidth={2.5}
                      />
                    </span>
                    {lead.read_time && (
                      <span
                        className="text-xs"
                        style={{ color: "#9CA3AF", fontFamily: "Inter, sans-serif" }}
                      >
                        {lead.read_time} min read
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.article>
          )}

          {/* Secondary articles — compact list */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {secondary.map((resource, i) => (
              <motion.article
                key={resource.id}
                initial={{ opacity: 0, x: 16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.08 + i * 0.09, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={`/resources/${resource.slug}`}
                  className="group flex items-start gap-5 p-6 rounded-2xl border transition-all duration-300 hover:shadow-md hover:border-opacity-60"
                  style={{ backgroundColor: "#F6F0E6", borderColor: "#DDD0BA" }}
                  aria-label={`Read: ${resource.title}`}
                >
                  {/* Category accent bar */}
                  <div
                    className="w-1 rounded-full shrink-0 self-stretch"
                    style={{ backgroundColor: categoryAccents[resource.category] ?? "#259292", minHeight: "2.5rem" }}
                    aria-hidden="true"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <span
                        className="text-xs font-semibold uppercase tracking-widest"
                        style={{
                          color: categoryAccents[resource.category] ?? "#259292",
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        {categoryLabels[resource.category] ?? resource.category}
                      </span>
                      {resource.read_time && (
                        <span
                          className="text-xs shrink-0"
                          style={{ color: "#9CA3AF", fontFamily: "Inter, sans-serif" }}
                        >
                          {resource.read_time} min
                        </span>
                      )}
                    </div>
                    <h3
                      className="text-base font-medium leading-snug mb-1.5 group-hover:opacity-75 transition-opacity"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        color: "#101F3C",
                        fontWeight: 600,
                      }}
                    >
                      {resource.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed line-clamp-2"
                      style={{ color: "#6B7280", fontFamily: "Inter, sans-serif" }}
                    >
                      {resource.excerpt}
                    </p>
                  </div>

                  <ArrowRight
                    className="h-4 w-4 shrink-0 mt-1 opacity-30 group-hover:opacity-70 group-hover:translate-x-0.5 transition-all duration-200"
                    style={{ color: "#101F3C" }}
                    strokeWidth={2}
                  />
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
