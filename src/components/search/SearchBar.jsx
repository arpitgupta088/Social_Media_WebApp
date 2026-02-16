"use client"

import { Button } from "@hyprr/components/ui/button"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SearchBar() {
  const router = useRouter()

  return (
    <div className="flex gap-2 max-w-xl">
      <button
        onClick={() => router.push("/search")}
        className="
          flex
          flex-1
          items-center
          gap-3
          rounded-md
          border
          bg-background
          px-3
          py-2
          text-sm
          text-muted-foreground
          transition
          hover:bg-muted
          active:scale-95
        "
      >
        <Search className="h-4 w-4" />
        <span>Search creators, brands, campaigns...</span>
      </button>

      <Button
        size="sm"
        onClick={() => router.push("/search")}
        className="shrink-0"
      >
        <Search className="h-4 w-4" />
      </Button>
    </div>
  )
}
