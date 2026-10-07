import type { Metadata } from "next"
import "./globals.css"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { EmergencyBanner } from "@/components/layout/emergency-banner"
import { Toaster } from "@/components/ui/toaster"
import { SITE_CONFIG } from "@/lib/data"

export const metadata: Metadata = {
  title: { default: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`, template: `%s | ${SITE_CONFIG.name}` },
  description: SITE_CONFIG.description,
  keywords: ["sexual abuse support", "trauma healing", "survivor support", "sexual health", "counselling", "Nigeria", "restored bloom"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
  },
  twitter: { card: "summary_large_image" },
  metadataBase: new URL(SITE_CONFIG.url),
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col" style={{ backgroundColor: "#FDFAF6", color: "#2C3040" }}>
        <EmergencyBanner />
        <Navbar />
        <main className="flex-1" id="main-content">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
