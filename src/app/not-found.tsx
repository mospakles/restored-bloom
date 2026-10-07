import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { Sprig } from "@/components/site/botanical"
import { Logo } from "@/components/site/header"

export default function NotFound() {
  return (
    <main id="main" className="flex min-h-dvh flex-col items-center justify-center px-4 py-16 text-center">
      <Link href="/" aria-label="Restored Bloom home">
        <Logo />
      </Link>
      <Sprig className="mt-10 h-40" />
      <h1 className="mt-6 text-4xl text-plum-900 sm:text-5xl">We couldn&apos;t find that page</h1>
      <p className="mt-4 max-w-md text-lg leading-relaxed text-plum-700">
        It may have moved, or the link may be incorrect. These pages might help:
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className={buttonVariants()}>
          Homepage
        </Link>
        <Link href="/resources" className={buttonVariants({ variant: "outline" })}>
          Resources
        </Link>
        <Link href="/support" className={buttonVariants({ variant: "outline" })}>
          Finding support
        </Link>
      </div>
    </main>
  )
}
