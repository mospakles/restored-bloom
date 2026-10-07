import { connection } from "next/server"
import { SiteHeader } from "@/components/site/header"
import { SiteFooter } from "@/components/site/footer"
import { AnalyticsConsent } from "@/components/site/analytics-consent"
import { SiteMotion } from "@/components/site/reveal"
import { getSettings } from "@/server/settings"

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  await connection()
  const settings = await getSettings()
  const analyticsDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN
  const analyticsSrc = process.env.NEXT_PUBLIC_PLAUSIBLE_SRC ?? "https://plausible.io/js/script.js"

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-plum-900 focus:px-5 focus:py-3 focus:text-white"
      >
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <SiteFooter settings={settings} />
      <SiteMotion />
      {analyticsDomain && <AnalyticsConsent domain={analyticsDomain} src={analyticsSrc} />}
    </>
  )
}
