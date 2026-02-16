"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { getPublicUser } from "@hyprr/lib/user-api"

import PublicProfile from "@hyprr/components/profile/PublicProfile"

export default function PublicUserPage() {
  const { username } = useParams()
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function loadUser() {
      const data = await getPublicUser(username)
      setUser(data)
    }
    loadUser()
  }, [username])

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen text-muted-foreground">
        Loading profile...
      </div>
    )
  }

  return <PublicProfile user={user} />
}
