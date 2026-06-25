import { z } from "zod"

export const helpRequestSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  phone: z.string().optional(),
  contact_method: z.enum(["none", "email", "phone", "check-back"]),
  message: z.string().min(10, "Please provide more detail (at least 10 characters)").max(5000),
  category: z.enum(["abuse-support", "sexual-health", "counseling", "legal", "emergency", "other"]),
  is_anonymous: z.boolean().default(true),
})

export const storySchema = z.object({
  content: z
    .string()
    .min(50, "Your story should be at least 50 characters")
    .max(10000, "Story cannot exceed 10,000 characters"),
  author_alias: z.string().optional(),
  category: z.enum([
    "adult-survivor",
    "teen-survivor",
    "male-survivor",
    "parent",
    "caregiver",
    "faith-journey",
    "recovery",
  ]),
  is_anonymous: z.boolean().default(true),
  trigger_warning: z.boolean().default(false),
  consent: z.boolean().refine((v) => v === true, "You must consent to the terms"),
})

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters").max(2000),
})

export const volunteerSchema = z.object({
  full_name: z.string().min(2, "Full name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(8, "Please enter a valid phone number"),
  role: z.enum([
    "therapist",
    "counselor",
    "social-worker",
    "lawyer",
    "child-advocate",
    "medical",
    "faith-leader",
    "educator",
    "content-writer",
    "tech-volunteer",
  ]),
  organization: z.string().optional(),
  qualifications: z.string().min(20, "Please describe your qualifications"),
  experience: z.string().min(20, "Please describe your experience"),
  motivation: z.string().min(30, "Please tell us why you want to volunteer"),
  consent: z.boolean().refine((v) => v === true, "You must agree to our safeguarding policy"),
})

export const prayerRequestSchema = z.object({
  request: z
    .string()
    .min(10, "Please share your prayer request")
    .max(1000, "Prayer request cannot exceed 1,000 characters"),
  author_name: z.string().optional(),
  is_anonymous: z.boolean().default(true),
})

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[0-9]/, "Must contain at least one number"),
    confirmPassword: z.string(),
    terms: z.boolean().refine((v) => v === true, "You must accept the terms"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
})

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email"),
})

export type HelpRequestFormData = z.infer<typeof helpRequestSchema>
export type StoryFormData = z.infer<typeof storySchema>
export type ContactFormData = z.infer<typeof contactSchema>
export type VolunteerFormData = z.infer<typeof volunteerSchema>
export type PrayerRequestFormData = z.infer<typeof prayerRequestSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
export type LoginFormData = z.infer<typeof loginSchema>
export type NewsletterFormData = z.infer<typeof newsletterSchema>
