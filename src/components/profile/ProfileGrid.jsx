"use client"

import { useEffect, useState } from "react"
import { getPostsByUsername } from "@/services/post.service"

export default function ProfileGrid({ username, filter = "latest" }) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPosts() {
      setLoading(true)
      const userPosts = await getPostsByUsername(username)
      setPosts(userPosts)
      setLoading(false)
    }

    if (username) {
      loadPosts()
    }
  }, [username, filter])

  // Skeleton loading
  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-1 p-1 mt-2">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square bg-muted animate-pulse rounded-md"
          />
        ))}
      </div>
    )
  }

  // Empty state
  if (posts.length === 0) {
    return (
      <div className="text-center text-sm text-muted-foreground py-10">
        No {filter} posts or reels yet
      </div>
    )
  }

  return (
    <div className="grid grid-cols-3 gap-1 p-1 mt-2">
      {posts.map((post) => (
        <div
          key={post.id}
          className="relative aspect-square overflow-hidden rounded-md bg-muted group cursor-pointer"
        >
          {/* Media */}
          {post.mediaType === "video" ? (
            <video
              src={post.mediaUrl}
              muted
              playsInline
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <img
              src={post.mediaUrl}
              alt="post"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          )}

          {/* Reel Badge */}
          {post.isReel && (
            <div className="absolute top-1 right-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded">
              REEL
            </div>
          )}

          {/* Membership Badge */}
          {post.visibility === "membership" && (
            <div className="absolute bottom-1 left-1 bg-yellow-500/90 text-black text-[10px] px-1.5 py-0.5 rounded">
              MEMBER
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
