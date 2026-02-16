"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, User, PlusSquare, Film, Target } from "lucide-react"
import CreateModal from "./CreateModal"

export default function BottomNav() {
  const pathname = usePathname()
  const [openCreate, setOpenCreate] = useState(false)

  const navItem = (href, Icon, onClick) => {
    const active = pathname === href

    const content = (
      <div
        onClick={onClick}
        className={`flex flex-col items-center justify-center ${active ? "text-primary" : "text-muted-foreground"
          }`}
      >
        <Icon size={24} />
      </div>
    )

    if (onClick) return content

    return (
      <Link href={href} className="flex flex-col items-center justify-center">
        {content}
      </Link>
    )
  }

  return (
    <>
      <nav className="fixed bottom-0 left-0 z-[999] w-full border-t bg-background backdrop-blur">

        <div className="mx-auto flex h-14 max-w-md items-center justify-around">
          {navItem("/feed", Home)}
          {navItem("/search", Search)}
          {navItem("#", PlusSquare, () => setOpenCreate(true))}
          {navItem("/reels", Film)}
          {navItem("/campaigns", Target)}
          <div id="bottom-profile">
            {navItem("/profile", User)}
          </div>

        </div>
      </nav>

      <CreateModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
      />
    </>
  )
}
