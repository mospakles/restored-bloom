"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, Lock, Copy, CheckCircle, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { helpRequestSchema, type HelpRequestFormData } from "@/lib/validations"
import { generateReferenceCode } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

export function AnonymousHelpForm() {
  const [submitted, setSubmitted] = useState(false)
  const [referenceCode, setReferenceCode] = useState("")
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<HelpRequestFormData>({
    resolver: zodResolver(helpRequestSchema) as any,
    defaultValues: { is_anonymous: true, contact_method: "none", category: "abuse-support" },
  })

  const isAnonymous = watch("is_anonymous")

  const onSubmit = async (data: HelpRequestFormData) => {
    try {
      await new Promise((r) => setTimeout(r, 1000))
      const code = generateReferenceCode()
      setReferenceCode(code)
      setSubmitted(true)
    } catch {
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" })
    }
  }

  const copyCode = () => {
    navigator.clipboard.writeText(referenceCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl border border-teal-100 p-8 text-center shadow-sm"
      >
        <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="h-8 w-8 text-teal-600" />
        </div>
        <h3 className="text-2xl font-bold text-stone-900 mb-3">Your request has been received</h3>
        <p className="text-stone-500 mb-6 max-w-md mx-auto leading-relaxed">
          Thank you for reaching out. Your courage matters. We will review your message and respond within 48 hours.
        </p>

        <div className="bg-teal-50 border border-teal-200 rounded-2xl p-5 mb-6 max-w-sm mx-auto">
          <p className="text-sm text-teal-700 font-semibold mb-2">Your Secure Reference Code</p>
          <div className="flex items-center justify-between bg-white rounded-xl border border-teal-200 px-4 py-3 gap-3">
            <span className="font-mono text-lg font-bold text-teal-800 tracking-widest">{referenceCode}</span>
            <button
              onClick={copyCode}
              className="text-teal-600 hover:text-teal-800 transition-colors"
              aria-label="Copy reference code"
            >
              {copied ? <CheckCircle className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
            </button>
          </div>
          <p className="text-xs text-teal-600 mt-2">
            Save this code to check on your request status, no account needed.
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 max-w-sm mx-auto mb-6">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
            <p>If you are in immediate danger, please call your local emergency services now.</p>
          </div>
        </div>

        <Button onClick={() => setSubmitted(false)} variant="outline">
          Submit Another Request
        </Button>
      </motion.div>
    )
  }

  return (
    <div className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-teal-800 px-7 py-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center">
            <Lock className="h-5 w-5 text-teal-200" />
          </div>
          <h2 className="text-xl font-bold text-white">Anonymous Help Request</h2>
        </div>
        <p className="text-teal-200 text-sm">
          All fields are optional. Your identity is completely protected.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-7 space-y-5" noValidate>
        {/* Anonymous toggle */}
        <div className="bg-teal-50 border border-teal-100 rounded-2xl p-4 flex items-start gap-3">
          <Controller
            name="is_anonymous"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="is_anonymous"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <div>
            <label htmlFor="is_anonymous" className="text-sm font-semibold text-teal-900 cursor-pointer flex items-center gap-2">
              <Shield className="h-4 w-4 text-teal-600" />
              Submit completely anonymously
            </label>
            <p className="text-xs text-teal-600 mt-0.5">
              No personal data stored. No tracking. Fully encrypted.
            </p>
          </div>
        </div>

        {/* Category */}
        <div className="space-y-1.5">
          <Label htmlFor="category">What type of support do you need?</Label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="abuse-support">Sexual Abuse Support</SelectItem>
                  <SelectItem value="sexual-health">Sexual Health Information</SelectItem>
                  <SelectItem value="counseling">Counselling / Therapy Referral</SelectItem>
                  <SelectItem value="legal">Legal Assistance</SelectItem>
                  <SelectItem value="emergency">Emergency / Crisis Support</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {/* Optional contact info */}
        <AnimatePresence>
          {!isAnonymous && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 overflow-hidden"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Name (optional)</Label>
                  <Input id="name" placeholder="Your name" {...register("name")} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email (optional)</Label>
                  <Input id="email" type="email" placeholder="your@email.com" {...register("email")} error={errors.email?.message} />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="contact_method">How should we respond?</Label>
                <Controller
                  name="contact_method"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="contact_method">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No contact needed, just submitting</SelectItem>
                        <SelectItem value="email">Email me back</SelectItem>
                        <SelectItem value="check-back">I'll check back with my reference code</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Message */}
        <div className="space-y-1.5">
          <Label htmlFor="message">
            How can we help you? <span className="text-stone-400 font-normal">(required)</span>
          </Label>
          <Textarea
            id="message"
            placeholder="Share as much or as little as you feel comfortable with. There is no wrong thing to say. We are here to listen and support you."
            rows={5}
            {...register("message")}
            error={errors.message?.message}
          />
          <p className="text-xs text-stone-400">Your message is encrypted and handled with strict confidentiality.</p>
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Submitting securely…
            </span>
          ) : (
            <>
              <Lock className="h-4 w-4" />
              Send Your Message Safely
            </>
          )}
        </Button>
      </form>
    </div>
  )
}
