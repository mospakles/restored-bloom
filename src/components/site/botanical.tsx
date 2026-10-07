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

const LEAF = "M0 0 C 14 -12, 40 -14, 64 0 C 40 12, 14 12, 0 0 Z"

function Leaf({ x, y, r, s = 1, fill = "url(#rb-leaf)" }: { x: number; y: number; r: number; s?: number; fill?: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <path d={LEAF} fill={fill} />
      <path d="M4 0 C 22 -1, 40 -1, 58 0" stroke="#5b6c4e" strokeOpacity="0.35" strokeWidth="1" fill="none" />
    </g>
  )
}

/** A layered rose-style bloom: outer petals, inner petals and a seeded centre. */
function Bloom({ x, y, s = 1, outer = "url(#rb-petal-rose)", inner = "url(#rb-petal-blush)" }: { x: number; y: number; s?: number; outer?: string; inner?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((r) => (
        <ellipse key={r} cx="0" cy="-26" rx="15" ry="27" transform={`rotate(${r})`} fill={outer} />
      ))}
      {[22, 94, 166, 238, 310].map((r) => (
        <ellipse key={r} cx="0" cy="-16" rx="10" ry="18" transform={`rotate(${r})`} fill={inner} />
      ))}
      <circle r="10" fill="#9b4f5b" />
      {[0, 60, 120, 180, 240, 300].map((r) => (
        <circle key={r} cx="0" cy="-5" r="1.6" transform={`rotate(${r})`} fill="#f6e1e0" />
      ))}
    </g>
  )
}

/** A daisy with fine petals. */
function Daisy({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {Array.from({ length: 14 }, (_, i) => (
        <ellipse key={i} cx="0" cy="-17" rx="5" ry="15" transform={`rotate(${(360 / 14) * i})`} fill="#fffaf3" stroke="#ecc6c7" strokeWidth="1" />
      ))}
      <circle r="8" fill="#d9a35f" />
      <circle r="8" fill="url(#rb-centre)" />
    </g>
  )
}

/** A closed tulip-like bud. */
function Bud({ x, y, r = 0, s = 1, fill = "url(#rb-petal-plum)" }: { x: number; y: number; r?: number; s?: number; fill?: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <path d="M0 0 C -18 -6, -20 -34, -8 -50 C -4 -38, 4 -38, 8 -50 C 20 -34, 18 -6, 0 0 Z" fill={fill} />
      <path d="M0 -2 C -6 -16, -4 -34, 0 -44 C 4 -34, 6 -16, 0 -2 Z" fill="#fdfaf5" opacity="0.35" />
    </g>
  )
}

/**
 * The homepage hero illustration: a small garden of blooms in soft light.
 * Purely decorative — contains no people and no imagery of children.
 */
