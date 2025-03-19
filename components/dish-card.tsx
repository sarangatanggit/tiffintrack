import type { Dish } from "@/lib/db"

export function DishCard({ dish }: { dish: Dish }) {
  return (
    <div className="group relative overflow-hidden rounded-lg border">
      <div className="aspect-video overflow-hidden">
        <img
          src={dish.image_url || "/placeholder.svg?height=200&width=300"}
          alt={dish.name}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold">{dish.name}</h3>
        <p className="text-sm text-gray-500">{dish.region}</p>
        <div className="mt-2 flex items-center gap-3 text-sm">
          <div className="flex items-center gap-1">
            <span className="font-medium">{dish.calories}</span>
            <span className="text-xs text-gray-500">cal</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium">{dish.protein}g</span>
            <span className="text-xs text-gray-500">protein</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium">{dish.carbs}g</span>
            <span className="text-xs text-gray-500">carbs</span>
          </div>
        </div>
      </div>
    </div>
  )
}

