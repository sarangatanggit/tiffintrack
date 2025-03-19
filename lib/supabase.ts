import { createClient } from "@supabase/supabase-js"

// Add this function at the top of the file
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Create a single supabase client for server-side usage
export const createServerSupabaseClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL
  // Try to use service role key first, fall back to anon key if not available
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase environment variables")
  }

  const client = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      fetch: async (url, options) => {
        // Implement a simple retry mechanism with exponential backoff
        let retries = 0
        const maxRetries = 3

        while (retries < maxRetries) {
          try {
            const response = await fetch(url, options)

            // If we get a 429 Too Many Requests, retry after a delay
            if (response.status === 429) {
              const retryAfter = response.headers.get("Retry-After") || Math.pow(2, retries) * 1000
              console.warn(`Rate limited. Retrying after ${retryAfter}ms. Retry ${retries + 1}/${maxRetries}`)
              await sleep(Number(retryAfter))
              retries++
              continue
            }

            return response
          } catch (error) {
            console.error(`Fetch error (retry ${retries + 1}/${maxRetries}):`, error)
            if (retries === maxRetries - 1) throw error
            await sleep(Math.pow(2, retries) * 1000)
            retries++
          }
        }
      },
    },
  })

  return client
}

// Create a singleton client for client-side usage
let clientSideSupabaseClient: ReturnType<typeof createClient> | null = null

export const createClientSupabaseClient = () => {
  if (clientSideSupabaseClient) return clientSideSupabaseClient

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables")
  }

  clientSideSupabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  return clientSideSupabaseClient
}

// Helper function to upload an image to Supabase Storage
export const uploadImage = async (file: File, bucket = "dish-images") => {
  const supabase = createClientSupabaseClient()

  // Create a unique file name
  const fileExt = file.name.split(".").pop()
  const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`
  const filePath = `${fileName}`

  // Upload the file
  const { data, error } = await supabase.storage.from(bucket).upload(filePath, file, {
    cacheControl: "3600",
    upsert: false,
  })

  if (error) {
    throw new Error(`Error uploading image: ${error.message}`)
  }

  // Get the public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(filePath)

  return publicUrl
}
