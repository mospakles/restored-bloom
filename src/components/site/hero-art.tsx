/**
 * Page-specific hero illustrations for dark backgrounds. They share one visual
 * language with the homepage bloom (gold rings, sage leaves, soft glow,
 * sparkles) but each tells the story of its page. Purely decorative: no people
 * are depicted except abstract, non-identifying shapes.
 *
 * Note: anything animated with CSS sits inside a positioned <g>, because a CSS
 * transform would otherwise override the SVG `transform` attribute.
 */

import type { CSSProperties, ReactNode } from "react"

export type HeroArtName =
  | "roots"
  | "growth"
  | "path"
  | "together"
  | "watering"
  | "book"
  | "sunrise"
  | "shelter"
  | "letter"
  | "shield"

const C = {
  gold: ["#fbe7c4", "#f3d39b", "#e9bc72", "#c9893a"],
  sage: ["#e3eadb", "#cad6bc", "#aebd9c", "#738563", "#485640"],
  lagoon: ["#d7e6e9", "#b2ccd2", "#87adb6", "#46717c"],
  slate: ["#e4e8ef", "#cfd7e3", "#a3b1c6", "#5a6984"],
  cream: ["#fdfaf5", "#f8f1e6", "#e3d4bc"],
  terracotta: "#cf7d48",
}

const fillBox: CSSProperties = { transformBox: "fill-box", transformOrigin: "center" }
const fromBottom: CSSProperties = { transformBox: "fill-box", transformOrigin: "50% 100%" }

const LEAF = "M0 0 C 12 -10, 34 -12, 54 0 C 34 12, 12 10, 0 0 Z"

function Leaf({ x, y, r, s = 1, fill = C.sage[2] }: { x: number; y: number; r: number; s?: number; fill?: string }) {
  return <path d={LEAF} fill={fill} transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} />
}

function Flower({
  x,
  y,
  s = 1,
  petal = C.gold[2],
  core = C.gold[3],
  petals = 6,
}: {
  x: number
  y: number
  s?: number
  petal?: string
  core?: string
  petals?: number
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {Array.from({ length: petals }, (_, i) => (
        <ellipse key={i} cx="0" cy="-15" rx="9" ry="15" transform={`rotate(${(360 / petals) * i})`} fill={petal} />
      ))}
      <circle r="8" fill={core} />
      <circle r="3.5" fill={C.cream[0]} opacity="0.6" />
    </g>
  )
}

function Sparkle({ x, y, s = 1, delay = 0 }: { x: number; y: number; s?: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path
        d="M0 -10 C 1.5 -2, 2 -1.5, 10 0 C 2 1.5, 1.5 2, 0 10 C -1.5 2, -2 1.5, -10 0 C -2 -1.5, -1.5 -2, 0 -10 Z"
        fill={C.gold[1]}
        className="motion-safe:animate-twinkle"
        style={{ ...fillBox, animationDelay: `-${delay}s` }}
      />
    </g>
  )
}

/** Shared frame: glow, a slowly turning dashed gold ring, and sparkles. */
function Frame({ id, glow, children }: { id: string; glow: string; children: ReactNode }) {
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full overflow-visible" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`${id}-glow`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={glow} stopOpacity="0.4" />
          <stop offset="0.6" stopColor={glow} stopOpacity="0.1" />
          <stop offset="1" stopColor={glow} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="195" fill={`url(#${id}-glow)`} />
      <circle cx="200" cy="200" r="168" fill="none" stroke={C.gold[2]} strokeOpacity="0.28" />
      <circle
        cx="200"
        cy="200"
        r="140"
        fill="none"
        stroke={C.gold[2]}
        strokeOpacity="0.2"
        strokeDasharray="2 7"
        className="motion-safe:animate-[spin_90s_linear_infinite]"
        style={fillBox}
      />
      {children}
      <Sparkle x={58} y={92} s={0.9} />
      <Sparkle x={350} y={130} s={0.7} delay={1.4} />
      <Sparkle x={330} y={330} s={1} delay={2.6} />
    </svg>
  )
}

