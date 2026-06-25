"use client"
import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Heart, Mail, ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const schema = z.object({ email: z.string().email("Please enter a valid email") })

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) as any })
  const onSubmit = async () => { await new Promise(r => setTimeout(r, 800)); setSent(true) }

  return (
    <div className="min-h-[80vh] bg-stone-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-teal-700 rounded-full flex items-center justify-center"><Heart className="h-5 w-5 text-white fill-white" /></div>
            <span className="font-bold text-lg text-stone-900">Restored Bloom</span>
          </Link>
          <h1 className="text-2xl font-bold text-stone-900 mb-2">Reset your password</h1>
          <p className="text-stone-500">We'll send you a reset link</p>
        </div>
        <div className="bg-white rounded-3xl border border-stone-100 shadow-sm p-8">
          {sent ? (
            <div className="text-center">
              <div className="w-14 h-14 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle className="h-7 w-7 text-teal-600" /></div>
              <h2 className="font-bold text-stone-900 mb-2">Check your email</h2>
              <p className="text-stone-500 text-sm mb-6">If an account exists with that email, a reset link has been sent.</p>
              <Link href="/auth/login" className="text-teal-700 font-semibold hover:underline flex items-center justify-center gap-2"><ArrowLeft className="h-4 w-4" />Back to sign in</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="fp_email">Email Address</Label>
                <div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" /><Input id="fp_email" type="email" placeholder="your@email.com" className="pl-11" {...register("email")} error={errors.email?.message} /></div>
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full">{isSubmitting ? "Sending…" : "Send Reset Link"}</Button>
              <Link href="/auth/login" className="flex items-center justify-center gap-2 text-sm text-stone-500 hover:text-teal-700"><ArrowLeft className="h-4 w-4" />Back to sign in</Link>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
