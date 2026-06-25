"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const categories = [
  {
    href: "/sexual-abuse-support",
    label: "For Survivors",
    heading: "Sexual Abuse\nSupport",
    body: "A trauma-informed space for adult and teen survivors. Confidential resources, counsellor referrals, and a community that believes you.",
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Soft natural light through a window — a symbol of hope and clarity",
    accent: "#259292",
    bg: "#EBF5F5",
  },
  {
    href: "/womens-health",
    label: "Women's Health",
    heading: "Sexual &\nReproductive Health",
    body: "Honest, compassionate information about women's bodies, health rights, and wellbeing — free of shame and stigma.",
    image: "https://images.unsplash.com/photo-1573496358961-3c82861ab8f5?auto=format&fit=crop&w=800&q=80",
    imageAlt: "A woman in a garden, looking peaceful and grounded",
    accent: "#5A7D55",
    bg: "#EEF4EC",
  },
  {
    href: "/teen-support",
    label: "Teen Support",
    heading: "Support for\nTeenagers",
    body: "A safe space for young people navigating confusion, peer pressure, abuse, or questions they're afraid to ask anyone else.",
    image: "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&w=800&q=80",
    imageAlt: "A teenager looking out thoughtfully, representing youth finding their way",
    accent: "#C29530",
    bg: "#FDF8ED",
  },
  {
    href: "/parent-resources",
    label: "Family Support",
    heading: "For Parents\n& Families",
    body: "Resources to help parents protect their children, heal as a family, and find the courage to have difficult but necessary conversations.",
    image: "https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Parent and child holding hands in warm light, representing family healing",
    accent: "#9A4F44",
    bg: "#FBF2F0",
  },
]

export function SupportCategoriesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section
      aria-label="Support pathways"
      style={{ backgroundColor: "#FDFAF6" }}
      className="py-20 md:py-28"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em] mb-5"
            style={{ color: "#259292", fontFamily: "Inter, sans-serif" }}
          >
            Who We Serve
          </p>
          <h2
            className="text-4xl md:text-5xl leading-[1.1] mb-5"
            style={{
              fontFamily: "DM Serif Display, Playfair Display, Georgia, serif",
              fontWeight: 400,
              color: "#101F3C",
            }}
          >
            Every journey toward healing looks different.
          </h2>
          <p
            className="text-base leading-relaxed"
            style={{ color: "#6B7280", fontFamily: "Inter, sans-serif" }}
          >
            We have built distinct spaces for each kind of story. Find yours.
          </p>
        </div>

        {/* Editorial grid — 2 large + 2 tall, not 4 equal */}
        <div ref={ref} className="grid lg:grid-cols-2 gap-5">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.href}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={cat.href}
                className="group flex flex-col sm:flex-row overflow-hidden rounded-2xl border transition-all duration-300 hover:shadow-lg"
                style={{ backgroundColor: cat.bg, borderColor: `${cat.accent}22` }}
                aria-label={cat.label}
              >
                {/* Image */}
                <div className="relative w-full sm:w-48 h-52 sm:h-auto shrink-0 overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 192px"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between p-7 flex-1">
                  <div>
                    <p
                      className="text-xs font-semibold uppercase tracking-widest mb-3"
                      style={{ color: cat.accent, fontFamily: "Inter, sans-serif" }}
                    >
                      {cat.label}
                    </p>
                    <h3
                      className="text-2xl mb-4 whitespace-pre-line leading-tight"
                      style={{
                        fontFamily: "DM Serif Display, Playfair Display, Georgia, serif",
                        fontWeight: 400,
                        color: "#101F3C",
                      }}
                    >
                      {cat.heading}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "#4A5568", fontFamily: "Inter, sans-serif" }}
                    >
                      {cat.body}
                    </p>
                  </div>

                  <div className="mt-7 flex items-center gap-2">
                    <span
                      className="text-sm font-semibold transition-all duration-200 group-hover:gap-3"
                      style={{ color: cat.accent, fontFamily: "Inter, sans-serif" }}
                    >
                      Find support
                    </span>
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                      style={{ color: cat.accent }}
                      strokeWidth={2.5}
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
