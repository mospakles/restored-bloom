import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"
import { SITE_CONFIG, CRISIS_LINES } from "@/lib/data"

const SERIF = "DM Serif Display, Playfair Display, Georgia, serif"
const SANS = "Inter, system-ui, sans-serif"

const footerLinks = {
  "Get Help": [
    { label: "Get Help Now", href: "/get-help" },
    { label: "Sexual Abuse Support", href: "/sexual-abuse-support" },
    { label: "Women's Sexual Health", href: "/womens-health" },
    { label: "Teen Support", href: "/teen-support" },
    { label: "Parent Resources", href: "/parent-resources" },
    { label: "Anonymous Request", href: "/get-help#anonymous" },
  ],
  Resources: [
    { label: "Resource Library", href: "/resources" },
    { label: "Faith & Healing", href: "/faith-healing" },
    { label: "Anonymous Stories", href: "/anonymous-stories" },
    { label: "FAQ", href: "/faq" },
    { label: "Counsellor Directory", href: "/resources#counselors" },
  ],
  Organisation: [
    { label: "About Us", href: "/about" },
    { label: "Mission & Vision", href: "/mission" },
    { label: "Volunteer", href: "/volunteer" },
    { label: "Partnerships", href: "/partnerships" },
    { label: "Donate", href: "/donate" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Safeguarding Policy", href: "/safeguarding" },
    { label: "Child Protection", href: "/child-protection" },
  ],
}

export function Footer() {
  return (
    <footer style={{ backgroundColor: "#0A1528" }} aria-label="Site footer">

      {/* Crisis strip */}
      <div style={{ backgroundColor: "rgba(125,60,51,0.35)", borderBottom: "1px solid rgba(125,60,51,0.3)" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
            <span
              className="text-xs font-semibold uppercase tracking-widest shrink-0"
              style={{ color: "#F5C5B8", fontFamily: SANS }}
            >
              Crisis Lines
            </span>
            {CRISIS_LINES.map((line) => (
              <span key={line.country} className="text-xs" style={{ fontFamily: SANS }}>
                <span style={{ color: "rgba(253,250,246,0.45)" }}>{line.country}: </span>
                <span className="font-semibold" style={{ color: "#F5C5B8" }}>{line.number}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 md:gap-12">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6 group">
              <span
                className="text-[1.3rem] leading-none transition-opacity group-hover:opacity-75"
                style={{ fontFamily: SERIF, fontWeight: 400, color: "#FDFAF6" }}
              >
                Restored <em className="not-italic" style={{ color: "#9DD3D3" }}>Bloom</em>
              </span>
            </Link>
            <p
              className="text-sm leading-relaxed mb-8 max-w-xs"
              style={{ color: "rgba(253,250,246,0.45)", fontFamily: SANS }}
            >
              A safe, compassionate, faith-centered sanctuary for survivors, families,
              and all those seeking healing, hope, and support.
            </p>

            {/* Contact info */}
            <div className="space-y-3 mb-8">
              {[
                { Icon: Mail, label: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}` },
                { Icon: Phone, label: SITE_CONFIG.phone, href: `tel:${SITE_CONFIG.phone}` },
                { Icon: MapPin, label: "Lagos, Nigeria", href: null },
              ].map(({ Icon, label, href }) => (
                href ? (
                  <a
                    key={label}
                    href={href}
                    className="flex items-center gap-3 text-sm transition-opacity hover:opacity-80"
                    style={{ color: "rgba(253,250,246,0.45)", fontFamily: SANS }}
                  >
                    <Icon className="h-4 w-4 shrink-0" style={{ color: "#9DD3D3" }} strokeWidth={1.5} />
                    {label}
                  </a>
                ) : (
                  <span
                    key={label}
                    className="flex items-center gap-3 text-sm"
                    style={{ color: "rgba(253,250,246,0.35)", fontFamily: SANS }}
                  >
                    <Icon className="h-4 w-4 shrink-0" style={{ color: "rgba(157,211,211,0.4)" }} strokeWidth={1.5} />
                    {label}
                  </span>
                )
              ))}
            </div>

            {/* Social links — text-based, not icons */}
            <div className="flex flex-wrap gap-4">
              {["Instagram", "Facebook", "Twitter"].map((platform) => (
                <a
                  key={platform}
                  href={SITE_CONFIG.social[platform.toLowerCase() as keyof typeof SITE_CONFIG.social]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium transition-opacity hover:opacity-80"
                  style={{ color: "rgba(253,250,246,0.35)", fontFamily: SANS }}
                  aria-label={platform}
                >
                  {platform}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3
                className="text-xs font-semibold uppercase tracking-widest mb-5"
                style={{ color: "rgba(253,250,246,0.3)", fontFamily: SANS }}
              >
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm transition-opacity hover:opacity-80"
                      style={{ color: "rgba(253,250,246,0.5)", fontFamily: SANS }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="text-xs"
            style={{ color: "rgba(253,250,246,0.25)", fontFamily: SANS }}
          >
            © {new Date().getFullYear()} Restored Bloom NGO. All rights reserved. Registered Non-Profit Organisation.
          </p>
          <p
            className="text-xs"
            style={{ color: "rgba(253,250,246,0.2)", fontFamily: SANS }}
          >
            Made with care, for every survivor.
          </p>
        </div>
      </div>
    </footer>
  )
}
