"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const facts = [
  {
    figure: "1 in 4",
    context: "women",
    statement: "experience sexual violence in their lifetime.",
  },
  {
    figure: "93%",
    context: "of victims",
    statement: "know the person who harmed them.",
  },
  {
    figure: "70%",
    context: "of survivors",
    statement: "never tell anyone what happened to them.",
  },
  {
    figure: "100%",
    context: "of survivors",
    statement: "deserve compassion, care, and a path forward.",
  },
]

export function StatisticsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      ref={ref}
      aria-label="Why this work matters"
      style={{ backgroundColor: "#F6F0E6" }}
      className="py-16"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-xs font-semibold uppercase tracking-[0.2em] mb-10 text-center"
          style={{ color: "#5A7D55", fontFamily: "Inter, sans-serif" }}
        >
          Why This Work Matters
        </motion.p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px" style={{ backgroundColor: "#DDD0BA" }}>
          {facts.map((fact, i) => (
            <motion.div
              key={fact.figure}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col justify-between px-7 py-9"
              style={{ backgroundColor: "#F6F0E6" }}
            >
              <div>
                <p
                  className="text-4xl md:text-5xl mb-2 leading-none"
                  style={{
                    fontFamily: "DM Serif Display, Playfair Display, Georgia, serif",
                    fontWeight: 400,
                    color: "#101F3C",
                  }}
                >
                  {fact.figure}
                </p>
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-3"
                  style={{ color: "#5A7D55", fontFamily: "Inter, sans-serif" }}
                >
                  {fact.context}
                </p>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#4A5568", fontFamily: "Inter, sans-serif" }}
              >
                {fact.statement}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Grounding statement */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.55, duration: 0.7 }}
          className="text-center mt-10 text-sm max-w-xl mx-auto leading-relaxed"
          style={{ color: "#6B7280", fontFamily: "Inter, sans-serif" }}
        >
          These are not just statistics. Behind every number is a person who deserved
          to be believed, protected, and supported.{" "}
          <span style={{ color: "#1C7878" }} className="font-medium">
            Restored Bloom exists for them.
          </span>
        </motion.p>
      </div>
    </section>
  )
}
