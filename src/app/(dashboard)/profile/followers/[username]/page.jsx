"use client"

import { useEffect, useState } from "react"
import { getFollowers } from "@/services/follow.service"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function FollowersPage() {
  const params = useParams()
  const username = params.username   

  const [users, setUsers] = useState([])

  useEffect(() => {
    if (!username) return
    load()
  }, [username])   

  async function load() {
    try {
      const data = await getFollowers(username)
      setUsers(data || [])
    } catch {
      setUsers([])
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-lg font-semibold mb-4">Followers</h1>

      {users.map((u, i) => (
        <Link key={i} href={`/user/${u.username}`}>
          <div className="py-3 border-b">
            <p className="font-medium">{u.username}</p>
            <p className="text-xs text-muted-foreground">{u.name}</p>
          </div>
        </Link>
      ))}

      {users.length === 0 && (
        <p className="text-sm text-muted-foreground">No followers</p>
      )}
    </div>
  )
}
