"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SAMPLE_STORIES } from "@/lib/data"

const categoryLabels: Record<string, string> = {
  "adult-survivor": "Adult Survivor",
  "teen-survivor": "Teen Survivor",
  "male-survivor": "Male Survivor",
  parent: "Parent",
  caregiver: "Caregiver",
  "faith-journey": "Faith Journey",
  recovery: "Recovery",
}

export function FeaturedStoriesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  const featured = SAMPLE_STORIES.slice(0, 3)

  return (
    <section
      aria-label="Survivor stories"
      style={{ backgroundColor: "#101F3C" }}
      className="py-20 md:py-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em] mb-5"
              style={{ color: "#9DD3D3", fontFamily: "Inter, sans-serif" }}
            >
              Anonymous Story Wall
            </p>
            <h2
              className="text-4xl md:text-5xl leading-[1.1]"
              style={{
                fontFamily: "DM Serif Display, Playfair Display, Georgia, serif",
                fontWeight: 400,
                color: "#FDFAF6",
              }}
            >
              You are{" "}
              <em style={{ color: "#E1C170" }}>not alone.</em>
            </h2>
          </div>
          <p
            className="text-sm leading-relaxed max-w-xs md:text-right"
            style={{ color: "#7EA3D1", fontFamily: "Inter, sans-serif" }}
          >
            Shared anonymously by people on their healing journey. Each one a reminder that hope is real.
          </p>
        </div>

        {/* Story cards — editorial scale, not tiny tiles */}
        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {featured.map((story, i) => (
            <motion.article
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.13, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col rounded-2xl p-8 md:p-9"
              style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              aria-label={`Anonymous story from a ${categoryLabels[story.category] ?? story.category}`}
            >
              {/* Category + trigger warning */}
              <div className="flex items-center justify-between gap-3 mb-6">
                <span
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "#9DD3D3", fontFamily: "Inter, sans-serif" }}
                >
                  {categoryLabels[story.category] ?? story.category}
                </span>
                {story.trigger_warning && (
                  <span
                    className="text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: "rgba(225,193,112,0.12)",
                      color: "#E1C170",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    Trigger warning
                  </span>
                )}
              </div>

              {/* Large opening quote mark */}
              <div
                className="text-6xl leading-none mb-3 -mt-2 select-none"
                style={{
                  fontFamily: "DM Serif Display, Playfair Display, Georgia, serif",
                  color: "rgba(157,211,211,0.25)",
                }}
                aria-hidden="true"
              >
                &ldquo;
              </div>

              {/* Story excerpt */}
              <blockquote className="flex-1 mb-7">
                <p
                  className="text-base leading-relaxed"
                  style={{
                    fontFamily: "DM Serif Display, Playfair Display, Georgia, serif",
                    fontStyle: "italic",
                    color: "rgba(253,250,246,0.80)",
                    fontWeight: 400,
                  }}
                >
                  {story.content.length > 220
                    ? `${story.content.slice(0, 220).trim()}…`
                    : story.content}
                </p>
              </blockquote>

              {/* Footer */}
              <div
                className="pt-5 border-t flex items-center justify-between"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                <span
                  className="text-xs"
                  style={{ color: "rgba(255,255,255,0.35)", fontFamily: "Inter, sans-serif" }}
                >
                  {story.helpful_count} people found this helpful
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/anonymous-stories"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-[1.02]"
            style={{
              backgroundColor: "#259292",
              color: "#FDFAF6",
              fontFamily: "Inter, sans-serif",
              letterSpacing: "0.02em",
            }}
          >
            Read More Stories
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </Link>
          <Link
            href="/anonymous-stories#submit"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold transition-all hover:bg-white/8"
            style={{
              border: "1.5px solid rgba(255,255,255,0.25)",
              color: "rgba(253,250,246,0.85)",
              fontFamily: "Inter, sans-serif",
              letterSpacing: "0.02em",
            }}
          >
            Share Your Story Anonymously
          </Link>
        </div>
      </div>
    </section>
  )
}
