"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { CheckCircle, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { storySchema, type StoryFormData } from "@/lib/validations"
import { useToast } from "@/hooks/use-toast"

export function StorySubmissionForm() {
  const [submitted, setSubmitted] = useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<StoryFormData>({
    resolver: zodResolver(storySchema) as any,
    defaultValues: { is_anonymous: true, trigger_warning: false, consent: false },
  })

  const charCount = watch("content")?.length ?? 0

  const onSubmit = async (data: StoryFormData) => {
    try {
      await new Promise((r) => setTimeout(r, 1000))
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
        className="bg-white rounded-3xl border border-purple-100 p-10 text-center"
      >
        <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-5">
          <Heart className="h-8 w-8 text-purple-600 fill-purple-200" />
        </div>
        <h3 className="text-2xl font-bold text-stone-900 mb-3">Thank you for your courage</h3>
        <p className="text-stone-500 leading-relaxed max-w-md mx-auto">
          Your story has been submitted for review. Once approved by our moderation team, it will be shared on the story wall to remind others they are not alone.
        </p>
      </motion.div>
    )
  }

  return (
    <div className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden">
      <div className="bg-purple-700 px-7 py-6">
        <h2 className="text-xl font-bold text-white mb-1">Share Your Story</h2>
        <p className="text-purple-200 text-sm">Your story could be the hope someone else needs today.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-7 space-y-5" noValidate>
        {/* Category */}
        <div className="space-y-1.5">
          <Label>I am sharing as a…</Label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your story category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="adult-survivor">Adult Survivor</SelectItem>
                  <SelectItem value="teen-survivor">Teen Survivor</SelectItem>
                  <SelectItem value="male-survivor">Male Survivor</SelectItem>
                  <SelectItem value="parent">Parent / Guardian</SelectItem>
                  <SelectItem value="caregiver">Caregiver / Supporter</SelectItem>
                  <SelectItem value="faith-journey">Faith Journey</SelectItem>
                  <SelectItem value="recovery">Recovery Story</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.category && <p className="text-xs text-red-500">{errors.category.message}</p>}
        </div>

        {/* Story content */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <Label htmlFor="content">Your Story</Label>
            <span className={`text-xs ${charCount > 9000 ? "text-red-500" : "text-stone-400"}`}>
              {charCount}/10,000
            </span>
          </div>
          <Textarea
            id="content"
            placeholder="Share your story here. You might write about your experience, your healing journey, what helped you, or what you wish someone had told you. There are no wrong words."
            rows={8}
            {...register("content")}
            error={errors.content?.message}
          />
        </div>

        {/* Alias */}
        <div className="space-y-1.5">
          <Label htmlFor="author_alias">Name or Alias (optional)</Label>
          <Input
            id="author_alias"
            placeholder="e.g., A Survivor, Restored, Anonymous"
            {...register("author_alias")}
          />
          <p className="text-xs text-stone-400">Leave blank or use a pseudonym, your real identity is never revealed.</p>
        </div>

        {/* Options */}
        <div className="space-y-3 bg-stone-50 rounded-2xl p-4">
          {[
            { name: "is_anonymous" as const, label: "Keep my submission completely anonymous", desc: "No identifying information will be stored or shown." },
            { name: "trigger_warning" as const, label: "Add a trigger warning to my story", desc: "Recommended if your story contains descriptions of abuse or trauma." },
          ].map(({ name, label, desc }) => (
            <div key={name} className="flex items-start gap-3">
              <Controller
                name={name}
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id={name}
                    checked={field.value as boolean}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <div>
                <label htmlFor={name} className="text-sm font-medium text-stone-800 cursor-pointer">{label}</label>
                <p className="text-xs text-stone-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Consent */}
        <div className="flex items-start gap-3">
          <Controller
            name="consent"
            control={control}
            render={({ field }) => (
              <Checkbox id="consent" checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
          <div>
            <label htmlFor="consent" className="text-sm text-stone-700 cursor-pointer">
              I consent to this story being published on the Restored Bloom story wall after moderation review, and confirm it is my own genuine experience.
            </label>
            {errors.consent && <p className="text-xs text-red-500 mt-1">{errors.consent.message}</p>}
          </div>
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Submitting…
            </span>
          ) : (
            <>
              <Heart className="h-4 w-4" />
              Submit Your Story
            </>
          )}
        </Button>
      </form>
    </div>
  )
}