/** About: a young plant with roots spreading beneath it. */
function Roots() {
  const roots = [
    "M200 250 C 196 280, 180 300, 150 318",
    "M200 250 C 204 285, 222 305, 255 322",
    "M200 250 C 198 290, 200 320, 196 352",
    "M190 282 C 170 290, 150 288, 128 296",
    "M214 290 C 236 296, 262 292, 286 300",
    "M198 318 C 186 330, 176 344, 172 360",
  ]
  return (
    <Frame id="roots" glow={C.slate[2]}>
      <defs>
        <linearGradient id="roots-soil" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.slate[3]} stopOpacity="0.32" />
          <stop offset="1" stopColor={C.slate[3]} stopOpacity="0" />
        </linearGradient>
      </defs>
      <ellipse cx="200" cy="300" rx="150" ry="70" fill="url(#roots-soil)" />
      <path d="M60 250 C 140 238, 260 238, 340 250" stroke={C.sage[2]} strokeWidth="2" fill="none" opacity="0.7" />
      {roots.map((d, i) => (
        <path
          key={d}
          d={d}
          pathLength={1}
          strokeDasharray="1"
          stroke={C.gold[2]}
          strokeWidth={i < 3 ? 3 : 2}
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
          className="motion-safe:animate-draw"
          style={{ animationDelay: `${0.3 + i * 0.25}s` }}
        />
      ))}
      <g className="motion-safe:animate-sway" style={fromBottom}>
        <path d="M200 250 C 196 210, 206 170, 200 120" stroke={C.sage[3]} strokeWidth="4" fill="none" strokeLinecap="round" />
        <Leaf x={200} y={210} r={-150} s={1.1} fill={C.sage[2]} />
        <Leaf x={201} y={180} r={-30} s={1} fill={C.sage[1]} />
        <Leaf x={200} y={150} r={-140} s={0.75} fill={C.sage[1]} />
        <Flower x={200} y={110} s={1.4} petal={C.slate[1]} core={C.gold[2]} />
      </g>
    </Frame>
  )
}

/** Programmes: seed, sprout, bud and bloom: growth through every age. */
function Growth() {
  return (
    <Frame id="growth" glow={C.sage[2]}>
      <path d="M40 300 C 120 280, 280 280, 360 300" stroke={C.sage[2]} strokeWidth="2" fill="none" opacity="0.7" />
      <path
        d="M80 230 C 140 150, 260 120, 330 150"
        stroke={C.gold[2]}
        strokeWidth="1.5"
        strokeDasharray="3 8"
        fill="none"
        opacity="0.7"
      />
      <path d="M322 142 L 334 150 L 320 158" stroke={C.gold[2]} strokeWidth="1.5" fill="none" opacity="0.7" />
      {/* seed */}
      <g transform="translate(80 290)">
        <ellipse cx="0" cy="0" rx="9" ry="13" transform="rotate(-20)" fill={C.gold[3]} />
      </g>
      {/* sprout */}
      <g transform="translate(150 290)">
        <g className="motion-safe:animate-sway" style={{ ...fromBottom, animationDelay: "-2s" }}>
          <path d="M0 0 C -2 -14, 2 -26, 0 -38" stroke={C.sage[3]} strokeWidth="3" fill="none" strokeLinecap="round" />
          <Leaf x={0} y={-34} r={-150} s={0.55} fill={C.sage[2]} />
          <Leaf x={0} y={-36} r={-30} s={0.55} fill={C.sage[1]} />
        </g>
      </g>
      {/* bud */}
      <g transform="translate(230 288)">
        <g className="motion-safe:animate-sway" style={{ ...fromBottom, animationDelay: "-4s" }}>
          <path d="M0 0 C -3 -30, 4 -60, 0 -88" stroke={C.sage[3]} strokeWidth="3" fill="none" strokeLinecap="round" />
          <Leaf x={0} y={-40} r={-150} s={0.7} fill={C.sage[2]} />
          <path d="M0 -84 C -14 -90, -14 -114, -6 -124 C -2 -114, 2 -114, 6 -124 C 14 -114, 14 -90, 0 -84 Z" fill={C.lagoon[2]} />
        </g>
      </g>
      {/* bloom */}
      <g transform="translate(310 290)">
        <g className="motion-safe:animate-sway" style={{ ...fromBottom, animationDelay: "-6s" }}>
          <path d="M0 0 C -4 -40, 6 -90, 0 -128" stroke={C.sage[3]} strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <Leaf x={0} y={-50} r={-150} s={0.85} fill={C.sage[2]} />
          <Leaf x={1} y={-80} r={-30} s={0.75} fill={C.sage[1]} />
          <Flower x={0} y={-140} s={1.5} petal={C.gold[2]} core={C.terracotta} petals={8} />
        </g>
      </g>
    </Frame>
  )
}

