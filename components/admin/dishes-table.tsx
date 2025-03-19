"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Pencil, Trash2, Search } from "lucide-react"
import { deleteDish } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function DishesTable({ dishes }) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [dishToDelete, setDishToDelete] = useState(null)

  const filteredDishes = dishes.filter(
    (dish) =>
      dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.region.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDelete = async () => {
    if (!dishToDelete) return

    setIsDeleting(true)
    try {
      const result = await deleteDish(dishToDelete.id)
      if (result.success) {
        // Refresh the page to show updated data
        router.refresh()
      } else {
        console.error("Failed to delete dish:", result.error)
        alert(`Failed to delete dish: ${result.error}`)
      }
    } catch (error) {
      console.error("Error deleting dish:", error)
      alert(`Error deleting dish: ${error.message}`)
    } finally {
      setIsDeleting(false)
      setDishToDelete(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          className="pl-8"
          placeholder="Search dishes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Calories</TableHead>
              <TableHead>Protein</TableHead>
              <TableHead>Carbs</TableHead>
              <TableHead>Fat</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDishes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                  No dishes found
                </TableCell>
              </TableRow>
            ) : (
              filteredDishes.map((dish) => (
                <TableRow key={dish.id}>
                  <TableCell className="font-medium">{dish.name}</TableCell>
                  <TableCell>{dish.region}</TableCell>
                  <TableCell>{dish.calories}</TableCell>
                  <TableCell>{dish.protein}</TableCell>
                  <TableCell>{dish.carbs}</TableCell>
                  <TableCell>{dish.fat}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/dishes/${dish.id}`}>
                        <Button variant="outline" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="destructive" size="icon" onClick={() => setDishToDelete(dish)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!dishToDelete} onOpenChange={(open) => !open && setDishToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the dish "{dishToDelete?.name}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

