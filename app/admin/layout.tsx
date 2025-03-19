import type React from "react"
import Link from "next/link"
import { Home, UtensilsCrossed } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold text-xl">
            <span className="text-primary">Tiffin</span>
            <span>Track</span>
            <span className="text-sm font-normal text-gray-500">Admin</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
              <Home className="h-4 w-4" />
              <span>Front End</span>
            </Link>
          </nav>
        </div>
      </header>

      <div className="flex">
        <aside className="w-64 bg-white border-r min-h-[calc(100vh-4rem)] p-4">
          <nav className="space-y-1">
            <Link
              href="/admin"
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700"
            >
              <UtensilsCrossed className="h-4 w-4" />
              <span>Dishes</span>
            </Link>
          </nav>
        </aside>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}

