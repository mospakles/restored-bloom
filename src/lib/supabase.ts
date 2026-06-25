import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          role: string
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database["public"]["Tables"]["users"]["Row"], "id" | "created_at" | "updated_at">
        Update: Partial<Database["public"]["Tables"]["users"]["Insert"]>
      }
      resources: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string
          content: string
          category: string
          tags: string[]
          author: string | null
          read_time: number | null
          image_url: string | null
          published: boolean
          featured: boolean
          downloadable: boolean
          download_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database["public"]["Tables"]["resources"]["Row"], "id" | "created_at" | "updated_at">
        Update: Partial<Database["public"]["Tables"]["resources"]["Insert"]>
      }
      stories: {
        Row: {
          id: string
          content: string
          author_alias: string | null
          category: string
          is_anonymous: boolean
          is_published: boolean
          trigger_warning: boolean
          helpful_count: number
          created_at: string
        }
        Insert: Omit<Database["public"]["Tables"]["stories"]["Row"], "id" | "created_at" | "helpful_count">
        Update: Partial<Database["public"]["Tables"]["stories"]["Insert"]>
      }
      help_requests: {
        Row: {
          id: string
          reference_code: string
          name: string | null
          email: string | null
          phone: string | null
          contact_method: string
          message: string
          is_anonymous: boolean
          status: string
          category: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database["public"]["Tables"]["help_requests"]["Row"], "id" | "created_at" | "updated_at">
        Update: Partial<Database["public"]["Tables"]["help_requests"]["Insert"]>
      }
      volunteer_applications: {
        Row: {
          id: string
          full_name: string
          email: string
          phone: string
          role: string
          organization: string | null
          qualifications: string
          experience: string
          motivation: string
          credentials_url: string | null
          status: string
          created_at: string
        }
        Insert: Omit<Database["public"]["Tables"]["volunteer_applications"]["Row"], "id" | "created_at">
        Update: Partial<Database["public"]["Tables"]["volunteer_applications"]["Insert"]>
      }
      prayer_requests: {
        Row: {
          id: string
          request: string
          is_anonymous: boolean
          author_name: string | null
          created_at: string
        }
        Insert: Omit<Database["public"]["Tables"]["prayer_requests"]["Row"], "id" | "created_at">
        Update: Partial<Database["public"]["Tables"]["prayer_requests"]["Insert"]>
      }
    }
  }
}
