"use client"

import { useEffect, useState } from "react"
import { Search, Camera } from "lucide-react"
import Link from "next/link"
import { getInbox } from "@/services/dm.service"
import { getConversations } from "@/services/chat.service"


export default function DMInbox({ currentUser, sharedProfile }) {
  const [chats, setChats] = useState([])
  const [query, setQuery] = useState("")

 useEffect(() => {
    async function load() {
      try {
        const convos = await getConversations()

        if (convos && convos.length > 0) {
          const mapped = convos.map((c) => ({
            username: c.user.username,
            name: c.user.name,
            lastMessage: c.lastMessage?.content || "",
            time: "",
            unread: c.unreadCount > 0,
            avatar: c.user.username[0]
          }))

          setChats(mapped)
          return
        }
      } catch (e) {
        console.log("API down → demo chats")
      }

      // fallback demo chats
      const demo = await getInbox(currentUser)
      setChats(demo)
    }

    load()
  }, [currentUser])

  const filtered = chats.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="mx-auto max-w-md min-h-screen bg-background">

      {/* HEADER SEARCH (Instagram style) */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b">
        <div className="p-3 flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 rounded-full bg-muted px-4 py-2">
            <Search size={16} className="text-muted-foreground" />
            <input
              placeholder="Search"
              className="bg-transparent text-sm flex-1 outline-none placeholder:text-muted-foreground"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Camera className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>

      {/* CHAT LIST */}
      <div className="divide-y">
        {filtered.map((chat) => (
          <Link
            key={chat.username}
            href={
              sharedProfile
                ? `/dm/${chat.username}?share=${encodeURIComponent(sharedProfile)}`
                : `/dm/${chat.username}`
            }
            className="
              flex
              items-center
              gap-3
              px-4
              py-3
              min-h-[58px]
              hover:bg-muted/60
              transition
            "
          >
            {/* AVATAR */}
            <div className="h-10 w-10 shrink-0 rounded-full bg-muted flex items-center justify-center font-semibold text-sm">
              {chat.avatar || chat.name[0]}
            </div>

            {/* NAME + LAST MESSAGE */}
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold leading-tight truncate">
                {chat.name}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {chat.lastMessage}
              </p>
            </div>

            {/* TIME + UNREAD DOT */}
            <div className="flex flex-col items-end text-[11px] text-muted-foreground shrink-0">
              <span>{chat.time}</span>
              {chat.unread && (
                <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
              )}
            </div>
          </Link>
        ))}

        {filtered.length === 0 && (
          <p className="p-6 text-center text-sm text-muted-foreground">
            No conversations found
          </p>
        )}
      </div>
    </div>
  )
}
