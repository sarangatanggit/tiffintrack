"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Upload, X } from "lucide-react"
import { createDish, updateDish } from "@/app/actions"
import { uploadImage } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

export function DishForm({ dish = null, tags = [] }) {
  const router = useRouter()
  const fileInputRef = useRef(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imageUrl, setImageUrl] = useState(dish?.image_url || "")
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(dish?.image_url || "")
  const [selectedTags, setSelectedTags] = useState(dish?.tags || [])
  const [newTag, setNewTag] = useState("")

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const handleAddTag = () => {
    if (!newTag.trim()) return

    if (!selectedTags.includes(newTag.trim())) {
      setSelectedTags([...selectedTags, newTag.trim()])
    }

    setNewTag("")
  }

  const handleRemoveTag = (tag) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag))
  }

  const handleSelectTag = (tagName) => {
    if (!selectedTags.includes(tagName)) {
      setSelectedTags([...selectedTags, tagName])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Upload image if a new one was selected
      let finalImageUrl = imageUrl
      if (imageFile) {
        finalImageUrl = await uploadImage(imageFile)
      }

      const formData = new FormData(e.target)
      formData.set("imageUrl", finalImageUrl)
      formData.set("tags", selectedTags.join(","))

      let result
      if (dish) {
        // Update existing dish
        result = await updateDish(dish.id, formData)
      } else {
        // Create new dish
        result = await createDish(formData)
      }

      if (result.success) {
        router.push("/admin")
        router.refresh()
      } else {
        console.error("Form submission error:", result.error)
        alert(`Error: ${result.error}`)
      }
    } catch (error) {
      console.error("Form submission error:", error)
      alert(`Error: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Dish Name</Label>
            <Input id="name" name="name" defaultValue={dish?.name || ""} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="region">Region</Label>
            <Input id="region" name="region" defaultValue={dish?.region || ""} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" rows={4} defaultValue={dish?.description || ""} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="calories">Calories</Label>
              <Input id="calories" name="calories" type="number" defaultValue={dish?.calories || "0"} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="protein">Protein (g)</Label>
              <Input
                id="protein"
                name="protein"
                type="number"
                step="0.1"
                defaultValue={dish?.protein || "0"}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="carbs">Carbs (g)</Label>
              <Input id="carbs" name="carbs" type="number" step="0.1" defaultValue={dish?.carbs || "0"} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fat">Fat (g)</Label>
              <Input id="fat" name="fat" type="number" step="0.1" defaultValue={dish?.fat || "0"} required />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Dish Image</Label>
            <div className="border rounded-md p-4 space-y-4">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      setImagePreview("")
                      setImageFile(null)
                      setImageUrl("")
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div
                  className="border-2 border-dashed rounded-md h-48 flex items-center justify-center cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="text-center">
                    <Upload className="h-8 w-8 mx-auto text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">Click to upload an image</p>
                  </div>
                </div>
              )}

              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />

              <Button type="button" variant="outline" className="w-full" onClick={() => fileInputRef.current?.click()}>
                {imagePreview ? "Change Image" : "Upload Image"}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedTags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Add a tag..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddTag()
                  }
                }}
              />
              <Button type="button" onClick={handleAddTag}>
                Add
              </Button>
            </div>

            <div className="mt-2">
              <Label className="text-sm">Existing Tags</Label>
              <div className="flex flex-wrap gap-1 mt-1">
                {tags
                  .filter((tag) => !selectedTags.includes(tag.name))
                  .map((tag) => (
                    <Badge
                      key={tag.id}
                      variant="outline"
                      className="cursor-pointer hover:bg-secondary"
                      onClick={() => handleSelectTag(tag.name)}
                    >
                      {tag.name}
                    </Badge>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.push("/admin")} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : dish ? "Update Dish" : "Create Dish"}
        </Button>
      </div>
    </form>
  )
}

