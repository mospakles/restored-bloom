import { ImageResponse } from "next/og"
import { SITE } from "@/lib/content"

export const alt = `${SITE.name} — ${SITE.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

function Petal({ x, y, r, color }: { x: number; y: number; r: number; color: string }) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 70,
        height: 120,
        borderRadius: "50%",
        background: color,
        transform: `rotate(${r}deg)`,
      }}
    />
  )
}

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #f8f1e6 0%, #fdfaf5 60%, #e3eadb 100%)",
          position: "relative",
          color: "#341b31",
        }}
      >
        <Petal x={940} y={60} r={20} color="#ecc6c7" />
        <Petal x={1020} y={140} r={95} color="#dea3a8" />
        <Petal x={930} y={200} r={160} color="#f6e1e0" />
        <Petal x={860} y={110} r={-60} color="#cad6bc" />
        <div style={{ fontSize: 34, color: "#823f4b", letterSpacing: 4, textTransform: "uppercase", display: "flex" }}>
          Lagos, Nigeria
        </div>
        <div style={{ fontSize: 96, fontWeight: 700, marginTop: 16, display: "flex" }}>{SITE.name}</div>
        <div style={{ fontSize: 40, marginTop: 24, maxWidth: 820, lineHeight: 1.3, color: "#52304c", display: "flex" }}>
          {SITE.tagline}
        </div>
      </div>
    ),
    size,
  )
}
