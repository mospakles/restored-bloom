"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { CheckCircle, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { volunteerSchema, type VolunteerFormData } from "@/lib/validations"
import { useToast } from "@/hooks/use-toast"

export function VolunteerForm() {
  const [submitted, setSubmitted] = useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<VolunteerFormData>({
    resolver: zodResolver(volunteerSchema) as any,
    defaultValues: { consent: false },
  })

  const onSubmit = async (data: VolunteerFormData) => {
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
        className="bg-white rounded-3xl border border-emerald-100 p-10 text-center"
      >
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="h-8 w-8 text-emerald-600" />
        </div>
        <h3 className="text-2xl font-bold text-stone-900 mb-3">Application received!</h3>
        <p className="text-stone-500 leading-relaxed max-w-md mx-auto">
          Thank you for your heart to serve. Our team will review your application and reach out within 5–7 business days.
        </p>
      </motion.div>
    )
  }

  return (
    <div className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden">
      <div className="bg-emerald-700 px-7 py-6">
        <div className="flex items-center gap-3 mb-1">
          <Users className="h-5 w-5 text-emerald-200" />
          <h2 className="text-xl font-bold text-white">Volunteer Application</h2>
        </div>
        <p className="text-emerald-200 text-sm">Join a team that's changing lives.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-7 space-y-5" noValidate>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="full_name">Full Name *</Label>
            <Input id="full_name" placeholder="Your full name" {...register("full_name")} error={errors.full_name?.message} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="v_email">Email Address *</Label>
            <Input id="v_email" type="email" placeholder="your@email.com" {...register("email")} error={errors.email?.message} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="v_phone">Phone Number *</Label>
            <Input id="v_phone" type="tel" placeholder="+234…" {...register("phone")} error={errors.phone?.message} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="organization">Organisation (optional)</Label>
            <Input id="organization" placeholder="Where do you currently work?" {...register("organization")} />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label>Role you'd like to fill *</Label>
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your volunteer role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="therapist">Licensed Therapist</SelectItem>
                  <SelectItem value="counselor">Counsellor</SelectItem>
                  <SelectItem value="social-worker">Social Worker</SelectItem>
                  <SelectItem value="lawyer">Lawyer / Legal Advocate</SelectItem>
                  <SelectItem value="child-advocate">Child Protection Advocate</SelectItem>
                  <SelectItem value="medical">Medical Professional</SelectItem>
                  <SelectItem value="faith-leader">Faith Leader / Chaplain</SelectItem>
                  <SelectItem value="educator">Educator / Trainer</SelectItem>
                  <SelectItem value="content-writer">Content Writer / Editor</SelectItem>
                  <SelectItem value="tech-volunteer">Technology Volunteer</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.role && <p className="text-xs text-red-500">{errors.role.message}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="qualifications">Qualifications & Credentials *</Label>
          <Textarea
            id="qualifications"
            placeholder="Describe your relevant qualifications, certifications, and licenses…"
            rows={3}
            {...register("qualifications")}
            error={errors.qualifications?.message}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="experience">Relevant Experience *</Label>
          <Textarea
            id="experience"
            placeholder="Tell us about your experience working with survivors, vulnerable individuals, or related fields…"
            rows={3}
            {...register("experience")}
            error={errors.experience?.message}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="motivation">Why do you want to volunteer with Restored Bloom? *</Label>
          <Textarea
            id="motivation"
            placeholder="Share your motivation and what you hope to contribute…"
            rows={3}
            {...register("motivation")}
            error={errors.motivation?.message}
          />
        </div>

        <div className="flex items-start gap-3">
          <Controller
            name="consent"
            control={control}
            render={({ field }) => (
              <Checkbox id="v_consent" checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
          <div>
            <label htmlFor="v_consent" className="text-sm text-stone-700 cursor-pointer">
              I agree to Restored Bloom's safeguarding policy, code of conduct, and consent to a background check if required.
            </label>
            {errors.consent && <p className="text-xs text-red-500 mt-1">{errors.consent.message}</p>}
          </div>
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Submitting application…
            </span>
          ) : (
            <>
              <Users className="h-4 w-4" />
              Submit My Application
            </>
          )}
        </Button>
      </form>
    </div>
  )
}
