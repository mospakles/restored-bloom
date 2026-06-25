import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface SectionWrapperProps {
  children: ReactNode
  className?: string
  id?: string
  as?: "section" | "div" | "article"
}

export function SectionWrapper({ children, className, id, as: Tag = "section" }: SectionWrapperProps) {
  return (
    <Tag id={id} className={cn("py-20 md:py-28", className)}>
      {children}
    </Tag>
  )
}

interface PageContainerProps {
  children: ReactNode
  className?: string
  narrow?: boolean
}

export function PageContainer({ children, className, narrow = false }: PageContainerProps) {
  return (
    <div className={cn("max-w-7xl mx-auto px-6 sm:px-8 lg:px-10", narrow && "max-w-3xl", className)}>
      {children}
    </div>
  )
}

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
}

export function SectionHeader({ eyebrow, title, subtitle, centered = false, className }: SectionHeaderProps) {
  const SERIF = "DM Serif Display, Playfair Display, Georgia, serif"
  const SANS = "Inter, system-ui, sans-serif"

  return (
    <div className={cn("mb-14", centered && "text-center", className)}>
      {eyebrow && (
        <p
          className="text-xs font-semibold uppercase tracking-[0.2em] mb-5"
          style={{ color: "#259292", fontFamily: SANS }}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className="text-4xl md:text-5xl leading-[1.1] mb-5"
        style={{ fontFamily: SERIF, fontWeight: 400, color: "#101F3C" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn("text-base leading-relaxed", centered ? "max-w-2xl mx-auto" : "max-w-2xl")}
          style={{ color: "#6B7280", fontFamily: SANS }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