/** Invite us: stepping stones winding towards a bloom: we'll come to you. */
function PathArt() {
  const stones = [
    [96, 330, 1.2],
    [140, 300, 1.1],
    [176, 272, 1],
    [206, 246, 0.9],
    [234, 224, 0.82],
    [258, 204, 0.74],
  ] as const
  return (
    <Frame id="path" glow={C.gold[2]}>
      <path
        d="M70 352 C 140 320, 190 280, 220 240 S 270 190, 290 170"
        stroke={C.gold[1]}
        strokeWidth="2"
        strokeDasharray="1"
        pathLength={1}
        fill="none"
        opacity="0.5"
        className="motion-safe:animate-draw"
      />
      {stones.map(([x, y, s], i) => (
        <g key={x} transform={`translate(${x} ${y}) scale(${s})`}>
          <ellipse
            cx="0"
            cy="0"
            rx="22"
            ry="9"
            fill={i % 2 ? C.lagoon[1] : C.cream[1]}
            opacity="0.92"
            className="motion-safe:animate-[bloom-in_0.8s_ease-out_both]"
            style={{ animationDelay: `${0.2 + i * 0.18}s` }}
          />
        </g>
      ))}
      <g transform="translate(300 170)">
        <g className="motion-safe:animate-sway" style={fromBottom}>
          <path d="M0 0 C -3 -24, 4 -48, 0 -70" stroke={C.sage[3]} strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <Leaf x={0} y={-24} r={-150} s={0.75} fill={C.sage[2]} />
          <Leaf x={1} y={-40} r={-30} s={0.65} fill={C.sage[1]} />
          <Flower x={0} y={-82} s={1.45} petal={C.gold[2]} core={C.terracotta} petals={8} />
        </g>
      </g>
      {/* location marker above the bloom */}
      <g transform="translate(300 66)">
        <g className="motion-safe:animate-float" style={fillBox}>
          <path d="M0 26 C -16 8, -20 -2, -20 -10 C -20 -22, -11 -30, 0 -30 C 11 -30, 20 -22, 20 -10 C 20 -2, 16 8, 0 26 Z" fill={C.lagoon[2]} />
          <circle cx="0" cy="-10" r="7" fill={C.cream[0]} />
        </g>
      </g>
    </Frame>
  )
}

/** Get involved: several stems growing together and intertwining. */
function Together() {
  const stems = [
    { d: "M140 340 C 150 280, 230 250, 190 190 S 170 120, 150 104", color: C.gold[2], flower: [150, 96], delay: "0s" },
    { d: "M200 344 C 196 290, 150 250, 200 196 S 236 130, 230 92", color: C.lagoon[2], flower: [230, 84], delay: "-3s" },
    { d: "M262 340 C 250 286, 180 240, 222 200 S 290 150, 300 120", color: C.sage[1], flower: [302, 112], delay: "-6s" },
  ]
  return (
    <Frame id="together" glow={C.lagoon[2]}>
      <path d="M90 344 C 160 334, 240 334, 310 344" stroke={C.sage[2]} strokeWidth="2" fill="none" opacity="0.7" />
      {stems.map((s, i) => (
        <g key={i}>
          <path
            d={s.d}
            pathLength={1}
            strokeDasharray="1"
            stroke={C.sage[3]}
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            className="motion-safe:animate-draw"
            style={{ animationDelay: `${i * 0.35}s` }}
          />
          <g transform={`translate(${s.flower[0]} ${s.flower[1]})`}>
            <g className="motion-safe:animate-breathe" style={{ ...fillBox, animationDelay: s.delay }}>
              <Flower x={0} y={0} s={1.25} petal={s.color} core={i === 1 ? C.gold[3] : C.terracotta} petals={i === 2 ? 5 : 7} />
            </g>
          </g>
        </g>
      ))}
      <Leaf x={186} y={250} r={-160} s={0.8} fill={C.sage[2]} />
      <Leaf x={214} y={226} r={-20} s={0.75} fill={C.sage[1]} />
      <Leaf x={232} y={170} r={-150} s={0.6} fill={C.sage[2]} />
    </Frame>
  )
}

