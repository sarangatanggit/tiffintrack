import { createServerSupabaseClient } from "./supabase"

export type Dish = {
  id: string
  slug: string
  name: string
  region: string
  description: string | null
  image_url: string | null
  calories: number
  protein: number
  carbs: number
  fat: number
  tags: string[]
}

// Replace the getDishes function with this optimized version
export async function getDishes(): Promise<Dish[]> {
  const supabase = createServerSupabaseClient()

  try {
    // Fetch dishes with their tags in a single query using Postgres join
    const { data, error } = await supabase.from("dishes").select(`
        *,
        dish_tags:dish_tags(
          tags:tags(name)
        )
      `)

    if (error) {
      console.error("Error fetching dishes:", error)
      return []
    }

    // Process the joined data to format it correctly
    return data.map((dish) => {
      const tags = dish.dish_tags
        ? dish.dish_tags
            .filter((dt) => dt.tags) // Filter out any null tags
            .map((dt) => dt.tags.name)
        : []

      // Remove the dish_tags property and add the tags array
      const { dish_tags, ...dishData } = dish
      return { ...dishData, tags }
    })
  } catch (error) {
    console.error("Error in getDishes:", error)
    return []
  }
}

// Replace the getPopularDishes function with this optimized version
export async function getPopularDishes(): Promise<Dish[]> {
  try {
    const dishes = await getDishes()
    // In a real app, you might have a view count or popularity metric
    // For now, just return the first 4 dishes
    return dishes.slice(0, 4)
  } catch (error) {
    console.error("Error in getPopularDishes:", error)
    return []
  }
}

// Replace the getRecentDishes function with this optimized version
export async function getRecentDishes(): Promise<Dish[]> {
  const supabase = createServerSupabaseClient()

  try {
    // Fetch recent dishes with their tags in a single query
    const { data, error } = await supabase
      .from("dishes")
      .select(`
        *,
        dish_tags:dish_tags(
          tags:tags(name)
        )
      `)
      .order("created_at", { ascending: false })
      .limit(4)

    if (error) {
      console.error("Error fetching recent dishes:", error)
      return []
    }

    // Process the joined data to format it correctly
    return data.map((dish) => {
      const tags = dish.dish_tags ? dish.dish_tags.filter((dt) => dt.tags).map((dt) => dt.tags.name) : []

      // Remove the dish_tags property and add the tags array
      const { dish_tags, ...dishData } = dish
      return { ...dishData, tags }
    })
  } catch (error) {
    console.error("Error in getRecentDishes:", error)
    return []
  }
}

// Replace the getTrendingDishes function with this optimized version
export async function getTrendingDishes(): Promise<Dish[]> {
  try {
    // In a real app, you might have a trending algorithm
    // For now, just return some dishes
    const dishes = await getDishes()
    return dishes.slice(4, 8)
  } catch (error) {
    console.error("Error in getTrendingDishes:", error)
    return []
  }
}

// Replace the getDishBySlug function with this optimized version
export async function getDishBySlug(slug: string): Promise<Dish | null> {
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
      .eq("slug", slug)
      .single()

    if (error) {
      console.error("Error fetching dish by slug:", error)
      return null
    }

    // Process the joined data to format it correctly
    const tags = data.dish_tags ? data.dish_tags.filter((dt) => dt.tags).map((dt) => dt.tags.name) : []

    // Remove the dish_tags property and add the tags array
    const { dish_tags, ...dishData } = data
    return { ...dishData, tags }
  } catch (error) {
    console.error("Error in getDishBySlug:", error)
    return null
  }
}

// Replace the searchDishes function with this optimized version
export async function searchDishes(query: string): Promise<Dish[]> {
  const supabase = createServerSupabaseClient()

  try {
    // Search dishes by name, region, or description with their tags in a single query
    const { data, error } = await supabase
      .from("dishes")
      .select(`
        *,
        dish_tags:dish_tags(
          tags:tags(name)
        )
      `)
      .or(`name.ilike.%${query}%,region.ilike.%${query}%,description.ilike.%${query}%`)
      .limit(8)

    if (error) {
      console.error("Error searching dishes:", error)
      return []
    }

    // Process the joined data to format it correctly
    return data.map((dish) => {
      const tags = dish.dish_tags ? dish.dish_tags.filter((dt) => dt.tags).map((dt) => dt.tags.name) : []

      // Remove the dish_tags property and add the tags array
      const { dish_tags, ...dishData } = dish
      return { ...dishData, tags }
    })
  } catch (error) {
    console.error("Error in searchDishes:", error)
    return []
  }
}

// Replace the getSimilarDishes function with this optimized version
export async function getSimilarDishes(dishId: string, limit = 4): Promise<Dish[]> {
  const supabase = createServerSupabaseClient()

  try {
    // First, get the current dish to find its region
    const { data: currentDish, error: dishError } = await supabase
      .from("dishes")
      .select("region")
      .eq("id", dishId)
      .single()

    if (dishError) {
      console.error("Error fetching current dish:", dishError)
      return []
    }

    // Find dishes with the same region, excluding the current dish
    const { data, error } = await supabase
      .from("dishes")
      .select(`
        *,
        dish_tags:dish_tags(
          tags:tags(name)
        )
      `)
      .neq("id", dishId)
      .eq("region", currentDish.region)
      .limit(limit)

    if (error) {
      console.error("Error fetching similar dishes:", error)
      return []
    }

    // Process the joined data to format it correctly
    return data.map((dish) => {
      const tags = dish.dish_tags ? dish.dish_tags.filter((dt) => dt.tags).map((dt) => dt.tags.name) : []

      // Remove the dish_tags property and add the tags array
      const { dish_tags, ...dishData } = dish
      return { ...dishData, tags }
    })
  } catch (error) {
    console.error("Error in getSimilarDishes:", error)
    return []
  }
}

