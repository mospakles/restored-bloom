import { cn } from "@/lib/utils"

/** Five-petal bloom used as the brand mark. Decorative. */
export function BloomMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <g transform="translate(24 24)">
        {[0, 72, 144, 216, 288].map((r) => (
          <ellipse key={r} cx="0" cy="-10" rx="7" ry="11" transform={`rotate(${r})`} fill="currentColor" opacity="0.85" />
        ))}
        <circle r="5" className="fill-cream-50" />
        <circle r="3" fill="currentColor" />
      </g>
    </svg>
  )
}

/** A loose botanical sprig — stem, leaves and two buds. Decorative. */
export function Sprig({ className, animate = false }: { className?: string; animate?: boolean }) {
  return (
    <svg
      viewBox="0 0 220 320"
      className={cn(animate && "origin-bottom motion-safe:animate-sway", className)}
      aria-hidden="true"
      focusable="false"
      fill="none"
    >
      <path d="M110 318 C 104 250, 120 190, 106 120 S 112 40, 122 8" className="stroke-sage-500" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M108 250 C 70 236, 48 210, 40 178 C 76 182, 100 206, 108 250Z" className="fill-sage-300" />
      <path d="M112 205 C 150 190, 170 160, 176 128 C 140 136, 118 162, 112 205Z" className="fill-sage-200" />
      <path d="M106 150 C 76 140, 60 116, 58 92 C 86 98, 102 120, 106 150Z" className="fill-sage-300" opacity="0.8" />
      <g transform="translate(122 20)">
        {[0, 72, 144, 216, 288].map((r) => (
          <ellipse key={r} cx="0" cy="-11" rx="8" ry="12" transform={`rotate(${r})`} className="fill-rose-300" />
        ))}
        <circle r="5" className="fill-rose-600" />
      </g>
      <g transform="translate(168 110) rotate(20)">
        <ellipse cx="0" cy="0" rx="7" ry="11" className="fill-rose-200" />
        <ellipse cx="0" cy="2" rx="4" ry="8" className="fill-rose-400" />
      </g>
    </svg>
  )
}

/** Soft scattered petals for section backgrounds. Decorative. */
export function PetalField({ className }: { className?: string }) {
  const petals = [
    [30, 40, 20, "fill-rose-200"],
    [260, 20, -30, "fill-sage-200"],
    [420, 90, 45, "fill-rose-100"],
    [140, 160, 10, "fill-plum-100"],
    [340, 200, -15, "fill-rose-200"],
    [520, 30, 60, "fill-sage-100"],
  ] as const
  return (
    <svg viewBox="0 0 560 240" className={className} aria-hidden="true" focusable="false">
      {petals.map(([x, y, r, c], i) => (
        <ellipse key={i} cx={x} cy={y} rx="9" ry="16" transform={`rotate(${r} ${x} ${y})`} className={c} />
      ))}
    </svg>
  )
}

/** Illustrative circle of abstract figures — inclusive and non-identifying. Decorative. */
export function Gathering({ className }: { className?: string }) {
  const people = [
    { x: 70, h: 92, c: "fill-plum-300", head: "fill-plum-400" },
    { x: 140, h: 120, c: "fill-rose-300", head: "fill-rose-500" },
    { x: 205, h: 78, c: "fill-sage-300", head: "fill-sage-500" },
    { x: 262, h: 104, c: "fill-plum-200", head: "fill-plum-500" },
    { x: 330, h: 86, c: "fill-rose-200", head: "fill-rose-400" },
  ]
  return (
    <svg viewBox="0 0 400 240" className={className} aria-hidden="true" focusable="false">
      <ellipse cx="200" cy="226" rx="190" ry="12" className="fill-cream-200" />
      {people.map((p) => (
        <g key={p.x}>
          <path
            d={`M${p.x - 26} 222 C ${p.x - 26} ${222 - p.h * 0.75}, ${p.x + 26} ${222 - p.h * 0.75}, ${p.x + 26} 222 Z`}
            className={p.c}
          />
          <circle cx={p.x} cy={222 - p.h * 0.75 - 18} r="15" className={p.head} />
        </g>
      ))}
      <g transform="translate(200 46)">
        {[0, 72, 144, 216, 288].map((r) => (
          <ellipse key={r} cx="0" cy="-9" rx="6" ry="10" transform={`rotate(${r})`} className="fill-rose-300" />
        ))}
        <circle r="4" className="fill-rose-600" />
      </g>
    </svg>
  )
}