/** Support our work: a watering can tending a seedling. */
function Watering() {
  return (
    <Frame id="watering" glow={C.gold[2]}>
      <defs>
        <linearGradient id="watering-can" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.gold[1]} />
          <stop offset="1" stopColor={C.gold[3]} />
        </linearGradient>
      </defs>
      <g transform="translate(170 132) rotate(-18)">
        <g className="motion-safe:animate-glide" style={fillBox}>
          <rect x="-46" y="-30" width="92" height="66" rx="16" fill="url(#watering-can)" />
          <path d="M-30 -30 C -30 -62, 30 -62, 30 -30" stroke={C.gold[3]} strokeWidth="7" fill="none" strokeLinecap="round" />
          <path d="M44 -6 L 104 -40 L 110 -30 L 46 14 Z" fill={C.gold[2]} />
          <ellipse cx="108" cy="-36" rx="9" ry="12" transform="rotate(-30 108 -36)" fill={C.gold[3]} />
          <rect x="-34" y="-14" width="68" height="6" rx="3" fill={C.cream[0]} opacity="0.35" />
        </g>
      </g>
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(${262 + i * 10} ${178 + (i % 2) * 8})`}>
          <path
            d="M0 0 C -4 6, -4 10, 0 12 C 4 10, 4 6, 0 0 Z"
            fill={C.lagoon[1]}
            className="motion-safe:animate-fall"
            style={{ ...fillBox, animationDelay: `${i * 0.5}s` }}
          />
        </g>
      ))}
      <path d="M200 320 C 240 304, 320 304, 360 320" stroke={C.sage[2]} strokeWidth="2" fill="none" opacity="0.7" />
      <g transform="translate(286 316)">
        <g className="motion-safe:animate-sway" style={fromBottom}>
          <path d="M0 0 C -2 -20, 3 -40, 0 -64" stroke={C.sage[3]} strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <Leaf x={0} y={-48} r={-150} s={0.85} fill={C.sage[2]} />
          <Leaf x={0} y={-58} r={-30} s={0.8} fill={C.sage[1]} />
          <Leaf x={0} y={-26} r={-25} s={0.55} fill={C.sage[2]} />
        </g>
      </g>
    </Frame>
  )
}

/** Resources: an open book with leaves growing from its pages. */
function Book() {
  return (
    <Frame id="book" glow={C.lagoon[2]}>
      <defs>
        <linearGradient id="book-page" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.cream[0]} />
          <stop offset="1" stopColor={C.cream[2]} />
        </linearGradient>
      </defs>
      <path d="M70 300 C 120 280, 170 284, 200 300 L 200 316 C 170 300, 120 296, 70 316 Z" fill={C.lagoon[3]} />
      <path d="M330 300 C 280 280, 230 284, 200 300 L 200 316 C 230 300, 280 296, 330 316 Z" fill={C.lagoon[3]} />
      <path d="M78 296 C 120 262, 170 262, 200 286 L 200 300 C 170 280, 120 280, 78 304 Z" fill="url(#book-page)" />
      <path d="M322 296 C 280 262, 230 262, 200 286 L 200 300 C 230 280, 280 280, 322 304 Z" fill="url(#book-page)" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <path d={`M${104 + i * 4} ${288 - i * 8} C 130 ${276 - i * 8}, 160 ${276 - i * 8}, 186 ${288 - i * 6}`} stroke={C.slate[2]} strokeWidth="1.5" fill="none" opacity="0.6" />
          <path d={`M${296 - i * 4} ${288 - i * 8} C 270 ${276 - i * 8}, 240 ${276 - i * 8}, 214 ${288 - i * 6}`} stroke={C.slate[2]} strokeWidth="1.5" fill="none" opacity="0.6" />
        </g>
      ))}
      <g transform="translate(200 288)">
        <g className="motion-safe:animate-sway" style={fromBottom}>
          <path d="M0 0 C -6 -40, 10 -80, 0 -150" stroke={C.sage[3]} strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M0 -60 C -24 -76, -42 -96, -52 -122" stroke={C.sage[3]} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M2 -88 C 26 -100, 44 -118, 52 -146" stroke={C.sage[3]} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <Leaf x={0} y={-30} r={-150} s={0.8} fill={C.sage[2]} />
          <Leaf x={2} y={-50} r={-28} s={0.75} fill={C.sage[1]} />
          <Leaf x={-30} y={-90} r={-130} s={0.6} fill={C.sage[1]} />
          <Leaf x={30} y={-110} r={-50} s={0.6} fill={C.sage[2]} />
          <Flower x={0} y={-160} s={1.25} petal={C.gold[2]} core={C.terracotta} petals={7} />
          <Flower x={-54} y={-128} s={0.7} petal={C.lagoon[1]} core={C.gold[3]} />
          <Flower x={54} y={-152} s={0.75} petal={C.cream[0]} core={C.gold[2]} />
        </g>
      </g>
    </Frame>
  )
}

/** Events: a sun rising over a gathering circle. */
function Sunrise() {
  const people = [
    [118, 0.85, C.lagoon[2]],
    [156, 1, C.gold[2]],
    [200, 1.08, C.sage[2]],
    [244, 1, C.slate[2]],
    [282, 0.85, C.cream[2]],
  ] as const
  return (
    <Frame id="sunrise" glow={C.gold[2]}>
      <defs>
        <radialGradient id="sunrise-sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={C.gold[0]} />
          <stop offset="0.7" stopColor={C.gold[2]} />
          <stop offset="1" stopColor={C.terracotta} />
        </radialGradient>
        <clipPath id="sunrise-clip">
          <rect x="0" y="0" width="400" height="262" />
        </clipPath>
      </defs>
      <g clipPath="url(#sunrise-clip)">
        <g transform="translate(200 262)">
          <g className="motion-safe:animate-[spin_120s_linear_infinite]" style={fillBox}>
            {Array.from({ length: 16 }, (_, i) => (
              <rect key={i} x="-2" y="-170" width="4" height="34" rx="2" fill={C.gold[1]} opacity="0.55" transform={`rotate(${i * 22.5})`} />
            ))}
          </g>
          <g className="motion-safe:animate-breathe" style={fillBox}>
            <circle r="96" fill="url(#sunrise-sun)" />
          </g>
        </g>
      </g>
      <path d="M50 262 C 140 254, 260 254, 350 262" stroke={C.gold[1]} strokeWidth="2" fill="none" opacity="0.8" />
      <ellipse cx="200" cy="326" rx="140" ry="16" fill={C.slate[3]} opacity="0.4" />
      {people.map(([x, s, c], i) => (
        <g key={x} transform={`translate(${x} 320) scale(${s})`}>
          <g className="motion-safe:animate-float" style={{ ...fillBox, animationDelay: `-${i * 1.3}s` }}>
            <path d="M-20 0 C -20 -44, 20 -44, 20 0 Z" fill={c} />
            <circle cx="0" cy="-54" r="12" fill={c} />
          </g>
        </g>
      ))}
    </Frame>
  )
}

/** Finding support: sheltering leaves curved protectively around a small bud. */
function Shelter() {
  return (
    <Frame id="shelter" glow={C.sage[2]}>
      <defs>
        <linearGradient id="shelter-leaf-l" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={C.sage[2]} />
          <stop offset="1" stopColor={C.sage[4]} />
        </linearGradient>
        <linearGradient id="shelter-leaf-r" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.sage[1]} />
          <stop offset="1" stopColor={C.sage[3]} />
        </linearGradient>
        <radialGradient id="shelter-light" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={C.gold[0]} stopOpacity="0.9" />
          <stop offset="1" stopColor={C.gold[0]} stopOpacity="0" />
        </radialGradient>
      </defs>
      <g className="motion-safe:animate-breathe" style={fillBox}>
        <circle cx="200" cy="214" r="74" fill="url(#shelter-light)" />
      </g>
      <path d="M200 330 C 110 320, 60 230, 92 120 C 120 200, 160 250, 200 270 Z" fill="url(#shelter-leaf-l)" />
      <path d="M200 330 C 290 320, 340 230, 308 120 C 280 200, 240 250, 200 270 Z" fill="url(#shelter-leaf-r)" />
      <path d="M200 326 C 150 300, 116 240, 100 150" stroke={C.cream[0]} strokeOpacity="0.35" strokeWidth="1.5" fill="none" />
      <path d="M200 326 C 250 300, 284 240, 300 150" stroke={C.cream[0]} strokeOpacity="0.35" strokeWidth="1.5" fill="none" />
      <g transform="translate(200 272)">
        <g className="motion-safe:animate-sway" style={fromBottom}>
          <path d="M0 0 C -2 -20, 2 -40, 0 -58" stroke={C.sage[3]} strokeWidth="3" fill="none" strokeLinecap="round" />
          <Leaf x={0} y={-24} r={-150} s={0.5} fill={C.sage[1]} />
          <path d="M0 -54 C -14 -60, -14 -84, -6 -94 C -2 -84, 2 -84, 6 -94 C 14 -84, 14 -60, 0 -54 Z" fill={C.gold[2]} />
        </g>
      </g>
    </Frame>
  )
}

/** Contact & newsletter: an open envelope with a sprig, and a paper plane in flight. */
function Letter() {
  return (
    <Frame id="letter" glow={C.sage[2]}>
      <defs>
        <linearGradient id="letter-paper" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.cream[0]} />
          <stop offset="1" stopColor={C.cream[2]} />
        </linearGradient>
      </defs>
      <path d="M72 120 C 140 70, 230 70, 300 92" stroke={C.gold[1]} strokeWidth="1.8" strokeDasharray="2 8" fill="none" opacity="0.7" />
      <g transform="translate(316 96)">
        <g className="motion-safe:animate-glide" style={fillBox}>
          <path d="M-30 -6 L 30 -26 L 4 22 L -4 4 Z" fill={C.cream[0]} />
          <path d="M-4 4 L 30 -26 L 4 8 Z" fill={C.lagoon[1]} />
        </g>
      </g>
      {/* letter rising from the envelope */}
      <g transform="translate(200 236)">
        <g className="motion-safe:animate-float" style={fillBox}>
          <rect x="-58" y="-96" width="116" height="104" rx="8" fill="url(#letter-paper)" />
          {[0, 1, 2].map((i) => (
            <rect key={i} x="-40" y={-74 + i * 16} width={i === 2 ? 50 : 80} height="5" rx="2.5" fill={C.slate[2]} opacity="0.6" />
          ))}
          <g transform="translate(34 -78)">
            <Leaf x={0} y={0} r={-120} s={0.45} fill={C.sage[2]} />
            <Flower x={0} y={-6} s={0.6} petal={C.gold[2]} core={C.terracotta} />
          </g>
        </g>
      </g>
      <path d="M110 230 L 290 230 L 290 330 L 110 330 Z" fill={C.lagoon[3]} />
      <path d="M110 230 L 200 290 L 290 230" fill={C.lagoon[2]} />
      <path d="M110 330 L 180 276 M 290 330 L 220 276" stroke={C.lagoon[0]} strokeOpacity="0.4" strokeWidth="2" />
    </Frame>
  )
}

/** Policies: a shield holding a leaf: care and protection. */
function Shield() {
  return (
    <Frame id="shield" glow={C.lagoon[2]}>
      <defs>
        <linearGradient id="shield-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.lagoon[1]} />
          <stop offset="1" stopColor={C.lagoon[3]} />
        </linearGradient>
      </defs>
      <g transform="translate(200 210)">
        <g className="motion-safe:animate-float" style={fillBox}>
          <path d="M0 -120 C 40 -100, 80 -96, 104 -98 C 104 0, 70 80, 0 122 C -70 80, -104 0, -104 -98 C -80 -96, -40 -100, 0 -120 Z" fill="url(#shield-body)" />
          <path
            d="M0 -100 C 34 -84, 66 -80, 86 -82 C 84 -4, 56 62, 0 98 C -56 62, -84 -4, -86 -82 C -66 -80, -34 -84, 0 -100 Z"
            fill="none"
            stroke={C.gold[1]}
            strokeOpacity="0.8"
            strokeWidth="2"
          />
          <path d="M0 60 C -6 20, 6 -20, 0 -60" stroke={C.sage[1]} strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <Leaf x={0} y={10} r={-150} s={0.9} fill={C.sage[1]} />
          <Leaf x={1} y={-14} r={-30} s={0.85} fill={C.sage[0]} />
          <Flower x={0} y={-68} s={1.1} petal={C.gold[2]} core={C.terracotta} petals={7} />
        </g>
      </g>
    </Frame>
  )
}

const ART: Record<HeroArtName, () => ReactNode> = {
  roots: Roots,
  growth: Growth,
  path: PathArt,
  together: Together,
  watering: Watering,
  book: Book,
  sunrise: Sunrise,
  shelter: Shelter,
  letter: Letter,
  shield: Shield,
}

export function HeroArt({ name, className }: { name: HeroArtName; className?: string }) {
  const Art = ART[name]
  return (
    <div className={className}>
      <Art />
    </div>
  )
}
