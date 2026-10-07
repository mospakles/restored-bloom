"use client"

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en-NG">
      <body style={{ fontFamily: "system-ui, sans-serif", background: "#fdfaf5", color: "#341b31", padding: "4rem 1rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem" }}>Something went wrong</h1>
        <p>Sorry, the site couldn&apos;t be loaded. Please try again shortly.</p>
        <button
          onClick={() => reset()}
          style={{ marginTop: "1.5rem", padding: "0.75rem 1.5rem", borderRadius: 999, border: 0, background: "#42253d", color: "#fff", cursor: "pointer" }}
        >
          Try again
        </button>
        <p style={{ marginTop: "2rem", fontSize: "0.9rem" }}>If someone is in immediate danger, contact local emergency services.</p>
      </body>
    </html>
  )
}
