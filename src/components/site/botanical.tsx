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

/** A loose botanical sprig: stem, leaves and two buds. Decorative. */
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
          <ellipse key={r} cx="0" cy="-11" rx="8" ry="12" transform={`rotate(${r})`} className="fill-gold-300" />
        ))}
        <circle r="5" className="fill-gold-600" />
      </g>
      <g transform="translate(168 110) rotate(20)">
        <ellipse cx="0" cy="0" rx="7" ry="11" className="fill-lagoon-200" />
        <ellipse cx="0" cy="2" rx="4" ry="8" className="fill-gold-400" />
      </g>
    </svg>
  )
}

/** Illustrative circle of abstract figures: inclusive and non-identifying. Decorative. */
export function Gathering({ className }: { className?: string }) {
  const people = [
    { x: 70, h: 92, c: "fill-lagoon-300", head: "fill-lagoon-500" },
    { x: 140, h: 120, c: "fill-gold-200", head: "fill-gold-500" },
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
          <ellipse key={r} cx="0" cy="-9" rx="6" ry="10" transform={`rotate(${r})`} className="fill-gold-300" />
        ))}
        <circle r="4" className="fill-gold-600" />
      </g>
    </svg>
  )
}

function Sparkle({ x, y, s = 1, delay = 0 }: { x: number; y: number; s?: number; delay?: number }) {
  return (
    // Position lives on the group: a CSS animation on the path would override an SVG transform attribute.
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path
        d="M0 -10 C 1.5 -2, 2 -1.5, 10 0 C 2 1.5, 1.5 2, 0 10 C -1.5 2, -2 1.5, -10 0 C -2 -1.5, -1.5 -2, 0 -10 Z"
        fill="#f3d39b"
        className="motion-safe:animate-twinkle"
        style={{ animationDelay: `-${delay}s`, transformBox: "fill-box", transformOrigin: "center" }}
      />
    </g>
  )
}

export type BloomPalette = "warm" | "sage" | "lagoon" | "dusk"

const PALETTES: Record<
  BloomPalette,
  { outer: string[]; inner: string[]; core: string[]; dots: string; second: string[]; bud: string[]; glow: string }
> = {
  // Sunflower-like: gold and terracotta with a deep centre, warm and hopeful, for everyone.
  warm: {
    outer: ["#fbe9c8", "#efc27a", "#cf7d48"],
    inner: ["#fffaf0", "#f6d9a6"],
    core: ["#8a5a3c", "#5a3a2e", "#3a2420"],
    dots: "#f3d39b",
    second: ["#b2ccd2", "#46717c"],
    bud: ["#cad6bc", "#738563"],
    glow: "#e9bc72",
  },
  sage: {
    outer: ["#e3eadb", "#aebd9c", "#738563"],
    inner: ["#fdfaf5", "#cad6bc"],
    core: ["#fbe7c4", "#e2b26a", "#b9853f"],
    dots: "#7f5422",
    second: ["#f3d39b", "#c9893a"],
    bud: ["#b2ccd2", "#46717c"],
    glow: "#aebd9c",
  },
  lagoon: {
    outer: ["#d7e6e9", "#87adb6", "#46717c"],
    inner: ["#fdfaf5", "#b2ccd2"],
    core: ["#fbe7c4", "#e2b26a", "#b9853f"],
    dots: "#7f5422",
    second: ["#cad6bc", "#738563"],
    bud: ["#f3d39b", "#c9893a"],
    glow: "#87adb6",
  },
  // Slate blue, calm evening tones.
  dusk: {
    outer: ["#e4e8ef", "#a3b1c6", "#5a6984"],
    inner: ["#fdfaf5", "#cfd7e3"],
    core: ["#fbe7c4", "#e2b26a", "#b9853f"],
    dots: "#7f5422",
    second: ["#f3d39b", "#c9893a"],
    bud: ["#cad6bc", "#738563"],
    glow: "#a3b1c6",
  },
}

/**
 * Bold hero artwork for dark backgrounds: a large abstract bloom that turns
 * very slowly, with gold rings, a secondary bloom and twinkling sparkles.
 */
