import { getDishById, getAllTags } from "@/app/actions"
import { DishForm } from "@/components/admin/dish-form"
import { notFound } from "next/navigation"

export default async function EditDishPage({ params }: { params: { id: string } }) {
  const { id } = params

  const [dish, tags] = await Promise.all([getDishById(id), getAllTags()])

  if (!dish) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Dish: {dish.name}</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <DishForm dish={dish} tags={tags} />
      </div>
    </div>
  )
}

