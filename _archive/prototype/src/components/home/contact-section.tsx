"use client"

import { useState, useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import { ArrowRight, CheckCircle } from "lucide-react"
import { newsletterSchema, type NewsletterFormData } from "@/lib/validations"
import { CRISIS_LINES } from "@/lib/data"

export function ContactSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const [subscribed, setSubscribed] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema) as never,
  })

  const onSubmit = async (_data: NewsletterFormData) => {
    await new Promise((r) => setTimeout(r, 800))
    setSubscribed(true)
  }

  return (
    <section aria-label="Reach out" style={{ backgroundColor: "#FDFAF6" }}>

      {/* Faith & hope strip */}
      <div
        style={{
          backgroundColor: "#EDE3D2",
          backgroundImage: "radial-gradient(ellipse at 80% 50%, rgba(157,211,211,0.15) 0%, transparent 60%)",
        }}
        className="py-16 md:py-20"
      >
        <div className="max-w-3xl mx-auto px-6 sm:px-8 text-center">
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em] mb-6"
            style={{ color: "#259292", fontFamily: "Inter, sans-serif" }}
          >
            A Word of Hope
          </p>
          <blockquote>
            <p
              className="text-3xl md:text-4xl lg:text-5xl leading-tight mb-5"
              style={{
                fontFamily: "DM Serif Display, Playfair Display, Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                color: "#101F3C",
              }}
            >
              "The Lord is close to the brokenhearted and saves those who are crushed in spirit."
            </p>
            <footer
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: "#C29530", fontFamily: "Inter, sans-serif" }}
            >
              Psalm 34:18
            </footer>
          </blockquote>
        </div>
      </div>

      {/* Main CTA + Newsletter */}
      <div ref={ref} className="py-20 md:py-28" style={{ backgroundColor: "#101F3C" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left: Direct invitation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-[0.2em] mb-6"
                style={{ color: "#9DD3D3", fontFamily: "Inter, sans-serif" }}
              >
                We Are Here for You
              </p>
              <h2
                className="text-4xl md:text-5xl leading-tight mb-6"
                style={{
                  fontFamily: "DM Serif Display, Playfair Display, Georgia, serif",
                  fontWeight: 400,
                  color: "#FDFAF6",
                }}
              >
                Ready to take the first step?
              </h2>
              <p
                className="text-base leading-relaxed mb-10"
                style={{ color: "#7EA3D1", fontFamily: "Inter, sans-serif" }}
              >
                Reaching out takes courage. Whether you need immediate support, want to
                speak anonymously, or simply aren't ready yet — we are here, and we will
                still be here when you are.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-12">
                <Link
                  href="/get-help"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    backgroundColor: "#259292",
                    color: "#FDFAF6",
                    fontFamily: "Inter, sans-serif",
                    letterSpacing: "0.02em",
                  }}
                >
                  Get Help Now
                  <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold transition-all hover:bg-white/8"
                  style={{
                    border: "1.5px solid rgba(255,255,255,0.25)",
                    color: "rgba(253,250,246,0.85)",
                    fontFamily: "Inter, sans-serif",
                    letterSpacing: "0.02em",
                  }}
                >
                  Contact Us
                </Link>
              </div>

              {/* Crisis lines */}
              <div
                className="rounded-xl p-6 border"
                style={{
                  backgroundColor: "rgba(255,255,255,0.03)",
                  borderColor: "rgba(255,255,255,0.08)",
                }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-4"
                  style={{ color: "#EF9494", fontFamily: "Inter, sans-serif" }}
                >
                  Immediate Crisis Support
                </p>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {CRISIS_LINES.slice(0, 4).map((line) => (
                    <div key={line.country} className="text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                      <span style={{ color: "rgba(253,250,246,0.55)" }}>{line.country}: </span>
                      <span className="font-semibold" style={{ color: "#EF9494" }}>{line.number}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right: Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl p-9 md:p-10 border"
              style={{
                backgroundColor: "rgba(255,255,255,0.04)",
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              <h3
                className="text-2xl mb-2"
                style={{
                  fontFamily: "DM Serif Display, Playfair Display, Georgia, serif",
                  fontWeight: 400,
                  color: "#FDFAF6",
                }}
              >
                Stay connected.
              </h3>
              <p
                className="text-sm leading-relaxed mb-8"
                style={{ color: "#7EA3D1", fontFamily: "Inter, sans-serif" }}
              >
                Receive new resources, healing articles, community updates, and quiet
                words of encouragement. No spam — only hope.
              </p>

              {subscribed ? (
                <div
                  className="flex items-start gap-4 rounded-xl p-5"
                  style={{ backgroundColor: "rgba(37,144,144,0.12)", border: "1px solid rgba(37,144,144,0.3)" }}
                >
                  <CheckCircle className="h-5 w-5 shrink-0 mt-0.5" style={{ color: "#9DD3D3" }} />
                  <div>
                    <p className="font-semibold text-sm mb-1" style={{ color: "#FDFAF6", fontFamily: "Inter, sans-serif" }}>
                      You're subscribed.
                    </p>
                    <p className="text-xs" style={{ color: "#9DD3D3", fontFamily: "Inter, sans-serif" }}>
                      Thank you for joining our community. We look forward to walking with you.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                  <div>
                    <input
                      type="email"
                      placeholder="Your email address"
                      {...register("email")}
                      className="w-full px-5 py-3.5 rounded-xl text-sm outline-none transition-all"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.07)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        color: "#FDFAF6",
                        fontFamily: "Inter, sans-serif",
                      }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(157,211,211,0.5)" }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)" }}
                    />
                    {errors.email && (
                      <p className="text-xs mt-1.5" style={{ color: "#EF9494", fontFamily: "Inter, sans-serif" }}>
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 disabled:opacity-60"
                    style={{
                      backgroundColor: "#259292",
                      color: "#FDFAF6",
                      fontFamily: "Inter, sans-serif",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {isSubmitting ? "Subscribing…" : "Subscribe to Updates"}
                    {!isSubmitting && <ArrowRight className="h-4 w-4" strokeWidth={2.5} />}
                  </button>
                  <p
                    className="text-xs text-center"
                    style={{ color: "rgba(255,255,255,0.25)", fontFamily: "Inter, sans-serif" }}
                  >
                    We respect your privacy. Unsubscribe anytime.
                  </p>
                </form>
              )}

              <div
                className="mt-10 pt-8 border-t space-y-4"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "rgba(255,255,255,0.3)", fontFamily: "Inter, sans-serif" }}
                >
                  Also helpful
                </p>
                {[
                  { label: "Browse the Healing Library", href: "/resources" },
                  { label: "Read Anonymous Stories", href: "/anonymous-stories" },
                  { label: "FAQ — Common Questions", href: "/faq" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-between group"
                    style={{ color: "rgba(253,250,246,0.55)", fontFamily: "Inter, sans-serif" }}
                  >
                    <span className="text-sm group-hover:text-white transition-colors">{link.label}</span>
                    <ArrowRight
                      className="h-3.5 w-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                      strokeWidth={2}
                    />
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
