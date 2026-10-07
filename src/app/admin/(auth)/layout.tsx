import Link from "next/link"
import { Logo } from "@/components/site/header"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main id="main" className="flex min-h-dvh flex-col items-center justify-center bg-gradient-to-b from-cream-100 to-cream-50 px-4 py-12">
      <Link href="/" aria-label="Restored Bloom website">
        <Logo />
      </Link>
      <div className="mt-8 w-full max-w-md rounded-[2rem] border border-cream-300 bg-white p-6 shadow-sm sm:p-8">{children}</div>
      <p className="mt-6 text-sm text-plum-600">Staff access only. There is no public registration.</p>
    </main>
  )
}
