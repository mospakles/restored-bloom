"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Heart } from "lucide-react"

const roles = [
  "Licensed Therapists",
  "Social Workers",
  "Medical Professionals",
  "Legal Advocates",
  "Faith Leaders",
  "Tech Volunteers",
]

const donationAmounts = ["₦5,000", "₦15,000", "₦50,000"]

export function VolunteerCTASection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      ref={ref}
      aria-label="Get involved"
      style={{ backgroundColor: "#F6F0E6" }}
      className="py-20 md:py-28"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-5">

          {/* Volunteer panel — photography-backed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-2xl"
            style={{ minHeight: "520px" }}
          >
            <Image
              src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=900&q=85"
              alt="Volunteers and counsellors gathered together, united in purpose"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to top, rgba(10,21,40,0.92) 0%, rgba(10,21,40,0.55) 55%, rgba(10,21,40,0.2) 100%)",
              }}
              aria-hidden="true"
            />

            {/* Content */}
            <div className="relative h-full flex flex-col justify-end p-9 md:p-10">
              <p
                className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
                style={{ color: "#9DD3D3", fontFamily: "Inter, sans-serif" }}
              >
                Join the Mission
              </p>
              <h2
                className="text-3xl md:text-4xl leading-tight mb-4"
                style={{
                  fontFamily: "DM Serif Display, Playfair Display, Georgia, serif",
                  fontWeight: 400,
                  color: "#FDFAF6",
                }}
              >
                Lend your skills.<br />
                <em style={{ color: "#E1C170" }}>Change a life.</em>
              </h2>
              <p
                className="text-sm leading-relaxed mb-7 max-w-sm"
                style={{ color: "rgba(253,250,246,0.65)", fontFamily: "Inter, sans-serif" }}
              >
                We are building a network of compassionate professionals who believe every survivor
                deserves support. Every skill is welcome.
              </p>

              {/* Role tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {roles.map((role) => (
                  <span
                    key={role}
                    className="text-xs font-medium px-3 py-1.5 rounded-full"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.10)",
                      color: "rgba(253,250,246,0.80)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {role}
                  </span>
                ))}
              </div>

              <Link
                href="/volunteer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold self-start transition-all duration-300 hover:scale-[1.02]"
                style={{
                  backgroundColor: "#259292",
                  color: "#FDFAF6",
                  fontFamily: "Inter, sans-serif",
                  letterSpacing: "0.02em",
                }}
              >
                Apply to Volunteer
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </Link>
            </div>
          </motion.div>

          {/* Donate panel — warm, cream */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-between p-9 md:p-10 rounded-2xl border"
            style={{
              backgroundColor: "#FDFAF6",
              borderColor: "#DDD0BA",
              minHeight: "520px",
            }}
          >
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-[0.2em] mb-5"
                style={{ color: "#9A4F44", fontFamily: "Inter, sans-serif" }}
              >
                Make a Difference
              </p>
              <h2
                className="text-3xl md:text-4xl leading-tight mb-5"
                style={{
                  fontFamily: "DM Serif Display, Playfair Display, Georgia, serif",
                  fontWeight: 400,
                  color: "#101F3C",
                }}
              >
                Support a survivor's path to healing.
              </h2>
              <p
                className="text-base leading-relaxed mb-9"
                style={{ color: "#4A5568", fontFamily: "Inter, sans-serif" }}
              >
                Every gift directly funds free counselling referrals, crisis support, and
                resource development for survivors who cannot afford care. No donation is
                too small to matter.
              </p>

              {/* Amount selector */}
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: "#6B7280", fontFamily: "Inter, sans-serif" }}
              >
                Choose an amount
              </p>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {donationAmounts.map((amount) => (
                  <button
                    key={amount}
                    className="py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      border: "1.5px solid #DDD0BA",
                      color: "#101F3C",
                      backgroundColor: "#F6F0E6",
                      fontFamily: "Inter, sans-serif",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#9A4F44"
                      e.currentTarget.style.color = "#9A4F44"
                      e.currentTarget.style.backgroundColor = "#FBF2F0"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#DDD0BA"
                      e.currentTarget.style.color = "#101F3C"
                      e.currentTarget.style.backgroundColor = "#F6F0E6"
                    }}
                  >
                    {amount}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Link
                href="/donate"
                className="w-full flex items-center justify-center gap-2.5 px-7 py-4 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-[1.01] mb-3"
                style={{
                  backgroundColor: "#9A4F44",
                  color: "#FDFAF6",
                  fontFamily: "Inter, sans-serif",
                  letterSpacing: "0.02em",
                }}
              >
                <Heart className="h-4 w-4 fill-current" strokeWidth={0} />
                Donate Now
              </Link>
              <p
                className="text-xs text-center"
                style={{ color: "#9CA3AF", fontFamily: "Inter, sans-serif" }}
              >
                All donations are secure and tax-deductible
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
