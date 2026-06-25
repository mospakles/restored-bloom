"use client"

import { useState } from "react"
import { MapPin, Star, Clock, Search, Filter, Phone, Mail, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Counselor {
  id: string
  name: string
  title: string
  specializations: string[]
  location: string
  availability: string
  rating: number
  reviews: number
  languages: string[]
  faithBased: boolean
  online: boolean
  freeConsult: boolean
  bio: string
}

const COUNSELORS: Counselor[] = [
  {
    id: "1",
    name: "Dr. Adaeze Okonkwo",
    title: "Clinical Psychologist · Trauma Specialist",
    specializations: ["Sexual trauma", "PTSD", "EMDR therapy", "Adult survivors"],
    location: "Lagos Island, Lagos",
    availability: "Mon–Fri, 9am–5pm",
    rating: 4.9,
    reviews: 47,
    languages: ["English", "Igbo"],
    faithBased: true,
    online: true,
    freeConsult: true,
    bio: "Dr. Okonkwo has 14 years of experience working with survivors of sexual abuse and trauma. She is EMDR-certified and integrates faith-based approaches when requested.",
  },
  {
    id: "2",
    name: "Mr. Babatunde Afolabi",
    title: "Licensed Counsellor · Family Therapist",
    specializations: ["Family therapy", "Child abuse", "Parent support", "Relationship trauma"],
    location: "Abuja, FCT",
    availability: "Tue, Thu, Sat, flexible hours",
    rating: 4.8,
    reviews: 31,
    languages: ["English", "Yoruba", "Hausa"],
    faithBased: false,
    online: true,
    freeConsult: false,
    bio: "Babatunde specialises in supporting parents of abuse survivors and families navigating trauma together. Over 10 years in family systems therapy.",
  },
  {
    id: "3",
    name: "Dr. Chisom Eze",
    title: "Psychiatrist · Trauma-Informed Care",
    specializations: ["Complex PTSD", "Dissociation", "Depression post-abuse", "Male survivors"],
    location: "Port Harcourt, Rivers State",
    availability: "Mon, Wed, Fri, by appointment",
    rating: 4.7,
    reviews: 28,
    languages: ["English", "Igbo"],
    faithBased: false,
    online: false,
    freeConsult: false,
    bio: "Dr. Eze is a board-certified psychiatrist with a particular passion for supporting male survivors, who are frequently underserved in trauma care.",
  },
  {
    id: "4",
    name: "Sister Grace Ihejirika",
    title: "Pastoral Counsellor · Spiritual Director",
    specializations: ["Spiritual healing", "Faith crisis after abuse", "Grief", "Hope restoration"],
    location: "Enugu, Enugu State",
    availability: "Weekdays by arrangement",
    rating: 5.0,
    reviews: 19,
    languages: ["English", "Igbo"],
    faithBased: true,
    online: true,
    freeConsult: true,
    bio: "Sister Grace offers pastoral care rooted in deep compassion and decades of ministry. She works with survivors reconciling their faith after abuse.",
  },
]

const specialties = ["All", "Sexual trauma", "PTSD", "Family therapy", "Child abuse", "Male survivors", "Faith-based", "Online sessions"]

export function CounselorDirectory() {
  const [search, setSearch] = useState("")
  const [activeFilter, setActiveFilter] = useState("All")
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = COUNSELORS.filter((c) => {
    const matchSearch =
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase()) ||
      c.specializations.some((s) => s.toLowerCase().includes(search.toLowerCase()))

    const matchFilter =
      activeFilter === "All" ||
      (activeFilter === "Faith-based" && c.faithBased) ||
      (activeFilter === "Online sessions" && c.online) ||
      c.specializations.some((s) => s.toLowerCase().includes(activeFilter.toLowerCase()))

    return matchSearch && matchFilter
  })

  return (
    <div>
      {/* Search & filter */}
      <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5 mb-7">
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
          <input
            type="search"
            placeholder="Search by name, location, or specialisation…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 text-sm border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 bg-stone-50"
            aria-label="Search counselors"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {specialties.map((s) => (
            <button
              key={s}
              onClick={() => setActiveFilter(s)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
                activeFilter === s
                  ? "bg-teal-700 text-white border-teal-700"
                  : "bg-white text-stone-600 border-stone-200 hover:border-teal-300"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="grid md:grid-cols-2 gap-5">
        {filtered.map((c) => {
          const isOpen = expanded === c.id
          return (
            <div
              key={c.id}
              className="bg-white rounded-2xl border border-stone-100 p-5 hover:border-teal-100 hover:shadow-sm transition-all"
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-700 font-bold text-lg shrink-0">
                  {c.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-stone-900 leading-tight">{c.name}</h3>
                  <p className="text-xs text-stone-500 mt-0.5">{c.title}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-3.5 w-3.5",
                            i < Math.floor(c.rating) ? "text-amber-400 fill-amber-400" : "text-stone-200 fill-stone-200"
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-stone-400">{c.rating} ({c.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {c.faithBased && <Badge variant="lavender">Faith-based</Badge>}
                {c.online && <Badge variant="teal">Online sessions</Badge>}
                {c.freeConsult && <Badge variant="sage">Free consultation</Badge>}
              </div>

              {/* Specializations */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {c.specializations.map((s) => (
                  <span key={s} className="text-xs bg-stone-100 text-stone-500 px-2 py-0.5 rounded-md">{s}</span>
                ))}
              </div>

              {/* Info */}
              <div className="space-y-1.5 mb-4 text-xs text-stone-500">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-stone-400 shrink-0" />
                  {c.location}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-stone-400 shrink-0" />
                  {c.availability}
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-stone-400 shrink-0" />
                  Languages: {c.languages.join(", ")}
                </div>
              </div>

              {/* Bio (expanded) */}
              {isOpen && (
                <p className="text-sm text-stone-600 leading-relaxed mb-4 border-t border-stone-100 pt-4">{c.bio}</p>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                <button
                  onClick={() => setExpanded(isOpen ? null : c.id)}
                  className="text-xs text-teal-700 hover:underline"
                >
                  {isOpen ? "Show less" : "View profile"}
                </button>
                <Button size="sm" asChild>
                  <a href="/get-help">Request Referral</a>
                </Button>
              </div>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-stone-400">
          <Search className="h-10 w-10 mx-auto mb-3 opacity-40" />
          <p className="font-medium text-stone-500">No counselors match your search</p>
          <p className="text-sm mt-1">Try adjusting your filters</p>
        </div>
      )}
    </div>
  )
}
