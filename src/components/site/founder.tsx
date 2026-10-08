import { BloomMark } from "@/components/site/botanical"
import { SITE } from "@/lib/content"
import type { SiteSettings } from "@/server/settings"

const DRAFT_BIO = `${SITE.founder} founded Restored Bloom out of a deep conviction that every child deserves to grow up safe, informed and heard and that survivors of sexual abuse deserve dignity, belief and hope. Restored Bloom brings that conviction wherever help is needed, into schools, faith communities, organisations and homes, through age-appropriate awareness and prevention education, working alongside educators, parents, leaders and qualified professionals.`

/** Founder profile. Shows a draft flag until an administrator marks the biography approved. */
export function FounderProfile({ settings, headingLevel = "h3" }: { settings: SiteSettings; headingLevel?: "h2" | "h3" }) {
  const bio = settings.founderBio || DRAFT_BIO
  const H = headingLevel
  return (
    <div className="relative overflow-hidden rounded-[2.5rem] border border-cream-300 bg-gradient-to-br from-white via-cream-50 to-lagoon-50/70 p-6 shadow-[var(--shadow-soft)] sm:p-12">
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-sage-100/70 blur-3xl" aria-hidden="true" />
      <div className="relative grid gap-10 md:grid-cols-[auto_1fr] md:items-center">
        <div className="relative mx-auto h-56 w-44 shrink-0 md:mx-0" aria-hidden="true">
          <div className="arch absolute inset-0 bg-gradient-to-b from-gold-100 via-cream-100 to-lagoon-100" />
          <div className="arch absolute inset-2.5 border border-white/80" />
          <div className="absolute inset-0 flex items-center justify-center">
            <BloomMark className="h-20 w-20 text-gold-400 motion-safe:animate-breathe" />
          </div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-lagoon-700">Meet our founder</p>
          <H className="mt-3 text-3xl text-plum-900 sm:text-[2.4rem]">{SITE.founder}</H>
          <div className="mt-5 space-y-4 text-lg leading-relaxed text-plum-800">
            {bio.split(/\n{2,}/).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
