import { Skeleton } from "@/components/ui/skeleton"

export default function DishLoading() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container flex h-14 items-center px-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-5 w-[60px]" />
          </div>
          <div className="ml-auto flex items-center gap-1">
            <div className="flex items-center gap-1 font-semibold">
              <span className="text-primary">Tiffin</span>
              <span>Track</span>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container px-4 py-4">
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
            {/* Left column - Dish info and nutrition */}
            <div className="space-y-4 lg:col-span-5">
              <div className="flex gap-6">
                <div className="relative w-1/2 aspect-square overflow-hidden rounded-lg bg-muted">
                  <Skeleton className="h-full w-full" />
                </div>
                <div className="w-1/2 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      <Skeleton className="h-5 w-[60px]" />
                      <Skeleton className="h-5 w-[70px]" />
                      <Skeleton className="h-5 w-[80px]" />
                    </div>
                    <Skeleton className="h-8 w-full mb-2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4 mt-1" />
                  </div>
                </div>
              </div>

              {/* Healthiness Rating */}
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Skeleton className="h-5 w-[120px] mb-1" />
                    <Skeleton className="h-4 w-[180px]" />
                  </div>
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
                <div className="mt-2">
                  <div className="flex items-center gap-1">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Skeleton key={i} className="h-5 w-5 rounded-full" />
                      ))}
                  </div>
                  <Skeleton className="h-4 w-full mt-1" />
                </div>
              </div>

              {/* Nutritional Information */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Skeleton className="h-5 w-[150px]" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-[60px]" />
                    <Skeleton className="h-7 w-[70px]" />
                  </div>
                </div>

                <div className="rounded-lg border overflow-hidden">
                  <div className="border-b">
                    <div className="flex">
                      {Array(3)
                        .fill(0)
                        .map((_, i) => (
                          <Skeleton key={i} className="h-10 flex-1 mx-1" />
                        ))}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-4">
                      {Array(4)
                        .fill(0)
                        .map((_, i) => (
                          <div key={i} className="space-y-1">
                            <Skeleton className="h-4 w-[60px]" />
                            <Skeleton className="h-6 w-[50px]" />
                            <Skeleton className="h-4 w-[80px]" />
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - Preparation Controls */}
            <div className="space-y-4 lg:col-span-7">
              <div className="rounded-lg border p-4">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <Skeleton className="h-5 w-[150px]" />
                    <Skeleton className="h-4 w-[250px]" />
                  </div>

                  {/* Serving Size */}
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-[100px]" />
                    <div className="flex space-x-4">
                      {Array(4)
                        .fill(0)
                        .map((_, i) => (
                          <Skeleton key={i} className="h-6 w-[50px]" />
                        ))}
                    </div>
                  </div>

                  {/* Oil Type */}
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-[80px]" />
                    <div className="grid grid-cols-3 gap-2">
                      {Array(3)
                        .fill(0)
                        .map((_, i) => (
                          <Skeleton key={i} className="h-24 w-full rounded-md" />
                        ))}
                    </div>
                  </div>

                  {/* Oil Amount */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-5 w-[100px]" />
                      <Skeleton className="h-4 w-[60px]" />
                    </div>
                    <Skeleton className="h-5 w-full" />
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-[40px]" />
                      <Skeleton className="h-4 w-[40px]" />
                      <Skeleton className="h-4 w-[40px]" />
                    </div>
                  </div>

                  {/* Cooking Method */}
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-[120px]" />
                    <div className="grid grid-cols-5 gap-2">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Skeleton key={i} className="h-16 w-full rounded-md" />
                        ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <Skeleton className="h-6 w-[150px] mb-3" />
                <div className="space-y-3">
                  {Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Skeleton className="h-6 w-6 rounded-full shrink-0" />
                        <div className="w-full">
                          <Skeleton className="h-4 w-[100px] mb-1" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-5/6" />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <Skeleton className="h-8 w-[150px]" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="rounded-lg border">
                    <Skeleton className="aspect-square w-full" />
                    <div className="p-3">
                      <Skeleton className="h-5 w-3/4 mb-1" />
                      <Skeleton className="h-4 w-1/2 mb-2" />
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-[40px]" />
                        <Skeleton className="h-4 w-[60px]" />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t bg-muted/50 mt-6">
        <div className="container flex flex-col gap-4 py-6 md:h-16 md:flex-row md:items-center md:gap-6 md:py-0">
          <div className="flex flex-1 items-center gap-4 md:gap-6">
            <Skeleton className="h-5 w-[100px]" />
            <div className="flex gap-4 sm:gap-6">
              <Skeleton className="h-4 w-[40px]" />
              <Skeleton className="h-4 w-[40px]" />
              <Skeleton className="h-4 w-[40px]" />
              <Skeleton className="h-4 w-[40px]" />
            </div>
          </div>
          <div className="md:ml-auto md:text-right">
            <Skeleton className="h-4 w-[200px] ml-auto" />
          </div>
        </div>
      </footer>
    </div>
  )
}