export function BloomGarden({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMax slice" className={className} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="rb-sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fffdf8" />
          <stop offset="0.6" stopColor="#fdf3e6" stopOpacity="0.7" />
          <stop offset="1" stopColor="#fdf3e6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="rb-petal-rose" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ecc6c7" />
          <stop offset="1" stopColor="#ca8089" />
        </linearGradient>
        <linearGradient id="rb-petal-blush" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbf1f0" />
          <stop offset="1" stopColor="#dea3a8" />
        </linearGradient>
        <linearGradient id="rb-petal-plum" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dcc2d6" />
          <stop offset="1" stopColor="#9a6e92" />
        </linearGradient>
        <linearGradient id="rb-petal-peach" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbe7d8" />
          <stop offset="1" stopColor="#e7b29a" />
        </linearGradient>
        <linearGradient id="rb-leaf" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8fa07c" />
          <stop offset="1" stopColor="#cad6bc" />
        </linearGradient>
        <linearGradient id="rb-leaf-dark" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5b6c4e" />
          <stop offset="1" stopColor="#aebd9c" />
        </linearGradient>
        <radialGradient id="rb-centre" cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#fbe7c4" stopOpacity="0.9" />
          <stop offset="1" stopColor="#d9a35f" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* soft light */}
      <circle cx="250" cy="150" r="120" fill="url(#rb-sun)" className="origin-center motion-safe:animate-breathe" style={{ transformBox: "fill-box" }} />
      <circle cx="250" cy="150" r="58" fill="none" stroke="#ecc6c7" strokeOpacity="0.55" strokeWidth="1" />
      <circle cx="250" cy="150" r="82" fill="none" stroke="#ecc6c7" strokeOpacity="0.3" strokeWidth="1" />

      {/* rolling ground */}
      <path d="M-10 455 C 80 425, 170 440, 230 430 S 360 418, 410 440 L410 510 L-10 510 Z" fill="#e3eadb" />
      <path d="M-10 475 C 90 452, 200 470, 290 456 S 380 452, 410 462 L410 510 L-10 510 Z" fill="#cad6bc" opacity="0.7" />

      {/* back stems */}
      <path d="M118 470 C 110 420, 96 380, 104 318" stroke="#738563" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M300 470 C 306 430, 322 392, 318 344" stroke="#738563" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M262 470 C 266 450, 276 430, 284 410" stroke="#738563" strokeWidth="2" fill="none" strokeLinecap="round" />

      <Leaf x={108} y={420} r={-150} s={0.85} />
      <Leaf x={106} y={380} r={-30} s={0.7} fill="url(#rb-leaf-dark)" />
      <Leaf x={308} y={420} r={-25} s={0.85} fill="url(#rb-leaf-dark)" />
      <Leaf x={314} y={386} r={-160} s={0.7} />

      <Daisy x={104} y={312} s={1.05} />
      <Bud x={318} y={346} r={6} s={1.05} />
      <Bud x={284} y={412} r={18} s={0.6} fill="url(#rb-petal-peach)" />

      {/* main stem */}
      <path d="M200 472 C 192 400, 214 330, 200 250 C 192 205, 204 168, 212 140" stroke="#5b6c4e" strokeWidth="3.2" fill="none" strokeLinecap="round" />
      <path d="M201 330 C 220 312, 240 300, 258 296" stroke="#5b6c4e" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <Leaf x={198} y={420} r={-148} s={1.15} fill="url(#rb-leaf-dark)" />
      <Leaf x={203} y={375} r={-28} s={1.1} />
      <Leaf x={196} y={290} r={-152} s={0.9} />
      <Leaf x={204} y={240} r={-34} s={0.75} fill="url(#rb-leaf-dark)" />

      <Bloom x={212} y={134} s={1.15} />
      <Bloom x={262} y={292} s={0.62} outer="url(#rb-petal-peach)" inner="url(#rb-petal-blush)" />

      {/* small sprouts in the foreground */}
      {[
        [58, 470, -10],
        [160, 476, 8],
        [350, 470, -6],
      ].map(([x, y, r]) => (
        <g key={x} transform={`translate(${x} ${y}) rotate(${r})`}>
          <path d="M0 0 C -1 -12, 1 -20, 0 -28" stroke="#738563" strokeWidth="2" fill="none" strokeLinecap="round" />
          <Leaf x={0} y={-20} r={-140} s={0.32} />
          <Leaf x={0} y={-24} r={-38} s={0.3} fill="url(#rb-leaf-dark)" />
        </g>
      ))}

      {/* drifting petals */}
      {[
        [60, 120, 0, "#ecc6c7"],
        [340, 230, 3, "#dea3a8"],
        [150, 200, 6, "#dcc2d6"],
        [360, 90, 9, "#f6e1e0"],
        [40, 260, 4.5, "#fbe7d8"],
      ].map(([x, y, delay, c]) => (
        <ellipse
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          rx="5"
          ry="9"
          fill={c as string}
          className="motion-safe:animate-drift"
          style={{ animationDelay: `-${delay}s`, transformBox: "fill-box", transformOrigin: "center" }}
        />
      ))}
    </svg>
  )
}

/** Small arch frame with a sprig, used on inner page heroes. */
export function ArchSprig({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)} aria-hidden="true">
      <div className="arch absolute inset-0 bg-gradient-to-b from-rose-100 via-cream-100 to-sage-100" />
      <div className="arch absolute inset-3 border border-white/70" />
      <Sprig className="relative mx-auto h-full w-auto py-6" animate />
    </div>
  )
}
