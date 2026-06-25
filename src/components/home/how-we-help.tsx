"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const steps = [
  {
    number: "01",
    heading: "Reach out when you're ready.",
    body: "There is no wrong time and no wrong way to begin. Use our anonymous form, send an email, or simply read — on your own terms, at your own pace. We are here whenever you are.",
    accent: "#259292",
  },
  {
    number: "02",
    heading: "You will be heard, not judged.",
    body: "A compassionate team member responds to your specific situation. No scripts, no checklists — just a real person who listens, understands, and takes your experience seriously.",
    accent: "#5A7D55",
  },
  {
    number: "03",
    heading: "We connect you with the right support.",
    body: "Counsellors, therapists, support groups, medical guidance, or legal advocacy — we help you find the care that fits your situation, whether you want professional help or just a space to breathe.",
    accent: "#C29530",
  },
  {
    number: "04",
    heading: "Healing is a journey, not a destination.",
    body: "We walk with you at every step, not just the first one. Your pace is the right pace. And on the hardest days, we will still be here.",
    accent: "#9A4F44",
  },
]

export function HowWeHelpSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      aria-label="How we help"
      style={{ backgroundColor: "#F6F0E6" }}
      className="py-20 md:py-28"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16">
          {/* Sticky label column */}
          <div className="lg:col-span-4 mb-14 lg:mb-0">
            <div className="lg:sticky lg:top-28">
              <p
                className="text-xs font-semibold uppercase tracking-[0.2em] mb-6"
                style={{ color: "#259292", fontFamily: "Inter, sans-serif" }}
              >
                How It Works
              </p>
              <h2
                className="text-4xl md:text-5xl leading-[1.1] mb-6"
                style={{
                  fontFamily: "DM Serif Display, Playfair Display, Georgia, serif",
                  fontWeight: 400,
                  color: "#101F3C",
                }}
              >
                Your path to healing begins here.
              </h2>
              <p
                className="text-base leading-relaxed mb-8"
                style={{ color: "#6B7280", fontFamily: "Inter, sans-serif" }}
              >
                We understand that reaching out is one of the hardest things a survivor can
                do. We have designed every step of this experience around your safety and
                dignity.
              </p>
              <Link
                href="/get-help"
                className="inline-flex items-center gap-2 text-sm font-semibold group transition-all"
                style={{ color: "#1C7878", fontFamily: "Inter, sans-serif" }}
              >
                Get help now
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  strokeWidth={2.5}
                />
              </Link>
            </div>
          </div>

          {/* Steps column */}
          <div ref={ref} className="lg:col-span-8 space-y-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: 16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-8 py-10 border-b"
                style={{ borderColor: "#DDD0BA" }}
              >
                {/* Step number */}
                <div className="shrink-0 pt-1">
                  <span
                    className="text-xs font-bold tracking-widest"
                    style={{ color: "#C8B99E", fontFamily: "Inter, sans-serif" }}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div
                    className="h-0.5 w-6 mb-5"
                    style={{ backgroundColor: step.accent }}
                    aria-hidden="true"
                  />
                  <h3
                    className="text-2xl md:text-3xl mb-4 leading-tight"
                    style={{
                      fontFamily: "DM Serif Display, Playfair Display, Georgia, serif",
                      fontWeight: 400,
                      color: "#101F3C",
                    }}
                  >
                    {step.heading}
                  </h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: "#4A5568", fontFamily: "Inter, sans-serif" }}
                  >
                    {step.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
