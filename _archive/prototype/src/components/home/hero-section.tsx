"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const T = { duration: 0.8, ease: "easeOut" } as const

export function HeroSection() {
  return (
    <section
      className="relative min-h-[92vh] flex items-stretch overflow-hidden"
      aria-label="Homepage hero"
      style={{ backgroundColor: "#101F3C" }}
    >
      {/* Photography column — left 55% */}
      <div className="absolute inset-0 lg:right-[42%]">
        <Image
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1400&q=85"
          alt="A woman sitting in soft natural light, looking toward the future with quiet strength"
          fill
          priority
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 55vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(10,21,40,0.15) 0%, rgba(10,21,40,0.55) 75%, rgba(10,21,40,0.92) 100%)" }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 lg:hidden"
          style={{ background: "linear-gradient(to top, rgba(10,21,40,0.96) 35%, rgba(10,21,40,0.3) 70%, transparent 100%)" }}
          aria-hidden="true"
        />
      </div>

      {/* Content — right 42% on desktop, full-width on mobile */}
      <div className="relative w-full flex items-center">
        <div className="w-full lg:ml-auto lg:w-[42%] px-6 sm:px-10 lg:px-14 xl:px-16 py-28 lg:py-20 flex flex-col justify-center min-h-[92vh]">

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...T, delay: 0 }}
            className="text-xs font-semibold uppercase tracking-[0.2em] mb-8"
            style={{ color: "#9DD3D3", fontFamily: "Inter, sans-serif" }}
          >
            A Safe & Confidential Space
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...T, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-5xl xl:text-6xl leading-[1.08] mb-7 text-white"
            style={{ fontFamily: "DM Serif Display, Playfair Display, Georgia, serif", fontWeight: 400 }}
          >
            You do not have to{" "}
            <em className="not-italic" style={{ color: "#E1C170" }}>
              carry this alone.
            </em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...T, delay: 0.2 }}
            className="text-lg leading-relaxed mb-10 max-w-sm"
            style={{ color: "#B4CAE8", fontFamily: "Inter, sans-serif", fontWeight: 300 }}
          >
            Restored Bloom is a sanctuary for survivors, women, teenagers, and families
            seeking healing, support, and hope. You are seen. You are valued.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...T, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 mb-14"
          >
            <Link
              href="/get-help"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{ backgroundColor: "#259292", color: "#FDFAF6", fontFamily: "Inter, sans-serif", letterSpacing: "0.02em" }}
            >
              Get Help Now
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </Link>
            <Link
              href="/get-help#anonymous"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300 hover:bg-white/10"
              style={{ border: "1.5px solid rgba(255,255,255,0.35)", color: "#FDFAF6", fontFamily: "Inter, sans-serif", letterSpacing: "0.02em" }}
            >
              Speak Confidentially
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...T, delay: 0.45 }}
            className="border-t pt-8"
            style={{ borderColor: "rgba(255,255,255,0.12)" }}
          >
            <p
              className="text-xs mb-4 uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif" }}
            >
              Our Promise to You
            </p>
            <div className="grid grid-cols-2 gap-3">
              {["Completely confidential", "Anonymous support available", "Trauma-informed care", "Faith-friendly & inclusive"].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2 text-sm"
                  style={{ color: "rgba(255,255,255,0.65)", fontFamily: "Inter, sans-serif" }}
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "#9DD3D3" }} aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-xs uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "Inter, sans-serif" }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-px h-8"
          style={{ backgroundColor: "rgba(255,255,255,0.25)" }}
        />
      </motion.div>
    </section>
  )
}
