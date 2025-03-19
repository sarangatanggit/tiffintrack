import { Star, StarHalf } from "lucide-react"

export function HealthinessRating({ rating }) {
  // Convert rating to nearest 0.5
  const roundedRating = Math.round(rating * 2) / 2

  // Determine color based on rating
  const getColor = (rating) => {
    if (rating >= 4.5) return "text-[#4D6447]" // Curry Leaf Green
    if (rating >= 3.5) return "text-[#8FB17A]" // Light Green
    if (rating >= 2.5) return "text-[#E2A72E]" // Deep Turmeric
    if (rating >= 1.5) return "text-[#E87E51]" // Tandoori Orange
    return "text-[#D64045]" // Chili Red
  }

  const color = getColor(roundedRating)

  // Create array of 5 stars
  const stars = []
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(roundedRating)) {
      // Full star
      stars.push(<Star key={i} className={`h-5 w-5 ${color} fill-current`} />)
    } else if (i === Math.ceil(roundedRating) && !Number.isInteger(roundedRating)) {
      // Half star
      stars.push(<StarHalf key={i} className={`h-5 w-5 ${color} fill-current`} />)
    } else {
      // Empty star
      stars.push(<Star key={i} className="h-5 w-5 text-gray-300" />)
    }
  }

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-1">{stars}</div>
      <div className="text-xs text-gray-500">
        {roundedRating >= 4.5
          ? "Excellent choice! Very healthy preparation."
          : roundedRating >= 3.5
            ? "Good choice! Healthy preparation."
            : roundedRating >= 2.5
              ? "Moderate healthiness. Balanced preparation."
              : roundedRating >= 1.5
                ? "Less healthy option. Consider adjustments."
                : "Indulgent option. Enjoy occasionally."}
      </div>
    </div>
  )
}