export function HeroBloom({ className, palette = "warm" }: { className?: string; palette?: BloomPalette }) {
  const p = PALETTES[palette]
  const id = (name: string) => `hb-${palette}-${name}`
  const url = (name: string) => `url(#${id(name)})`
  const spin = { transformBox: "fill-box" as const, transformOrigin: "center" }
  return (
    <svg viewBox="0 0 600 600" className={className} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={id("glow")} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={p.glow} stopOpacity="0.35" />
          <stop offset="0.55" stopColor={p.glow} stopOpacity="0.12" />
          <stop offset="1" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id("outer")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.outer[0]} />
          <stop offset="0.55" stopColor={p.outer[1]} />
          <stop offset="1" stopColor={p.outer[2]} />
        </linearGradient>
        <linearGradient id={id("inner")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.inner[0]} />
          <stop offset="1" stopColor={p.inner[1]} />
        </linearGradient>
        <linearGradient id={id("second")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.second[0]} />
          <stop offset="1" stopColor={p.second[1]} />
        </linearGradient>
        <linearGradient id={id("bud")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.bud[0]} />
          <stop offset="1" stopColor={p.bud[1]} />
        </linearGradient>
        <radialGradient id={id("core")} cx="0.4" cy="0.35" r="0.75">
          <stop offset="0" stopColor={p.core[0]} />
          <stop offset="0.6" stopColor={p.core[1]} />
          <stop offset="1" stopColor={p.core[2]} />
        </radialGradient>
        <radialGradient id={id("gold")} cx="0.4" cy="0.35" r="0.75">
          <stop offset="0" stopColor="#fbe7c4" />
          <stop offset="0.6" stopColor="#e2b26a" />
          <stop offset="1" stopColor="#b9853f" />
        </radialGradient>
        <linearGradient id={id("leaf")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#485640" />
          <stop offset="1" stopColor="#aebd9c" />
        </linearGradient>
      </defs>

      <circle cx="300" cy="290" r="290" fill={url("glow")} />
      <circle cx="300" cy="290" r="250" fill="none" stroke="#e2b26a" strokeOpacity="0.3" strokeWidth="1" />
      <circle
        cx="300"
        cy="290"
        r="205"
        fill="none"
        stroke="#e2b26a"
        strokeOpacity="0.22"
        strokeWidth="1"
        strokeDasharray="2 7"
        className="motion-safe:animate-[spin_90s_linear_infinite]"
        style={spin}
      />

      <path d="M300 300 C 380 380, 470 420, 560 410 C 480 350, 400 320, 300 300 Z" fill={url("leaf")} opacity="0.85" />
      <path d="M300 300 C 220 390, 140 440, 50 450 C 120 380, 200 330, 300 300 Z" fill={url("leaf")} opacity="0.7" />
      <path d="M300 300 C 340 400, 330 480, 300 560" stroke="#738563" strokeWidth="4" fill="none" strokeLinecap="round" />

      <g transform="translate(300 290)">
        <g className="motion-safe:animate-[spin_160s_linear_infinite]" style={spin}>
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((r) => (
            <ellipse key={r} cx="0" cy="-122" rx="44" ry="118" transform={`rotate(${r})`} fill={url("outer")} opacity="0.93" />
          ))}
        </g>
        <g className="motion-safe:animate-[spin_220s_linear_infinite_reverse]" style={spin}>
          {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((r) => (
            <ellipse key={r} cx="0" cy="-72" rx="24" ry="70" transform={`rotate(${r})`} fill={url("inner")} opacity="0.95" />
          ))}
        </g>
        <circle r="54" fill={url("core")} />
        {Array.from({ length: 18 }, (_, i) => (
          <circle key={i} cx="0" cy="-38" r="3.2" transform={`rotate(${i * 20})`} fill={p.dots} opacity="0.7" />
        ))}
        {Array.from({ length: 10 }, (_, i) => (
          <circle key={i} cx="0" cy="-22" r="2.6" transform={`rotate(${i * 36 + 18})`} fill={p.dots} opacity="0.55" />
        ))}
      </g>

      <g transform="translate(120 470) scale(0.42)">
        {[0, 60, 120, 180, 240, 300].map((r) => (
          <ellipse key={r} cx="0" cy="-90" rx="52" ry="92" transform={`rotate(${r})`} fill={url("second")} />
        ))}
        <circle r="34" fill={url("gold")} />
      </g>
      <g transform="translate(505 150) rotate(18)">
        <path d="M0 0 C -22 -8, -24 -44, -10 -62 C -5 -48, 5 -48, 10 -62 C 24 -44, 22 -8, 0 0 Z" fill={url("bud")} />
        <path d="M0 0 C 2 20, 0 40, -6 60" stroke="#738563" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>

      <Sparkle x={95} y={140} s={1.1} />
      <Sparkle x={520} y={300} s={0.8} delay={1.2} />
      <Sparkle x={455} y={520} s={1.2} delay={2.4} />
      <Sparkle x={215} y={60} s={0.7} delay={3.1} />
      <Sparkle x={40} y={330} s={0.6} delay={0.6} />

      {[
        [470, 80, 0, p.outer[1]],
        [70, 230, 4, p.second[0]],
        [560, 470, 7, p.outer[0]],
      ].map(([x, y, delay, c]) => (
        <ellipse
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          rx="7"
          ry="13"
          fill={c as string}
          opacity="0.85"
          className="motion-safe:animate-drift"
          style={{ animationDelay: `-${delay}s`, transformBox: "fill-box", transformOrigin: "center" }}
        />
      ))}
    </svg>
  )
}
