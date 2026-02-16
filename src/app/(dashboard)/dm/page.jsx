"use client"

import { useContext } from "react"
import { AuthContext } from "@/context/auth-context"
import DMInbox from "@/components/dm/DMInbox"
import { useSearchParams } from "next/navigation"

export default function DMPage() {
  const { user } = useContext(AuthContext)

  const searchParams = useSearchParams()
  const sharedProfile = searchParams.get("share")

  return (
    <DMInbox
      currentUser={user?.username || "me"}
      sharedProfile={sharedProfile}
    />
  )
}
