"use client"
import { useState, useEffect } from "react"
import { toggleFollow, isFollowing } from "@hyprr/lib/follow-store"

import ProfileHeader from "./ProfileHeader"
import ProfileStats from "./ProfileStats"
import ProfileHighlights from "./ProfileHighlights"
import ProfileGrid from "./ProfileGrid"

export default function PublicProfile({ user }) {
    const [following, setFollowing] = useState(false)

    useEffect(() => {
        if (!user) return
        setFollowing(isFollowing(user.username))
    }, [user])

    const handleFollow = () => {
        const newState = toggleFollow(user.username)
        setFollowing(newState)
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="mx-auto w-full max-w-md md:max-w-2xl lg:max-w-3xl">
                <ProfileHeader
                    user={user}
                    following={following}
                    onFollow={handleFollow}
                    isOwnProfile={false}
                />

                <ProfileStats stats={user.stats} />
                <ProfileHighlights highlights={user.highlights} />
                <ProfileGrid username={user.username} />
            </div>
        </div>
    )
}
