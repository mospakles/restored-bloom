export type UserRole = "user" | "admin" | "moderator" | "volunteer"

export interface User {
  id: string
  email: string
  name?: string
  role: UserRole
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface Resource {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: ResourceCategory
  tags: string[]
  author?: string
  read_time?: number
  image_url?: string
  published: boolean
  featured: boolean
  downloadable?: boolean
  download_url?: string
  created_at: string
  updated_at: string
}

export type ResourceCategory =
  | "survivors"
  | "parents"
  | "teenagers"
  | "women"
  | "faith"
  | "sexual-health"
  | "counseling"
  | "legal"
  | "emergency"

export interface Story {
  id: string
  content: string
  author_alias?: string
  category: StoryCategory
  is_anonymous: boolean
  is_published: boolean
  trigger_warning: boolean
  helpful_count: number
  created_at: string
}

export type StoryCategory =
  | "adult-survivor"
  | "teen-survivor"
  | "male-survivor"
  | "parent"
  | "caregiver"
  | "faith-journey"
  | "recovery"

export interface HelpRequest {
  id: string
  reference_code: string
  name?: string
  email?: string
  phone?: string
  contact_method: ContactMethod
  message: string
  is_anonymous: boolean
  status: RequestStatus
  category: HelpCategory
  created_at: string
  updated_at: string
}

export type ContactMethod = "none" | "email" | "phone" | "check-back"
export type RequestStatus = "pending" | "in-review" | "responded" | "closed"
export type HelpCategory =
  | "abuse-support"
  | "sexual-health"
  | "counseling"
  | "legal"
  | "emergency"
  | "other"

export interface VolunteerApplication {
  id: string
  full_name: string
  email: string
  phone: string
  role: VolunteerRole
  organization?: string
  qualifications: string
  experience: string
  motivation: string
  credentials_url?: string
  status: ApplicationStatus
  created_at: string
}

export type VolunteerRole =
  | "therapist"
  | "counselor"
  | "social-worker"
  | "lawyer"
  | "child-advocate"
  | "medical"
  | "faith-leader"
  | "educator"
  | "content-writer"
  | "tech-volunteer"

export type ApplicationStatus = "pending" | "under-review" | "approved" | "rejected"

export interface PrayerRequest {
  id: string
  request: string
  is_anonymous: boolean
  author_name?: string
  created_at: string
}

export interface Testimonial {
  id: string
  quote: string
  author: string
  role?: string
  image_url?: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  order: number
}
