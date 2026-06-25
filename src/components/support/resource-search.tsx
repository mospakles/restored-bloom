"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Search, Filter, Clock, ArrowRight, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SAMPLE_RESOURCES } from "@/lib/data"
import { cn } from "@/lib/utils"

const categories = [
  { value: "all", label: "All" },
  { value: "survivors", label: "Survivors" },
  { value: "parents", label: "Parents" },
  { value: "teenagers", label: "Teenagers" },
  { value: "women", label: "Women" },
  { value: "faith", label: "Faith" },
  { value: "sexual-health", label: "Sexual Health" },
]

const categoryColors: Record<string, "teal" | "lavender" | "blush" | "sage" | "amber"> = {
  survivors: "teal",
  faith: "lavender",
  parents: "blush",
  teenagers: "sage",
  women: "lavender",
  "sexual-health": "teal",
}

export function ResourceSearch() {
  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  const filtered = useMemo(() => {
    return SAMPLE_RESOURCES.filter((r) => {
      const matchesCategory = activeCategory === "all" || r.category === activeCategory
      const matchesQuery =
        !query ||
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        r.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      return matchesCategory && matchesQuery && r.published
    })
  }, [query, activeCategory])

  return (
    <div>
      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5 mb-7">
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search resources, topics, or keywords…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-stone-50"
            aria-label="Search resources"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-all border",
                activeCategory === cat.value
                  ? "bg-teal-700 text-white border-teal-700"
                  : "bg-white text-stone-600 border-stone-200 hover:border-teal-300 hover:text-teal-700"
              )}
              aria-pressed={activeCategory === cat.value}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-stone-400">
          <Search className="h-10 w-10 mx-auto mb-3 opacity-40" />
          <p className="font-medium text-stone-500">No resources found</p>
          <p className="text-sm mt-1">Try a different search term or category</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-stone-400 mb-5">
            Showing <span className="font-semibold text-stone-700">{filtered.length}</span> resource{filtered.length !== 1 ? "s" : ""}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((resource) => (
              <article key={resource.id} className="group">
                <Link
                  href={`/resources/${resource.slug}`}
                  className="block bg-white rounded-2xl border border-stone-100 p-5 h-full hover:border-teal-200 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <Badge variant={categoryColors[resource.category] ?? "teal"} className="capitalize">
                      {resource.category}
                    </Badge>
                    {resource.read_time && (
                      <span className="flex items-center gap-1 text-xs text-stone-400 shrink-0">
                        <Clock className="h-3.5 w-3.5" />
                        {resource.read_time} min
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-stone-900 mb-2 leading-snug group-hover:text-teal-700 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-stone-500 leading-relaxed mb-4">{resource.excerpt}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {resource.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-stone-100 text-stone-500 px-2 py-0.5 rounded-md">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 group-hover:gap-2.5 transition-all">
                    Read article <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
