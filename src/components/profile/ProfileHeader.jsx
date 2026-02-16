"use client"

import { Button } from "@hyprr/components/ui/button"
import {
  ArrowLeft,
  MoreVertical,
  Bookmark,
  Settings,
  LogOut,
  BarChart3
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import ProfileLinks from "@/components/profile/ProfileLinks"
import { startLive, getLiveStatus } from "@/services/live.service"
import LivePreview from "@/components/live/LivePreview"
import LivePlayer from "@/components/live/LivePlayer"
import { blockUser, unblockUser } from "@/services/account.service"
import EditProfileModal from "@/components/profile/edit/EditProfileModal"

export default function ProfileHeader({
  user,
  following,
  onFollow,
  isOwnProfile = false
}) {
  const { user: authUser, role } = useAuth()
  const [showMenu, setShowMenu] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [liveOpen, setLiveOpen] = useState(false)
  const [playerOpen, setPlayerOpen] = useState(false)
  const [viewers, setViewers] = useState(0)
  const [zoom, setZoom] = useState(false)
  const isCreator = user?.role === "creator"
  const router = useRouter()
  const [blocked, setBlocked] = useState(false)
  const [showShare, setShowShare] = useState(false)


  if (!user) {
    return (
      <div className="px-4 pt-3 pb-4 border-b">
        <div className="flex items-center justify-center text-sm text-muted-foreground">
          Loading profile...
        </div>
      </div>
    )
  }

  useEffect(() => {
    // later backend se blocked list me check karenge
  }, [])

  const profileUrl = `${window.location.origin}/user/${user.username}`

  const handleShare = async () => {
    setShowShare(true)
  }


  return (
    <>
      <div className="px-4 pt-3 pb-4 border-b relative">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-4">
          <Link href="/feed">
            <ArrowLeft className="h-5 w-5" />
          </Link>

          <h1 className="text-base font-semibold">
            {user.username}
          </h1>

          <button
            onClick={() => setShowMenu(true)}
            className="p-2 rounded-full hover:bg-muted transition active:scale-90"
          >
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>

        {/* Avatar + Stats */}
        <div className="flex items-center gap-4 mb-3">
          {/* Avatar */}
          <div className="h-20 w-20 rounded-full bg-muted shrink-0 overflow-hidden flex items-center justify-center">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.username}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-xl font-semibold">
                {user.username[0]?.toUpperCase()}
              </span>
            )}
          </div>

          {/* Stats */}
          <div className="flex flex-1 justify-around gap-6 text-center">
            <div>
              <p className="font-semibold">{user.stats.posts}</p>
              <p className="text-xs text-muted-foreground">Posts</p>
            </div>

            <div
              onClick={() => router.push(`/profile/followers/${user.username}`)}
              className="cursor-pointer"
            >
              <p className="font-semibold">{user.stats.followers}</p>
              <p className="text-xs text-muted-foreground">Followers</p>
            </div>


            <div
              onClick={() => router.push(`/profile/following/${user.username}`)}
              className="cursor-pointer"
            >
              <p className="font-semibold">{user.stats.following}</p>
              <p className="text-xs text-muted-foreground">Following</p>
            </div>
          </div>
        </div>

        {/* Name + Bio */}
        <div className="text-sm mb-3">
          <p className="font-semibold">{user.name}</p>
          <p className="whitespace-pre-line text-muted-foreground">
            {user.bio}
          </p>
        </div>

        {/* Links */}
        <ProfileLinks links={user.links} />

        {/* Buttons */}
        {/* Action Bar */}
        <div className="mt-3 space-y-3">

          {/* Primary Row */}
          <div className="flex gap-2">
            {isOwnProfile && isCreator && (
              <button
                onClick={async () => {
                  await startLive()

                  const status = getLiveStatus()
                  setViewers(status.viewers)

                  setZoom(true)
                  setTimeout(() => {
                    setZoom(false)
                    setLiveOpen(true)
                  }, 250)
                }}

                className={`flex-1 px-4 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-red-600 to-red-500 text-white`}
              >
                <span className="h-2.5 w-2.5 rounded-full bg-white animate-pulse" />
                Go Live
              </button>
            )}


            {isOwnProfile && (
              <button
                onClick={() => setShowEdit(true)}
                className="
          flex-1
          px-4
          py-2.5
          rounded-full
          text-sm
          font-semibold
          bg-muted
          hover:bg-muted/80
          transition
        "
              >
                Edit Profile
              </button>
            )}
          </div>

          {/* Secondary Row */}
          <div className="flex gap-2">
            {isOwnProfile && (
              <Button
                size="sm"
                variant="outline"
                className="flex-1 rounded-full"
                onClick={handleShare}
              >
                Share Profile
              </Button>
            )}

            {!isOwnProfile && (
              <>
                <button
                  onClick={onFollow}
                  className={`
            flex-1
            px-4
            py-2.5
            rounded-full
            text-sm
            font-semibold
            transition-all
            active:scale-95
            ${following
                      ? "bg-muted text-muted-foreground"
                      : "bg-primary text-primary-foreground hover:opacity-90"
                    }
          `}
                >
                  {following ? "Following" : "Follow"}
                </button>

                <Button size="sm" variant="outline" className="flex-1 rounded-full">
                  Message
                </Button>
              </>
            )}
          </div>

          {!isOwnProfile && user.membership && (
            <button
              onClick={() => router.push(`/membership/${user.username}`)}
              className="w-full py-2 rounded-full bg-yellow-500 text-black font-semibold"
            >
              Join Membership
            </button>
          )}

        </div>


        {/* Bottom Sheet Menu */}
        {showMenu && (
          <div
            className="fixed inset-0 z-50 flex items-end bg-black/40"
            onClick={() => setShowMenu(false)} // BLANK AREA CLICK CLOSE
          >
            <div
              onClick={(e) => e.stopPropagation()} // MENU SAFE
              className="
              w-full
              rounded-t-2xl
              bg-background
              p-4
              animate-slideUp
            "
            >
              <div className="space-y-3">

                {/* OWN PROFILE MENU */}
                {isOwnProfile && (
                  <>
                    <button
                      onClick={() => {
                        router.push("/settings")
                        setShowMenu(false)
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-muted transition"
                    >
                      <Settings className="h-5 w-5" />
                      <span className="text-sm font-medium">Settings</span>
                    </button>

                    <button
                      onClick={() => {
                        router.push("/saved")
                        setShowMenu(false)
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-muted transition"
                    >
                      <Bookmark className="h-5 w-5" />
                      <span className="text-sm font-medium">Saved</span>
                    </button>

                    {role === "creator" && (
                      <button
                        onClick={() => {
                          router.push("/creator-analytics")
                          setShowMenu(false)
                        }}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-muted transition"
                      >
                        <BarChart3 className="h-5 w-5" />
                        <span className="text-sm font-medium">Creator Dashboard</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        document.cookie = "hyprr-auth=; path=/; max-age=0"
                        router.push("/login")
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition"
                    >
                      <LogOut className="h-5 w-5" />
                      <span className="text-sm font-medium">Logout</span>
                    </button>
                  </>
                )}

                {/* PUBLIC PROFILE MENU */}
                {!isOwnProfile && (
                  <>
                    <button
                      onClick={() => {
                        alert("Story hidden")
                        setShowMenu(false)
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-muted transition"
                    >
                      Hide Story
                    </button>

                    <button
                      onClick={() => {
                        alert("Follower removed")
                        setShowMenu(false)
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-muted transition"
                    >
                      Remove Follower
                    </button>

                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 rounded-full"
                      onClick={handleShare}
                    >
                      Share Profile
                    </Button>


                    <button
                      onClick={async () => {
                        if (!blocked) {
                          await blockUser(user.username)
                          alert("User blocked")
                          setBlocked(true)
                        } else {
                          await unblockUser(user.username)
                          alert("User unblocked")
                          setBlocked(false)
                        }
                        setShowMenu(false)
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition"
                    >
                      {blocked ? "Unblock User" : "Block User"}
                    </button>

                  </>
                )}

              </div>

            </div>
          </div>


        )}
      </div>
      <EditProfileModal
        open={showEdit}
        onClose={() => setShowEdit(false)}
      />

      {showShare && (
        <div
          className="fixed inset-0 z-50 flex items-end bg-black/40"
          onClick={() => setShowShare(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full bg-background rounded-t-2xl p-4 animate-slideUp"
          >
            <div className="space-y-3">

              {/* Send in DM */}
              <button
                onClick={() => {
                  router.push(`/dm?share=${profileUrl}`)
                  setShowShare(false)
                }}
                className="w-full px-4 py-3 rounded-xl bg-muted hover:bg-muted/80"
              >
                Send in DM
              </button>

              {/* Native share */}
              <button
                onClick={async () => {
                  if (navigator.share) {
                    await navigator.share({
                      title: "Profile",
                      url: profileUrl
                    })
                  }
                  setShowShare(false)
                }}
                className="w-full px-4 py-3 rounded-xl bg-muted hover:bg-muted/80"
              >
                More options
              </button>

              {/* Copy link */}
              <button
                onClick={() => {
                  navigator.clipboard.writeText(profileUrl)
                  alert("Link copied")
                  setShowShare(false)
                }}
                className="w-full px-4 py-3 rounded-xl bg-muted hover:bg-muted/80"
              >
                Copy link
              </button>

            </div>
          </div>
        </div>
      )}

      {liveOpen && (
        <LivePreview
          viewers={viewers}
          onJoin={() => {
            setLiveOpen(false)
            setPlayerOpen(true)
          }}
          onClose={() => setLiveOpen(false)}
        />
      )}

      {playerOpen && (
        <LivePlayer
          onExit={() => setPlayerOpen(false)}
        />
      )}

    </>
  )
}
