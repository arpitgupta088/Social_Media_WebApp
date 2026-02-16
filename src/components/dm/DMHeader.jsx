"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function DMHeader({ username }) {
  const router = useRouter()

  return (
    <div
      className="
        sticky
        top-0
        z-50
        flex
        items-center
        gap-3
        px-3
        py-2
        border-b
        bg-background/95
        backdrop-blur
      "
    >
      {/* BACK */}
      <button
        onClick={() => router.back()}
        className="p-1 rounded-full hover:bg-muted transition"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>

      {/* AVATAR */}
      <div className="h-9 w-9 shrink-0 rounded-full bg-muted flex items-center justify-center font-semibold text-sm">
        {username?.[0]?.toUpperCase()}
      </div>

      {/* NAME */}
      <div className="flex flex-col leading-tight">
        <span className="text-sm font-semibold">
          {username}
        </span>
        <span className="text-[11px] text-muted-foreground">
          Active now
        </span>
      </div>
    </div>
  )
}
