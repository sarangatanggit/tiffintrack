"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { searchDishes } from "@/app/actions"
import type { Dish } from "@/lib/db"
import { Spinner } from "@/components/ui/spinner"

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Dish[]>([])
  const [showResults, setShowResults] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  // Handle search functionality
  useEffect(() => {
    const fetchResults = async () => {
      if (searchQuery.trim() === "") {
        setSearchResults([])
        return
      }

      setIsLoading(true)
      try {
        const results = await searchDishes(searchQuery)
        setSearchResults(results)
      } catch (error) {
        console.error("Error searching dishes:", error)
      } finally {
        setIsLoading(false)
      }
    }

    // Debounce search requests
    const timeoutId = setTimeout(fetchResults, 300)
    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  // Handle click outside to close search results
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [searchRef])

  return (
    <div ref={searchRef} className="w-full">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          className="w-full bg-white pl-8 shadow-sm pr-8"
          placeholder="Search for a dish..."
          type="search"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setShowResults(true)
          }}
          onFocus={() => setShowResults(true)}
        />
        {searchQuery && (
          <button
            className="absolute right-2.5 top-2.5"
            onClick={() => {
              setSearchQuery("")
              setSearchResults([])
            }}
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showResults && searchResults.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border overflow-hidden">
          <ul className="py-1 divide-y">
            {searchResults.map((dish) => (
              <li key={dish.id}>
                <Link
                  href={`/dish/${dish.slug}`}
                  className="flex items-center px-4 py-2 hover:bg-gray-50"
                  onClick={() => {
                    setShowResults(false)
                    setSearchQuery("")
                  }}
                >
                  <div className="h-10 w-10 rounded overflow-hidden mr-3 flex-shrink-0">
                    <img
                      src={dish.image_url || "/placeholder.svg?height=40&width=40"}
                      alt={dish.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{dish.name}</p>
                    <p className="text-xs text-gray-500 truncate">{dish.region}</p>
                  </div>
                  <div className="text-xs text-gray-500">{dish.calories} cal</div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Loading State */}
      {showResults && isLoading && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border overflow-hidden">
          <div className="px-4 py-3 text-sm text-gray-500 text-center flex items-center justify-center">
            <Spinner size="sm" className="mr-2" />
            Searching...
          </div>
        </div>
      )}

      {/* No Results Message */}
      {showResults && searchQuery && !isLoading && searchResults.length === 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border overflow-hidden">
          <div className="px-4 py-3 text-sm text-gray-500 text-center">No dishes found matching "{searchQuery}"</div>
        </div>
      )}
    </div>
  )
}

