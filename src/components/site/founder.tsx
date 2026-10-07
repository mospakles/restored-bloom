import { BloomMark } from "@/components/site/botanical"
import { DraftFlag } from "@/components/ui/misc"
import { SITE } from "@/lib/content"
import type { SiteSettings } from "@/server/settings"

const DRAFT_BIO = `${SITE.founder} founded Restored Bloom out of a deep conviction that every child deserves to grow up safe, informed and heard — and that survivors of sexual abuse deserve dignity, belief and hope. Restored Bloom brings that conviction wherever help is needed — into schools, faith communities, organisations and homes — through age-appropriate awareness and prevention education, working alongside educators, parents, leaders and qualified professionals.`

/** Founder profile. Shows a draft flag until an administrator marks the biography approved. */
export function FounderProfile({ settings, headingLevel = "h3" }: { settings: SiteSettings; headingLevel?: "h2" | "h3" }) {
  const bio = settings.founderBio || DRAFT_BIO
  const H = headingLevel
  return (
    <div className="grid gap-8 rounded-[2rem] border border-cream-300 bg-white p-6 sm:p-10 md:grid-cols-[auto_1fr] md:items-start">
      <div
        className="mx-auto flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br from-rose-100 via-cream-100 to-sage-100 md:mx-0"
        aria-hidden="true"
      >
        <BloomMark className="h-16 w-16 text-rose-400" />
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-rose-700">Founder</p>
        <H className="mt-2 text-3xl text-plum-900">{SITE.founder}</H>
        {!settings.founderBioApproved && (
          <p className="mt-3">
            <DraftFlag>Biography draft — awaiting founder confirmation</DraftFlag>
          </p>
        )}
        <div className="mt-4 space-y-4 text-lg leading-relaxed text-plum-800">
          {bio.split(/\n{2,}/).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    </div>
  )
}
