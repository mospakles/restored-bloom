"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"


const values = [
  { title: "Compassion", description: "Every person who comes to us is met with unconditional warmth and zero judgment." },
  { title: "Confidentiality", description: "Your privacy is sacred. What you share with us stays with us, always." },
  { title: "Safety", description: "We build spaces — physical and digital — where you can exhale and be honest." },
  { title: "Advocacy", description: "We speak up for survivors and push for systemic change in our communities." },
  { title: "Hope", description: "We believe healing is possible for everyone, no matter where you are right now." },
  { title: "Faith", description: "Rooted in the belief that restoration and wholeness are available to all who seek them." },
]

export function MissionSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const imageRef = useRef(null)
  const imageInView = useInView(imageRef, { once: true, margin: "-60px" })

  return (
    <section
      ref={ref}
      aria-label="Our mission"
      className="overflow-hidden"
      style={{ backgroundColor: "#FDFAF6" }}
    >
      {/* Part 1 — Narrative prose */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-20 md:py-28">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs font-semibold uppercase tracking-[0.2em] mb-8"
            style={{ color: "#259292", fontFamily: "Inter, sans-serif" }}
          >
            Our Story
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-8"
            style={{
              fontFamily: "DM Serif Display, Playfair Display, Georgia, serif",
              fontWeight: 400,
              color: "#101F3C",
            }}
          >
            Built for those who have suffered{" "}
            <em style={{ color: "#5A7D55" }}>in silence.</em>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.18, duration: 0.7 }}
            className="space-y-5 mb-10"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <p className="text-lg leading-relaxed" style={{ color: "#4A5568" }}>
              Restored Bloom was born from a deep conviction that no survivor should have
              to navigate trauma, shame, or confusion without support. We have seen what
              isolation does. We have heard what silence costs.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "#6B7280" }}>
              We exist to provide hope, healing, access, and advocacy for those suffering
              in silence due to sexual abuse, exploitation, stigma, or fear — to be the
              community that says: we see you, we believe you, and we will walk with you.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.28, duration: 0.6 }}
          >
            <Link
              href="/mission"
              className="inline-flex items-center gap-2 text-sm font-semibold group transition-all"
              style={{ color: "#1C7878", fontFamily: "Inter, sans-serif" }}
            >
              Read the full mission
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                strokeWidth={2.5}
              />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Part 2 — Full-width photography with scripture quote */}
      <div ref={imageRef} className="relative h-120 md:h-140 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=85"
          alt="A group of women gathered in support, sitting together in warm light"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Overlay — dark but warm */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(10,21,40,0.82) 0%, rgba(10,21,40,0.65) 60%, rgba(10,21,40,0.78) 100%)" }}
          aria-hidden="true"
        />

        {/* Quote panel */}
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 w-full">
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              animate={imageInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl"
            >
              <p
                className="text-3xl md:text-4xl lg:text-5xl leading-tight mb-6"
                style={{
                  fontFamily: "DM Serif Display, Playfair Display, Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "#FDFAF6",
                }}
              >
                "He heals the brokenhearted and binds up their wounds."
              </p>
              <footer>
                <p
                  className="text-sm font-semibold uppercase tracking-widest"
                  style={{ color: "#E1C170", fontFamily: "Inter, sans-serif" }}
                >
                  Psalm 147:3
                </p>
              </footer>
            </motion.blockquote>
          </div>
        </div>
      </div>

      {/* Part 3 — Values (editorial, not icon-card grid) */}
      <div style={{ backgroundColor: "#F6F0E6" }} className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em] mb-12"
            style={{ color: "#259292", fontFamily: "Inter, sans-serif" }}
          >
            What We Stand For
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.06 * i, duration: 0.55 }}
              >
                <div
                  className="h-px w-8 mb-5"
                  style={{ backgroundColor: "#9DD3D3" }}
                  aria-hidden="true"
                />
                <h3
                  className="text-xl mb-3"
                  style={{
                    fontFamily: "DM Serif Display, Playfair Display, Georgia, serif",
                    fontWeight: 400,
                    color: "#101F3C",
                  }}
                >
                  {value.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#6B7280", fontFamily: "Inter, sans-serif" }}
                >
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
