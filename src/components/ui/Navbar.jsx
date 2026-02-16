"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Moon, Sun, Heart, MessageCircle } from "lucide-react"
import { useTheme } from "@hyprr/lib/theme-context"
import { useEffect, useState } from "react"
import { getUnreadCount } from "@/services/notification.service"


export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()

  const [unread, setUnread] = useState(0)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    const count = await getUnreadCount()
    setUnread(count)
  }


  const logout = () => {
    document.cookie = "hyprr-auth=; path=/; max-age=0"
    router.push("/login")
  }

  return (
    <header className="sticky top-[-20px] z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="flex h-10 items-center justify-between px-6">

        {/* LEFT */}
        <h1 className="text-3xl font-bold tracking-tight">
          HYPRR
        </h1>

        {/* RIGHT GROUP */}
        <div className="flex items-center gap-4">

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="
              p-2 rounded-full
              hover:bg-muted
              transition-all
              active:scale-90
            "
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          {/* Notifications */}
          <Link href="/notifications" className="relative">
            <Heart className="h-6 w-6 hover:text-primary transition" />

            {unread > 0 && (
              <span className="
      absolute -top-1 -right-1
      min-w-[18px] h-[18px]
      px-1 text-[10px]
      flex items-center justify-center
      bg-red-500 text-white rounded-full
    ">
                {unread}
              </span>
            )}
          </Link>


          {/* Chats */}
          <Link href="/dm" className="relative">
            <MessageCircle className="h-6 w-6 hover:text-primary transition" />
          </Link>

        </div>
      </div>
    </header>
  )
}
