import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"
import { FOOTER_LINKS, SITE } from "@/lib/content"
import type { SiteSettings } from "@/server/settings"
import { Logo } from "@/components/site/header"
import { Container } from "@/components/ui/misc"

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  const social = (
    [
      ["Instagram", settings.instagram],
      ["Facebook", settings.facebook],
      ["X (Twitter)", settings.x],
      ["LinkedIn", settings.linkedin],
    ] as const
  ).filter(([, url]) => url)

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-cream-300 bg-gradient-to-b from-cream-100 to-[#f3eadc]">
      <svg
        viewBox="0 0 100 100"
        className="pointer-events-none absolute -bottom-28 -right-20 h-[26rem] w-[26rem] text-rose-200/45 motion-safe:animate-[sway_18s_ease-in-out_infinite]"
        aria-hidden="true"
        focusable="false"
      >
        <g transform="translate(50 50)" fill="currentColor">
          {[0, 72, 144, 216, 288].map((r) => (
            <ellipse key={r} cx="0" cy="-22" rx="13" ry="22" transform={`rotate(${r})`} />
          ))}
        </g>
      </svg>
      <div className="bg-plum-900 text-cream-100">
        <Container className="flex flex-col gap-2 py-4 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            <strong className="font-semibold text-white">Restored Bloom is not an emergency service.</strong> If someone
            is in immediate danger, contact local emergency services.
          </p>
          <Link href="/support" className="font-semibold text-rose-200 underline underline-offset-4 hover:text-white">
            Finding support
          </Link>
        </Container>
      </div>
      <Container className="relative grid gap-10 py-16 md:grid-cols-[1.3fr_2fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm leading-relaxed text-plum-700">{SITE.tagline}</p>
          <ul className="mt-6 space-y-2 text-sm text-plum-800">
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-rose-700" aria-hidden="true" />
              {settings.location || SITE.city}
            </li>
            {settings.contactEmail && (
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-rose-700" aria-hidden="true" />
                <a href={`mailto:${settings.contactEmail}`} className="underline-offset-4 hover:underline">
                  {settings.contactEmail}
                </a>
              </li>
            )}
            {settings.contactPhone && (
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-rose-700" aria-hidden="true" />
                <a href={`tel:${settings.contactPhone.replace(/[^\d+]/g, "")}`} className="underline-offset-4 hover:underline">
                  {settings.contactPhone}
                </a>
              </li>
            )}
          </ul>
          {social.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-3 text-sm">
              {social.map(([label, url]) => (
                <li key={label}>
                  <a href={url} rel="noopener noreferrer" target="_blank" className="font-medium text-plum-800 underline-offset-4 hover:underline">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <nav key={heading} aria-label={heading}>
              <h2 className="font-sans text-sm font-bold uppercase tracking-[0.14em] text-plum-900">{heading}</h2>
              <ul className="mt-4 space-y-2.5">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-plum-700 underline-offset-4 hover:text-plum-900 hover:underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </Container>
      <div className="relative border-t border-cream-300">
        <Container className="flex flex-col gap-2 py-6 text-sm text-plum-600 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name}. Founded by {SITE.founder}.
          </p>
          {settings.registrationNotice && <p>{settings.registrationNotice}</p>}
        </Container>
      </div>
    </footer>
  )
}
