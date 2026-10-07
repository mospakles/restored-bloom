"use client"

import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main id="main" className="mx-auto flex min-h-[70dvh] max-w-xl flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="text-4xl text-plum-900">Something went wrong</h1>
      <p className="mt-4 text-lg leading-relaxed text-plum-700">
        Sorry, this page couldn&apos;t be loaded. Please try again. If you were submitting a form, your information
        may not have been sent.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button onClick={() => reset()}>Try again</Button>
        <Link href="/" className={buttonVariants({ variant: "outline" })}>
          Homepage
        </Link>
      </div>
      <p className="mt-8 text-sm text-plum-600">
        If someone is in immediate danger, please contact local emergency services.
      </p>
    </main>
  )
}
