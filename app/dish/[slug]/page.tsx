import { getDishBySlug } from "@/lib/db"
import { DishDetail } from "@/components/dish-detail"
import { notFound } from "next/navigation"

export default async function DishPage({ params }: { params: { slug: string } }) {
  const { slug } = params

  // Fetch dish from Supabase
  const dish = await getDishBySlug(slug)

  if (!dish) {
    notFound()
  }

  return <DishDetail dish={dish} />
}

