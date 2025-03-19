"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getSimilarDishes } from "@/lib/db"
import type { Dish } from "@/lib/db"
import { Skeleton } from "@/components/ui/skeleton"

export function DishRecommendations({ dishId }: { dishId: string }) {
  const [recommendations, setRecommendations] = useState<Dish[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchRecommendations() {
      setIsLoading(true)
      try {
        const similarDishes = await getSimilarDishes(dishId)
        setRecommendations(similarDishes)
      } catch (error) {
        console.error("Error fetching dish recommendations:", error)
        setRecommendations([])
      } finally {
        setIsLoading(false)
      }
    }

    if (dishId) {
      fetchRecommendations()
    }
  }, [dishId])

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="rounded-lg border">
            <Skeleton className="aspect-square w-full" />
            <div className="p-3 space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex items-center gap-2 pt-1">
                <Skeleton className="h-4 w-[40px]" />
                <Skeleton className="h-4 w-[60px]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (recommendations.length === 0) {
    return <div className="text-center py-8 text-gray-500">No similar dishes found</div>
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {recommendations.map((dish) => (
        <Link href={`/dish/${dish.slug}`} key={dish.id}>
          <div className="group relative overflow-hidden rounded-lg border">
            <div className="aspect-square overflow-hidden">
              <img
                src={dish.image_url || "/placeholder.svg?height=200&width=200"}
                alt={dish.name}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-sm">{dish.name}</h3>
              <p className="text-xs text-gray-500">{dish.region}</p>
              <div className="mt-1 flex items-center gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <span className="font-medium">{dish.calories}</span>
                  <span className="text-xs text-gray-500">cal</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-medium">{dish.protein}g</span>
                  <span className="text-xs text-gray-500">protein</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

