"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/context/auth-context"
import ProfileTabs from "@hyprr/components/profile/ProfileTabs"
import ProfileHeader from "@hyprr/components/profile/ProfileHeader"
import ProfileStats from "@hyprr/components/profile/ProfileStats"
import ProfileHighlights from "@hyprr/components/profile/ProfileHighlights"
import ProfileGrid from "@hyprr/components/profile/ProfileGrid"
import RecentlyViewed from "@/components/profile/RecentlyViewed"
import { ReelProvider } from "@/context/reel-context"
import { getPostsByUsername } from "@/services/post.service"

export default function ProfilePage() {
  const { user: authUser } = useAuth()
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState("latest")

  useEffect(() => {
    async function load() {
      if (!authUser) return

      const posts = await getPostsByUsername(authUser.username)

      setUser({
        ...authUser,
        stats: {
          posts: posts.length,
          followers: 500,
          following: 200
        },
        highlights: authUser.highlights || []
      })
    }

    load()
  }, [authUser])


  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading profile...
      </div>
    )
  }

  return (
    <ReelProvider>
      <div className="min-h-screen bg-background">
        <div className="mx-auto w-full max-w-md md:max-w-2xl lg:max-w-4xl">
          <ProfileHeader user={user} isOwnProfile />
          <ProfileStats stats={user.stats} />
          <ProfileHighlights highlights={user.highlights} />


          <RecentlyViewed />

          {/* Spacer */}
          <div className="h-3" />

          {/* Separator Line */}
          <div className="mx-4 h-px bg-border opacity-60" />

          {/* Spacer */}
          <div className="h-3" />



          <ProfileTabs
            active={activeTab}
            onChange={setActiveTab}
          />


          <ProfileGrid
            username={user.username}
            filter={activeTab}
          />

        </div>
      </div>
    </ReelProvider>
  )
}
