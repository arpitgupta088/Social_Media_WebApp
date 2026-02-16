"use client"

import { use } from "react"
import { useSearchParams } from "next/navigation"
import ChatThread from "@/components/dm/ChatThread"

export default function ChatPage({ params }) {
  const { username } = use(params)

  const searchParams = useSearchParams()
  const sharedProfile = searchParams.get("share")

  return (
    <ChatThread
      username={username}
      sharedProfile={sharedProfile}
    />
  )
}
