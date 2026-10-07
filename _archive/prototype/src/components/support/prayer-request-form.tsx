"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { Heart, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { prayerRequestSchema, type PrayerRequestFormData } from "@/lib/validations"
import { useToast } from "@/hooks/use-toast"

export function PrayerRequestForm() {
  const [submitted, setSubmitted] = useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PrayerRequestFormData>({
    resolver: zodResolver(prayerRequestSchema) as any,
    defaultValues: { is_anonymous: true },
  })

  const isAnon = watch("is_anonymous")
  const charCount = watch("request")?.length ?? 0

  const onSubmit = async (_data: PrayerRequestFormData) => {
    try {
      await new Promise((r) => setTimeout(r, 800))
      setSubmitted(true)
    } catch {
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" })
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl border border-indigo-100 p-10 text-center"
      >
        <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-5">
          <Heart className="h-8 w-8 text-indigo-500 fill-indigo-200" />
        </div>
        <h3 className="text-2xl font-bold text-stone-900 mb-3">Your prayer has been received</h3>
        <p className="text-stone-500 leading-relaxed max-w-sm mx-auto">
          Your request has been added to our prayer wall. Our community stands with you.
        </p>
      </motion.div>
    )
  }

  return (
    <div className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden">
      <div className="bg-indigo-700 px-7 py-6">
        <div className="flex items-center gap-3 mb-1">
          <Heart className="h-5 w-5 text-indigo-200 fill-indigo-300" />
          <h2 className="text-xl font-bold text-white">Submit a Prayer Request</h2>
        </div>
        <p className="text-indigo-200 text-sm">Your request will be held in confidence and lifted in prayer.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-7 space-y-5" noValidate>
        <div className="space-y-1.5">
          <div className="flex justify-between">
            <Label htmlFor="prayer_request">Your Prayer Request</Label>
            <span className={`text-xs ${charCount > 900 ? "text-red-500" : "text-stone-400"}`}>{charCount}/1000</span>
          </div>
          <Textarea
            id="prayer_request"
            placeholder="Share your prayer request here. You may be as specific or as general as you feel comfortable being."
            rows={5}
            {...register("request")}
            error={errors.request?.message}
          />
        </div>

        <div className="flex items-start gap-3">
          <Controller
            name="is_anonymous"
            control={control}
            render={({ field }) => (
              <Checkbox id="prayer_anon" checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
          <label htmlFor="prayer_anon" className="text-sm text-stone-700 cursor-pointer">
            Keep my request anonymous
          </label>
        </div>

        {!isAnon && (
          <div className="space-y-1.5">
            <Label htmlFor="prayer_name">Your Name (optional)</Label>
            <Input id="prayer_name" placeholder="First name or alias" {...register("author_name")} />
          </div>
        )}

        <Button type="submit" disabled={isSubmitting} className="w-full bg-indigo-700 hover:bg-indigo-800" size="lg">
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Submitting…
            </span>
          ) : (
            <>
              <Heart className="h-4 w-4" />
              Submit Prayer Request
            </>
          )}
        </Button>
      </form>
    </div>
  )
}
