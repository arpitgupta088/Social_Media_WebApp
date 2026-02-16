"use client"

import { useState, useEffect } from "react"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  followUser,
  unfollowUser,
  getFollowStatus
} from "@/services/follow.service"

export default function PublicProfileHeader({ user }) {
  const [following, setFollowing] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
  async function loadStatus() {
    try {
      const res = await getFollowStatus(user.username)
      setFollowing(res?.isFollowing ?? res ?? false)
    } catch {
      setFollowing(false)
    }
  }

  if (user?.username) loadStatus()
}, [user?.username])


  async function handleFollow() {
    if (loading) return
    setLoading(true)

    try {
      if (following) {
        await unfollowUser(user.username)
        setFollowing(false)
        alert("Unfollowed")
      } else {
        await followUser(user.username)
        setFollowing(true)
        alert("Followed")
      }
    } catch {
      // fallback UI update
      setFollowing(!following)
    }

    setLoading(false)
  }

  return (
    <div className="pt-4 pb-3 border-b">
      <div className="flex items-center gap-3 mb-4">
        <Link href="/feed">
          <ChevronLeft className="h-6 w-6" />
        </Link>
        <h2 className="font-semibold text-lg">
          {user.username}
        </h2>
      </div>

      <div className="flex gap-4 items-center">
        <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center text-xl font-bold">
          {user.name[0]}
        </div>

        <div className="flex-1 grid grid-cols-3 text-center text-sm">
          <div>
            <p className="font-bold">{user.stats.posts}</p>
            <p className="text-muted-foreground">Posts</p>
          </div>
          <div>
            <p className="font-bold">{user.stats.followers}</p>
            <p className="text-muted-foreground">Followers</p>
          </div>
          <div>
            <p className="font-bold">{user.stats.following}</p>
            <p className="text-muted-foreground">Following</p>
          </div>
        </div>
      </div>

      <div className="mt-3 text-sm whitespace-pre-line">
        <p className="font-semibold">{user.name}</p>
        <p>{user.bio}</p>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={handleFollow}
          disabled={loading}
          className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${
            following
              ? "bg-muted"
              : "bg-primary text-primary-foreground"
          }`}
        >
          {loading ? "..." : following ? "Following" : "Follow"}
        </button>

        <button
          onClick={() => router.push(`/dm/${user.username}`)}
          className="flex-1 py-2 rounded-lg bg-muted text-sm font-semibold hover:bg-muted/70 transition"
        >
          Message
        </button>

      </div>
    </div>
  )
}
