"use client"

import { useEffect, useRef, useState } from "react"
import {
    Heart,
    MessageCircle,
    Bookmark,
    Share2,
    ArrowLeft,
    X,
} from "lucide-react"
import { getReels } from "@/services/reel.service"
import { useRouter } from "next/navigation"
import ReelShareSheet from "@/components/reels/ReelShareSheet"
import DMShareModal from "@/components/dm/DMShareModal"

export default function ReelsPage() {
    const [reels, setReels] = useState([])
    const containerRef = useRef(null)
    const router = useRouter()

    useEffect(() => {
        getReels().then(setReels)
    }, [])

    // Autoplay system
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const video = entry.target.querySelector("video")
                    if (!video) return
                    entry.isIntersecting ? video.play() : video.pause()
                })
            },
            { threshold: 0.7 }
        )

        const items = containerRef.current?.children || []
        Array.from(items).forEach((item) => observer.observe(item))
        return () => observer.disconnect()
    }, [reels])

    return (
        <div className="relative h-screen bg-black">
            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between p-3 text-white">
                <button onClick={() => router.back()}>
                    <ArrowLeft />
                </button>
                <span className="text-sm font-semibold">Nodes</span>
                <div className="w-6" />
            </div>

            <div
                ref={containerRef}
                className="h-screen snap-y snap-mandatory overflow-y-scroll"
            >

                {reels.map((reel) => (
                    <ReelCard key={reel.id} reel={reel} />
                ))}
            </div>
        </div>
    )
}

function ReelCard({ reel }) {
    const [liked, setLiked] = useState(false)
    const [following, setFollowing] = useState(false)
    const [openComments, setOpenComments] = useState(false)
    const [showShare, setShowShare] = useState(false)

    const lastTap = useRef(0)
    const [showHeart, setShowHeart] = useState(false)
    const [showDM, setShowDM] = useState(false)

    const [saved, setSaved] = useState(false)

    useEffect(() => {
        const list = JSON.parse(localStorage.getItem("hyprr_saved_reels") || "[]")
        setSaved(list.includes(reel.id))
    }, [reel.id])

    // DOUBLE TAP
    function handleDoubleTap() {
        const now = Date.now()

        if (now - lastTap.current < 300) {
            setLiked(true)
            setShowHeart(true)

            setTimeout(() => setShowHeart(false), 700)
        }

        lastTap.current = now
    }

    return (
        <div className="relative h-screen w-full snap-start bg-black">

            {/* HEART ANIMATION */}
            {showHeart && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-40">
                    <Heart className="h-28 w-28 text-white fill-white animate-ping" />
                </div>
            )}

            {/* VIDEO */}
            <video
                src={reel.video}
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
                onClick={handleDoubleTap}
            />

            {/* RIGHT SIDE ACTIONS */}
            <div className="absolute bottom-28 right-3 flex flex-col items-center gap-4 text-white z-30">
                <ActionButton
                    icon={Heart}
                    label={reel.likes + (liked ? 1 : 0)}
                    active={liked}
                    onClick={() => setLiked(!liked)}
                />
                <ActionButton
                    icon={MessageCircle}
                    label={reel.comments}
                    onClick={() => setOpenComments(true)}
                />
                <ActionButton
                    icon={Bookmark}
                    active={saved}
                    onClick={() => {
                        const key = "hyprr_saved_reels"
                        let list = JSON.parse(localStorage.getItem(key) || "[]")

                        if (list.includes(reel.id)) {
                            list = list.filter(id => id !== reel.id)
                            setSaved(false)
                        } else {
                            list.push(reel.id)
                            setSaved(true)
                        }

                        localStorage.setItem(key, JSON.stringify(list))
                    }}
                />

                <ActionButton
                    icon={Share2}
                    onClick={() => setShowShare(true)}
                />

            </div>

            {/* BOTTOM INFO */}
            <div className="absolute bottom-6 left-4 right-16 text-white z-30">
                <div className="flex items-center gap-2 mb-2">
                    <img src={reel.avatar} className="h-8 w-8 rounded-full border" />
                    <span className="text-sm font-semibold">{reel.user}</span>

                    <button
                        onClick={() => setFollowing(!following)}
                        className={`ml-2 rounded-full px-3 py-0.5 text-xs border transition ${following
                            ? "bg-white text-black"
                            : "border-white text-white hover:bg-white hover:text-black"
                            }`}
                    >
                        {following ? "Following" : "Follow"}
                    </button>
                </div>

                <p className="text-sm opacity-90">{reel.caption}</p>
            </div>

            <CommentSheet
                open={openComments}
                onClose={() => setOpenComments(false)}
            />

            {showShare && (
                <ReelShareSheet
                    reel={reel}
                    onClose={() => setShowShare(false)}
                    onOpenDM={() => setShowDM(true)}
                />
            )}

            <DMShareModal
                open={showDM}
                onClose={() => setShowDM(false)}
                post={reel}
                currentUser="arpit"
            />


        </div>
    )
}



function ActionButton({ icon: Icon, label, onClick, active }) {
    return (
        <button
            onClick={onClick}
            className="flex flex-col items-center gap-1 transition active:scale-95"
        >
            <Icon
                size={26}
                className={active ? "fill-yellow-400 text-yellow-400" : ""}
            />

            {label !== undefined && (
                <span className="text-xs opacity-80">{label}</span>
            )}
        </button>
    )
}

// ---------------- COMMENTS UI ----------------

function CommentSheet({ open, onClose }) {
    const [comments, setComments] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [input, setInput] = useState("")

    useEffect(() => {
        if (open) loadMore()
    }, [open])

    function postComment() {
        if (!input.trim()) return

        setComments(prev => [
            ...prev,
            { id: Date.now(), user: "you", text: input }
        ])
        setInput("")
    }

    function loadMore() {
        if (loading) return
        setLoading(true)

        setTimeout(() => {
            const newComments = Array.from({ length: 5 }).map((_, i) => ({
                id: Date.now() + i,
                user: "user_" + (page * 5 + i),
                text: "Nice reel 🔥"
            }))

            setComments(prev => [...prev, ...newComments])
            setPage(prev => prev + 1)
            setLoading(false)
        }, 600)
    }

    if (!open) return null

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Sheet */}
            <div className="relative w-full max-w-md animate-slideUp rounded-t-2xl bg-background p-4">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold">Comments</span>
                    <button onClick={onClose}>
                        <X size={18} />
                    </button>
                </div>

                <div
                    className="max-h-64 overflow-y-auto space-y-3 mb-3"
                    onScroll={(e) => {
                        const bottom =
                            e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight

                        if (bottom) loadMore()
                    }}
                >

                    {comments.map((c) => (
                        <div key={c.id} className="text-sm">
                            <span className="font-semibold mr-1">{c.user}</span>
                            {c.text}
                        </div>
                    ))}
                </div>

                <div className="flex gap-2">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Add a comment..."
                        className="flex-1 rounded-xl border bg-background px-3 py-2 text-sm focus:outline-none"
                    />
                    <button
                        onClick={postComment}
                        className="rounded-xl bg-primary px-4 py-2 text-sm text-white disabled:opacity-50"
                        disabled={!input.trim()}
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>
    )
}
