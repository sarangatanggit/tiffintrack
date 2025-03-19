import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DishCard } from "@/components/dish-card"
import { getPopularDishes, getRecentDishes, getTrendingDishes } from "@/lib/db"
import { SearchBar } from "@/components/search-bar"
import { EnvChecker } from "@/components/env-checker"

export default async function Home() {
  // Fetch dishes from Supabase
  let popularDishes = []
  let recentDishes = []
  let trendingDishes = []

  try {
    // Wrap in try/catch to handle potential errors
    popularDishes = await getPopularDishes()
    recentDishes = await getRecentDishes()
    trendingDishes = await getTrendingDishes()
  } catch (error) {
    console.error("Error fetching dishes:", error)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6">
          <div className="flex items-center gap-2 font-semibold text-xl">
            <span className="text-primary">Tiffin</span>
            <span>Track</span>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-6 md:py-12">
          <div className="container px-4 md:px-6">
            <EnvChecker />

            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Discover nutritional insights for South Asian cuisine
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Get accurate macronutrient information tailored to your preparation methods
                </p>
              </div>
              <div className="w-full max-w-md relative">
                <SearchBar />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-6 md:py-12 lg:py-16">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="popular" className="w-full">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Explore Dishes</h2>
                <TabsList>
                  <TabsTrigger value="popular">Popular</TabsTrigger>
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                  <TabsTrigger value="trending">Trending</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="popular" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {popularDishes.length > 0 ? (
                    popularDishes.map((dish) => (
                      <Link href={`/dish/${dish.slug}`} key={dish.id}>
                        <DishCard dish={dish} />
                      </Link>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-10 text-gray-500">
                      No dishes found. Please check your database connection.
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="recent" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {recentDishes.length > 0 ? (
                    recentDishes.map((dish) => (
                      <Link href={`/dish/${dish.slug}`} key={dish.id}>
                        <DishCard dish={dish} />
                      </Link>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-10 text-gray-500">
                      No dishes found. Please check your database connection.
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="trending" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {trendingDishes.length > 0 ? (
                    trendingDishes.map((dish) => (
                      <Link href={`/dish/${dish.slug}`} key={dish.id}>
                        <DishCard dish={dish} />
                      </Link>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-10 text-gray-500">
                      No dishes found. Please check your database connection.
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <footer className="border-t bg-muted/50">
        <div className="container flex flex-col gap-4 py-10 md:h-24 md:flex-row md:items-center md:gap-6 md:py-0">
          <div className="flex flex-1 items-center gap-4 md:gap-6">
            <div className="font-semibold">Tiffin Track</div>
            <nav className="flex gap-4 sm:gap-6">
              <Link
                className="text-xs hover:underline underline-offset-4"
                href="https://buymeacoffee.com/sarangpatel"
                target="_blank"
                rel="noopener noreferrer"
              >
                About
              </Link>
              <Link className="text-xs hover:underline underline-offset-4" href="#">
                Privacy
              </Link>
              <Link className="text-xs hover:underline underline-offset-4" href="#">
                Terms
              </Link>
              <Link className="text-xs hover:underline underline-offset-4" href="#">
                Contact
              </Link>
            </nav>
          </div>
          <div className="md:ml-auto md:text-right">
            <p className="text-xs text-gray-500">© 2025 Tiffin Track. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

