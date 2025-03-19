import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
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
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <Skeleton className="h-10 w-[250px] mx-auto" />
                <Skeleton className="h-4 w-[300px] mx-auto" />
                <Skeleton className="h-4 w-[280px] mx-auto" />
              </div>
              <div className="w-full max-w-md relative">
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-6 md:py-12 lg:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex items-center justify-between mb-6">
              <Skeleton className="h-8 w-[180px]" />
              <Skeleton className="h-10 w-[200px]" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {Array(8)
                .fill(0)
                .map((_, i) => (
                  <DishCardSkeleton key={i} />
                ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-muted/50">
        <div className="container flex flex-col gap-4 py-10 md:h-24 md:flex-row md:items-center md:gap-6 md:py-0">
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

function DishCardSkeleton() {
  return (
    <div className="group relative overflow-hidden rounded-lg border">
      <div className="aspect-video overflow-hidden">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="p-4">
        <Skeleton className="h-5 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-3" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-4 w-[40px]" />
          <Skeleton className="h-4 w-[60px]" />
          <Skeleton className="h-4 w-[50px]" />
        </div>
      </div>
    </div>
  )
}

