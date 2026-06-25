import type { Metadata } from "next"
import Link from "next/link"
import { Heart, Shield } from "lucide-react"
import { LoginForm } from "@/components/auth/auth-forms"

export const metadata: Metadata = { title: "Sign In", description: "Sign in to your Restored Bloom account." }

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] bg-stone-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-teal-700 rounded-full flex items-center justify-center">
              <Heart className="h-5 w-5 text-white fill-white" />
            </div>
            <span className="font-bold text-lg text-stone-900">Restored Bloom</span>
          </Link>
          <h1 className="text-2xl font-bold text-stone-900 mb-2">Welcome back</h1>
          <p className="text-stone-500">Sign in to your account</p>
        </div>
        <div className="bg-white rounded-3xl border border-stone-100 shadow-sm p-8">
          <LoginForm />
        </div>
        <div className="mt-6 bg-teal-50 border border-teal-100 rounded-2xl p-4 text-center">
          <div className="flex items-center justify-center gap-2 text-teal-700 text-sm font-medium mb-1">
            <Shield className="h-4 w-4" />
            Need help without an account?
          </div>
          <Link href="/get-help" className="text-sm text-teal-700 underline">Use our anonymous help form, no account required</Link>
        </div>
      </div>
    </div>
  )
}
