import type { Metadata } from "next"
import Link from "next/link"
import { Heart } from "lucide-react"
import { RegisterForm } from "@/components/auth/auth-forms"

export const metadata: Metadata = { title: "Create Account", description: "Create a Restored Bloom account to access your dashboard and saved resources." }

export default function RegisterPage() {
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
          <h1 className="text-2xl font-bold text-stone-900 mb-2">Create your account</h1>
          <p className="text-stone-500">Save resources and track your requests</p>
        </div>
        <div className="bg-white rounded-3xl border border-stone-100 shadow-sm p-8">
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}
