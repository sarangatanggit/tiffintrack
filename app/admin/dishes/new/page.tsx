import { getAllTags } from "@/app/actions"
import { DishForm } from "@/components/admin/dish-form"

export default async function NewDishPage() {
  const tags = await getAllTags()

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Add New Dish</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <DishForm tags={tags} />
      </div>
    </div>
  )
}

