"use client"

import { useEffect, useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export function EnvChecker() {
  const [missingVars, setMissingVars] = useState<string[]>([])

  useEffect(() => {
    const requiredVars = ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"]

    const missing = requiredVars.filter((varName) => {
      // Check if the variable is defined and not empty
      return !process.env[varName] || process.env[varName] === ""
    })

    setMissingVars(missing)
    
    // For debugging only - remove in production
    console.log("Environment variables check:", {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? "Defined" : "Missing",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Defined" : "Missing",
    })
  }, [])

  if (missingVars.length === 0) return null

  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Missing Environment Variables</AlertTitle>
      <AlertDescription>
        The following environment variables are missing:
        <ul className="list-disc pl-5 mt-2">
          {missingVars.map((varName) => (
            <li key={varName}>{varName}</li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  )
}
