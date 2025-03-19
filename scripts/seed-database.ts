// This is a script to seed the database with initial data
// You can run this script using:
// npx tsx scripts/seed-database.ts

import { createClient } from "@supabase/supabase-js"
import { mockDishes } from "../data/mock-dishes"

async function seedDatabase() {
  // Initialize Supabase client
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase environment variables")
    return
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  console.log("Seeding database...")

  // Insert tags
  const allTags = new Set<string>()
  mockDishes.forEach((dish) => {
    dish.tags.forEach((tag) => allTags.add(tag))
  })

  const tagsList = Array.from(allTags)
  console.log(`Inserting ${tagsList.length} tags...`)

  const { data: tagsData, error: tagsError } = await supabase
    .from("tags")
    .upsert(tagsList.map((name) => ({ name })))
    .select()

  if (tagsError) {
    console.error("Error inserting tags:", tagsError)
    return
  }

  console.log(`Inserted ${tagsData.length} tags`)

  // Create a map of tag names to IDs
  const tagMap = new Map<string, string>()
  tagsData.forEach((tag) => {
    tagMap.set(tag.name, tag.id)
  })

  // Insert dishes
  console.log(`Inserting ${mockDishes.length} dishes...`)

  for (const dish of mockDishes) {
    // Create a slug from the dish name
    const slug = dish.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")

    // Insert the dish
    const { data: dishData, error: dishError } = await supabase
      .from("dishes")
      .upsert({
        slug,
        name: dish.name,
        region: dish.region,
        description: dish.description || `A delicious ${dish.name} from ${dish.region} cuisine.`,
        image_url: dish.image,
        calories: dish.calories,
        protein: dish.protein,
        carbs: dish.carbs,
        fat: dish.fat,
      })
      .select()

    if (dishError) {
      console.error(`Error inserting dish ${dish.name}:`, dishError)
      continue
    }

    if (!dishData || dishData.length === 0) {
      console.error(`No data returned when inserting dish ${dish.name}`)
      continue
    }

    const dishId = dishData[0].id

    // Insert dish tags
    const dishTags = dish.tags.map((tag) => ({
      dish_id: dishId,
      tag_id: tagMap.get(tag),
    }))

    const { error: dishTagsError } = await supabase.from("dish_tags").upsert(dishTags)

    if (dishTagsError) {
      console.error(`Error inserting tags for dish ${dish.name}:`, dishTagsError)
    }
  }

  console.log("Database seeding completed")
}

seedDatabase().catch(console.error)

