"use client"

import { useState, useRef } from "react"
import { Heart, MessageCircle, Send, UserPlus, Check, MoreVertical, Bookmark, Link2, EyeOff, Flag, VolumeX } from "lucide-react"
import Link from "next/link"
import CommentModal from "../feed/CommentModal.jsx"
import { BarChart3 } from "lucide-react"
import {
    trackView,
    trackLike,
    trackSave,
    trackProfileVisit
} from "@hyprr/lib/insights-store"
import PostInsightsModal from "./PostInsightsModal"
import { useEffect } from "react"
import { getMediaFile } from "@hyprr/lib/media-db"
import { useReel } from "@/context/reel-context"
import ShareSheet from "@/components/share/ShareSheet"
import DMShareModal from "@/components/dm/DMShareModal"
import SoundChip from "@/components/sound/SoundChip"
import { trackRecent } from "@hyprr/lib/insights-store"
import { Trash2 } from "lucide-react"
import { softDeleteMedia, restoreMedia } from "@hyprr/lib/media-store"
import { submitReport } from "@/services/report.service"
import { hidePost } from "@/services/admin.service"
import { useRouter } from "next/navigation"


export default function PostCard({ post }) {
    const [liked, setLiked] = useState(false)
    const [likes, setLikes] = useState(post.likes)
    const [showHeart, setShowHeart] = useState(false)
    const [following, setFollowing] = useState(false)
    const currentUser = "arpit"
    const isOwner = post.username?.includes(currentUser)
    const router = useRouter()


    const [showComments, setShowComments] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [saved, setSaved] = useState(false)
    const [showInsights, setShowInsights] = useState(false)
    const [videoSrc, setVideoSrc] = useState(null)
    const [showShare, setShowShare] = useState(false)
    const [showDM, setShowDM] = useState(false)
    const [showReport, setShowReport] = useState(false)
    const [reportReason, setReportReason] = useState("")

    const reelContext = useReel()
    const openReel = reelContext?.openReel
    const activeReel = reelContext?.activeReel

    const SAVE_KEY = "hyprr_saved_reels"


    useEffect(() => {
        if (post.mediaId) {
            getMediaFile(post.mediaId).then(file => {
                if (file) {
                    setVideoSrc(URL.createObjectURL(file))
                }
            })
        }
    }, [post.mediaId])


    useEffect(() => {
        trackView(post.id)
        trackRecent(post.id)
    }, [post.id])


    useEffect(() => {
        const raw = localStorage.getItem(SAVE_KEY)
        const savedIds = raw ? JSON.parse(raw) : []
        setSaved(savedIds.includes(post.id))
    }, [post.id])

    const lastTap = useRef(0)


    const toggleLike = () => {
        if (!liked) trackLike(post.id)
        setLiked((prev) => !prev)
        setLikes((prev) => (liked ? prev - 1 : prev + 1))
    }


    const toggleFollow = () => {
        setFollowing((prev) => !prev)
    }

    const triggerHeart = () => {
        setShowHeart(true)
        setTimeout(() => setShowHeart(false), 600)
    }

    const handleTap = () => {
        const now = Date.now()
        const timeSinceLast = now - lastTap.current

        if (timeSinceLast < 300) {
            if (!liked) toggleLike()
            triggerHeart()
        }

        lastTap.current = now
    }

    // Fly to profile animation
    const flyToProfile = (startEl) => {

        const profileIcon = document.getElementById("bottom-profile")

        if (!profileIcon || !startEl) {
            console.log("❌ Fly target missing")
            return
        }

        const start = startEl.getBoundingClientRect()
        const end = profileIcon.getBoundingClientRect()

        const clone = startEl.cloneNode(true)

        Object.assign(clone.style, {
            position: "fixed",
            left: start.left + "px",
            top: start.top + "px",
            width: start.width + "px",
            height: start.height + "px",
            zIndex: 9999,
            borderRadius: "999px",
            pointerEvents: "none",
            transition: "all 0.9s cubic-bezier(.25,.8,.25,1)"
        })

        document.body.appendChild(clone)

        requestAnimationFrame(() => {
            clone.style.left = end.left + end.width / 2 - start.width / 4 + "px"
            clone.style.top = end.top + end.height / 2 - start.height / 4 + "px"
            clone.style.transform = "scale(0.25)"
            clone.style.opacity = "100"
        })

        setTimeout(() => {
            clone.remove()
            profileIcon.classList.add("animate-ping")
            setTimeout(() => {
                profileIcon.classList.remove("animate-ping")
            }, 600)
        }, 900)
    }

    return (
        <div
            className="
        mx-2 my-4
        rounded-xl
        bg-background
        border
        shadow-sm
        overflow-hidden
        transition-all
        duration-300
        hover:shadow-lg
        hover:-translate-y-[2px]
        hover:border-primary/40
        group
      "
        >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div
                        className="
              h-9 w-9
              rounded-full
              overflow-hidden
              ring-2 ring-primary/20
              bg-muted
              transition-all
              duration-300
              group-hover:ring-primary/60
              group-hover:scale-105
            "
                    >
                        <img
                            src={post.avatar}
                            alt={post.username}
                            className="h-9 w-9 rounded-full object-cover border hover:scale-110 transition-transform"
                        />

                    </div>

                    <div className="flex flex-col">
                        <Link
                            href={`/user/${post.username}`}
                            className="
                text-[var(--text-sm)] font-[var(--fw-semibold)] tracking-tight
                transition-colors
                hover:text-primary
                hover:underline
              "
                        >
                            {post.username}
                        </Link>

                        <span className="text-[var(--text-xs)] text-muted-foreground">
                            {post.time || "Just now"}
                        </span>
                    </div>
                </div>



                {/* Follow Button */}
                <div className="flex items-center gap-2">
                    {/* Follow Button */}
                    <button
                        onClick={toggleFollow}
                        className={`
        flex items-center gap-1
        text-xs font-semibold
        px-3 py-1.5
        rounded-full
        transition-all
        duration-300
        active:scale-95
        hover:scale-105
        ${following
                                ? "bg-muted text-muted-foreground hover:bg-muted/80"
                                : "bg-primary text-primary-foreground hover:brightness-110"
                            }
      `}
                    >
                        {following ? (
                            <>
                                <Check className="h-3 w-3" />
                                Following
                            </>
                        ) : (
                            <>
                                <UserPlus className="h-3 w-3" />
                                Follow
                            </>
                        )}
                    </button>

                    {/* 3 Dots Menu Button */}
                    <button
                        onClick={() => setShowMenu(true)}
                        className="p-2 rounded-full hover:bg-muted transition active:scale-90"
                    >
                        <MoreVertical className="h-5 w-5" />
                    </button>

                </div>
            </div>

            {/* Media */}
            <div
                className="relative h-[420px] bg-black overflow-hidden cursor-pointer"
                onClick={() => {
                    handleTap()
                    if (openReel && (post.isReel || post.mediaType === "video")) {
                        const KEY = "hyprr_recent_reels"

                        const raw = localStorage.getItem(KEY)
                        const recent = raw ? JSON.parse(raw) : []

                        const updated = [
                            post.id,
                            ...recent.filter(id => id !== post.id)
                        ].slice(0, 10) // max 10 recent reels

                        localStorage.setItem(KEY, JSON.stringify(updated))

                        openReel({
                            ...post,
                            mediaUrl: videoSrc || post.mediaUrl
                        })
                    }

                }}

            >
                {post.mediaType === "video" || post.isReel ? (
                    <div
                        className="h-full w-full overflow-hidden bg-black"
                        style={{
                            aspectRatio: post.cropRatio || "9 / 16"
                        }}
                    >
                        <video
                            src={videoSrc || post.mediaUrl}
                            muted
                            playsInline
                            className={`h-full w-full object-cover transition-all duration-500 ${post.filter || ""}`}
                            onLoadedMetadata={(e) => {
                                const v = e.currentTarget

                                // Apply trim start
                                if (post.trim?.start) {
                                    v.currentTime = post.trim.start
                                }

                                v.play().catch(() => { })
                            }}
                            onTimeUpdate={(e) => {
                                const v = e.currentTarget

                                // Apply trim end loop
                                if (post.trim?.end && v.currentTime >= post.trim.end) {
                                    v.currentTime = post.trim.start || 0
                                    v.play()
                                }
                            }}
                        />
                    </div>
                ) : (

                    <img
                        src={post.mediaUrl}
                        alt="Post media"
                        className="h-full w-full object-cover"
                    />
                )}


                {/* Center Heart Animation */}
                {showHeart && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <Heart className="h-24 w-24 text-white fill-white animate-ping" />
                    </div>
                )}

                {!activeReel && (post.isReel || post.mediaType === "video") && (
                    <div className="absolute bottom-3 left-3 z-30">
                        <SoundChip sound={post.sound} />
                    </div>
                )}


            </div>

            {/* Actions */}
            <div className="flex items-center gap-5 px-4 py-3">
                <button
                    onClick={toggleLike}
                    className="
            active:scale-90
            transition-all
            duration-200
            hover:scale-110
          "
                >
                    <Heart
                        className={`h-6 w-6 transition-all ${liked
                            ? "text-red-500 fill-red-500 scale-110"
                            : "hover:text-red-500"
                            }`}
                    />
                </button>

                <button
                    onClick={() => setShowComments(true)}
                    className="
    active:scale-90
    transition-all
    duration-200
    hover:scale-110
    hover:text-primary
  "
                >
                    <MessageCircle className="h-6 w-6" />
                </button>


                <button
                    onClick={() => setShowShare(true)}
                    className="
    ml-auto
    active:scale-90
    transition-all
    duration-200
    hover:scale-110
    hover:text-primary
  "
                >
                    <Send className="h-6 w-6" />
                </button>

            </div>

            {/* Likes */}
            <div
                className="
          px-4
          text-[var(--text-sm)] font-[var(--fw-semibold)] tracking-tight
          transition-colors
          duration-300
          group-hover:text-primary
        "
            >
                {likes} likes
            </div>

            {/* Caption */}

            {post.link && (
                <a
                    href={post.link}
                    target="_blank"
                    onClick={() => trackProfileVisit(post.username)}
                    className="px-4 pb-2 block text-sm text-blue-500 hover:underline"
                >
                    🔗 Visit Link
                </a>

            )}

            <div className="px-4 pb-4 pt-1 text-[var(--text-base)] leading-[var(--lh-relaxed)]">
                <span
                    className="
            font-[var(--fw-semibold)] tracking-tight
            transition-colors
            hover:text-primary
            cursor-pointer
          "
                >
                    {post.username}
                </span>{" "}
                {post.caption}
            </div>
            {showComments && (
                <CommentModal
                    postId={post.id}
                    currentUser={currentUser}
                    onClose={() => setShowComments(false)}
                />
            )}

            {showMenu && (
                <div
                    className="fixed inset-0 z-50 flex items-end bg-black/40"
                    onClick={() => setShowMenu(false)}
                >

                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="w-full rounded-t-2xl bg-background p-4 animate-slideUp"
                    >

                        <div className="space-y-3">

                            <button
                                onClick={(e) => {

                                    flyToProfile(e.currentTarget)

                                    const raw = localStorage.getItem(SAVE_KEY)
                                    const savedIds = raw ? JSON.parse(raw) : []

                                    let updated

                                    if (savedIds.includes(post.id)) {
                                        updated = savedIds.filter(id => id !== post.id)
                                        setSaved(false)
                                    } else {
                                        updated = [...savedIds, post.id]
                                        setSaved(true)
                                        trackSave(post.id)
                                    }

                                    localStorage.setItem(SAVE_KEY, JSON.stringify(updated))
                                    setShowMenu(false)
                                }}

                                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-muted transition"
                            >
                                <Bookmark className="h-5 w-5" />
                                {saved ? "Saved" : "Save Post"}
                            </button>

                            <button
                                onClick={() => {
                                    setShowMenu(false)
                                    setShowInsights(true)
                                }}
                                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-muted transition"
                            >
                                <BarChart3 className="h-5 w-5" />
                                View Insights
                            </button>


                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(window.location.href)
                                    setShowMenu(false)
                                }}
                                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-muted transition"
                            >
                                <Link2 className="h-5 w-5" />
                                Copy Link
                            </button>

                            <button
                                onClick={async () => {
                                    try {
                                        await hidePost(post.id)
                                        alert("Post hidden")
                                    } catch {
                                        alert("Hide failed")
                                    }
                                    setShowMenu(false)
                                }}
                                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-muted transition"
                            >
                                <EyeOff className="h-5 w-5" />
                                Hide Post
                            </button>


                            {isOwner && (
                                <button
                                    onClick={() => {
                                        const ok = confirm("Delete this post permanently?")
                                        if (!ok) return

                                        const removed = softDeleteMedia(post.id)
                                        if (!removed) return

                                        // Remove from feed instantly
                                        window.dispatchEvent(
                                            new CustomEvent("hyprr:delete-post", {
                                                detail: post.id
                                            })
                                        )

                                        // Tell feed to show UNDO snackbar
                                        window.dispatchEvent(
                                            new CustomEvent("hyprr:snackbar", {
                                                detail: removed
                                            })
                                        )

                                        setShowMenu(false)
                                    }}
                                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition"
                                >
                                    <Trash2 className="h-5 w-5" />
                                    Delete Post
                                </button>
                            )}


                            <button
                                onClick={() => {
                                    setShowMenu(false)
                                    setShowReport(true)
                                }}
                                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition"
                            >
                                <Flag className="h-5 w-5" />
                                Report
                            </button>


                            <button
                                onClick={() => setShowMenu(false)}
                                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-muted transition"
                            >
                                <VolumeX className="h-5 w-5" />
                                Mute User
                            </button>

                        </div>
                    </div>
                </div>
            )}

            {showInsights && (
                <PostInsightsModal
                    postId={post.id}
                    onClose={() => setShowInsights(false)}
                />
            )}

            <ShareSheet
                open={showShare}
                onClose={() => setShowShare(false)}
                post={post}
                onDM={() => {
                    setShowShare(false)
                    setShowDM(true)
                }}
            />

            <DMShareModal
                open={showDM}
                onClose={() => setShowDM(false)}
                post={post}
                currentUser={currentUser}
            />

            {showReport && (
                <div
                    className="fixed inset-0 z-50 flex items-end bg-black/50"
                    onClick={() => setShowReport(false)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="w-full rounded-t-2xl bg-background p-5 animate-slideUp"
                    >
                        <h2 className="text-sm font-semibold mb-3">
                            Why are you reporting this post?
                        </h2>

                        <div className="space-y-2">
                            {[
                                "Spam",
                                "Nudity or sexual content",
                                "Hate or harassment",
                                "False information",
                                "Violence",
                                "Something else"
                            ].map((reason) => (
                                <button
                                    key={reason}
                                    onClick={() => setReportReason(reason)}
                                    className={`w-full text-left px-4 py-2 rounded-lg border transition ${reportReason === reason
                                        ? "bg-primary text-primary-foreground border-primary"
                                        : "hover:bg-muted"
                                        }`}
                                >
                                    {reason}
                                </button>
                            ))}
                        </div>

                        <button
                            disabled={!reportReason}
                            onClick={async () => {
                                try {
                                    await submitReport({
                                        reason: reportReason,
                                        postId: post.id
                                    })

                                    alert("Report submitted successfully")
                                } catch (err) {
                                    if (err.message === "LOGIN_REQUIRED") {
                                        alert("Token required to report")
                                    } else {
                                        alert("Failed to submit report")
                                    }
                                }

                                setShowReport(false)
                                setReportReason("")
                            }}

                            className="mt-4 w-full py-2 rounded-lg bg-red-500 text-white disabled:opacity-50"
                        >
                            Submit Report
                        </button>
                    </div>
                </div>
            )}



        </div>
    )
}
