import Link from "next/link"
import { getAllDishes } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { DishesTable } from "@/components/admin/dishes-table"

export default async function AdminPage() {
  const dishes = await getAllDishes()

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Link href="/admin/dishes/new">
          <Button>Add New Dish</Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Manage Dishes</h2>
        <DishesTable dishes={dishes} />
      </div>
    </div>
  )
}

