import type React from "react"
import { cn } from "@/lib/utils"

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg"
}

export function Spinner({ className, size = "md", ...props }: SpinnerProps) {
  return (
    <div className={cn("flex items-center justify-center", className)} {...props}>
      <div
        className={cn(
          "border-t-transparent animate-spin rounded-full border",
          {
            "h-4 w-4 border-2": size === "sm",
            "h-8 w-8 border-4": size === "md",
            "h-12 w-12 border-4": size === "lg",
          },
          "border-primary",
        )}
      />
    </div>
  )
}

