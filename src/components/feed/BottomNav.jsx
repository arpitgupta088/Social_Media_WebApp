"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Search,
  PlusSquare,
  User
} from "lucide-react"

export default function BottomNav() {
  const pathname = usePathname()

  const item = (href, Icon) => {
    const active = pathname === href

    return (
      <Link href={href}>
        <Icon
          className={`h-6 w-6 transition ${
            active
              ? "text-primary"
              : "text-muted-foreground"
          }`}
        />
      </Link>
    )
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background">
      <div className="flex justify-around py-3">
        {item("/feed", Home)}
        {item("/search", Search)}
        {item("/create", PlusSquare)}
        {item("/profile", User)}
      </div>
    </div>
  )
}
