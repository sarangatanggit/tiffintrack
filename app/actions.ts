"use server"

import { revalidatePath } from "next/cache"
import { createServerSupabaseClient } from "@/lib/supabase"
import { searchDishes as searchDishesDb } from "@/lib/db"

export async function searchDishes(query: string) {
  if (!query || query.trim() === "") {
    return []
  }

  return searchDishesDb(query)
}

export async function createDish(formData: FormData) {
  const supabase = createServerSupabaseClient()

  const name = formData.get("name") as string
  const region = formData.get("region") as string
  const description = formData.get("description") as string
  const imageUrl = formData.get("imageUrl") as string
  const calories = Number.parseInt(formData.get("calories") as string)
  const protein = Number.parseFloat(formData.get("protein") as string)
  const carbs = Number.parseFloat(formData.get("carbs") as string)
  const fat = Number.parseFloat(formData.get("fat") as string)
  const tags = (formData.get("tags") as string).split(",").map((tag) => tag.trim())

  // Create a slug from the name
  const slug = name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")

  try {
    // Insert the dish
    const { data: dish, error: dishError } = await supabase
      .from("dishes")
      .insert({
        slug,
        name,
        region,
        description,
        image_url: imageUrl,
        calories,
        protein,
        carbs,
        fat,
      })
      .select()
      .single()

    if (dishError) {
      throw new Error(`Error creating dish: ${dishError.message}`)
    }

    // Insert tags if they don't exist
    for (const tagName of tags) {
      if (!tagName) continue

      // Upsert the tag
      const { data: tag, error: tagError } = await supabase.from("tags").upsert({ name: tagName }).select().single()

      if (tagError) {
        console.error(`Error upserting tag ${tagName}:`, tagError)
        continue
      }

      // Create the dish-tag relationship
      const { error: relationError } = await supabase.from("dish_tags").insert({
        dish_id: dish.id,
        tag_id: tag.id,
      })

      if (relationError) {
        console.error(`Error creating dish-tag relationship:`, relationError)
      }
    }

    revalidatePath("/")
    revalidatePath("/admin")
    revalidatePath(`/dish/${slug}`)

    return { success: true, dish }
  } catch (error) {
    console.error("Error creating dish:", error)
    return { success: false, error: (error as Error).message }
  }
}

export async function updateDish(dishId: string, formData: FormData) {
  const supabase = createServerSupabaseClient()

  const name = formData.get("name") as string
  const region = formData.get("region") as string
  const description = formData.get("description") as string
  const imageUrl = formData.get("imageUrl") as string
  const calories = Number.parseInt(formData.get("calories") as string)
  const protein = Number.parseFloat(formData.get("protein") as string)
  const carbs = Number.parseFloat(formData.get("carbs") as string)
  const fat = Number.parseFloat(formData.get("fat") as string)
  const tags = (formData.get("tags") as string).split(",").map((tag) => tag.trim())

  // Create a slug from the name
  const slug = name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")

  try {
    // Update the dish
    const { data: dish, error: dishError } = await supabase
      .from("dishes")
      .update({
        slug,
        name,
        region,
        description,
        image_url: imageUrl,
        calories,
        protein,
        carbs,
        fat,
      })
      .eq("id", dishId)
      .select()
      .single()

    if (dishError) {
      throw new Error(`Error updating dish: ${dishError.message}`)
    }

    // Delete existing dish-tag relationships
    const { error: deleteError } = await supabase.from("dish_tags").delete().eq("dish_id", dishId)

    if (deleteError) {
      console.error("Error deleting existing dish-tag relationships:", deleteError)
    }

    // Insert tags if they don't exist and create new relationships
    for (const tagName of tags) {
      if (!tagName) continue

      // Upsert the tag
      const { data: tag, error: tagError } = await supabase.from("tags").upsert({ name: tagName }).select().single()

      if (tagError) {
        console.error(`Error upserting tag ${tagName}:`, tagError)
        continue
      }

      // Create the dish-tag relationship
      const { error: relationError } = await supabase.from("dish_tags").insert({
        dish_id: dish.id,
        tag_id: tag.id,
      })

      if (relationError) {
        console.error(`Error creating dish-tag relationship:`, relationError)
      }
    }

    revalidatePath("/")
    revalidatePath("/admin")
    revalidatePath(`/dish/${slug}`)

    return { success: true, dish }
  } catch (error) {
    console.error("Error updating dish:", error)
    return { success: false, error: (error as Error).message }
  }
}

export async function deleteDish(dishId: string) {
  const supabase = createServerSupabaseClient()

  try {
    // Get the dish first to get the slug for path revalidation
    const { data: dish, error: getError } = await supabase.from("dishes").select("slug").eq("id", dishId).single()

    if (getError) {
      throw new Error(`Error getting dish: ${getError.message}`)
    }

    // Delete the dish (this will cascade delete the dish_tags relationships)
    const { error: deleteError } = await supabase.from("dishes").delete().eq("id", dishId)

    if (deleteError) {
      throw new Error(`Error deleting dish: ${deleteError.message}`)
    }

    revalidatePath("/")
    revalidatePath("/admin")
    if (dish?.slug) {
      revalidatePath(`/dish/${dish.slug}`)
    }

    return { success: true }
  } catch (error) {
    console.error("Error deleting dish:", error)
    return { success: false, error: (error as Error).message }
  }
}

export async function getAllTags() {
  const supabase = createServerSupabaseClient()

  const { data: tags, error } = await supabase.from("tags").select("*").order("name")

  if (error) {
    console.error("Error fetching tags:", error)
    return []
  }

  return tags
}

export async function getDishTags(dishId: string) {
  const supabase = createServerSupabaseClient()

  const { data: dishTags, error } = await supabase.from("dish_tags").select("tags(id, name)").eq("dish_id", dishId)

  if (error) {
    console.error("Error fetching dish tags:", error)
    return []
  }

  return dishTags.map((dt) => dt.tags)
}

export async function getAllDishes() {
  const supabase = createServerSupabaseClient()

  const { data: dishes, error } = await supabase.from("dishes").select("*").order("name")

  if (error) {
    console.error("Error fetching all dishes:", error)
    return []
  }

  return dishes
}

export async function getDishById(id: string) {
  const supabase = createServerSupabaseClient()

  try {
    // Fetch the dish with its tags in a single query
    const { data, error } = await supabase
      .from("dishes")
      .select(`
        *,
        dish_tags:dish_tags(
          tags:tags(name)
        )
      `)
      .eq("id", id)
      .single()

    if (error) {
      console.error("Error fetching dish by ID:", error)
      return null
    }

    // Process the joined data to format it correctly
    const tags = data.dish_tags ? data.dish_tags.filter((dt) => dt.tags).map((dt) => dt.tags.name) : []

    // Remove the dish_tags property and add the tags array
    const { dish_tags, ...dishData } = data
    return { ...dishData, tags }
  } catch (error) {
    console.error("Error in getDishById:", error)
    return null
  }
}

