"use client"

import { X, Link2, Share2, Bookmark, MessageCircle } from "lucide-react"
import { useEffect } from "react"
import { useState } from "react"


export default function ShareSheet({ open, onClose, post, onDM }) {

    const [ripples, setRipples] = useState([])

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden"
        }
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [open])

    if (!open || !post) return null

    const shareUrl =
        typeof window !== "undefined"
            ? `${window.location.origin}/post/${post.id}`
            : ""

    function copyLink() {
        navigator.clipboard.writeText(shareUrl)
        onClose()
    }

    function createRipple(e) {
        const button = e.currentTarget
        const rect = button.getBoundingClientRect()

        const size = Math.max(rect.width, rect.height)
        const x = e.clientX - rect.left - size / 2
        const y = e.clientY - rect.top - size / 2

        const newRipple = {
            id: Date.now(),
            x,
            y,
            size
        }

        setRipples((prev) => [...prev, newRipple])

        setTimeout(() => {
            setRipples((prev) =>
                prev.filter((r) => r.id !== newRipple.id)
            )
        }, 600)
    }


    function nativeShare() {
        if (navigator.share) {
            navigator.share({
                title: "Hyprr Post",
                text: post.caption || "Check this out",
                url: shareUrl
            })
        }
    }

    return (
        <div
            className="fixed inset-0 z-[999] bg-black/40 flex items-end"
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="
          w-full
          rounded-t-2xl
          bg-background
          p-4
          animate-slideUp
        "
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                    <p className="font-semibold text-sm">Share</p>
                    <button onClick={onClose}>
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-4 gap-4 text-center">
                    <button
                        onClick={copyLink}
                        className="flex flex-col items-center gap-2 hover:scale-105 transition"
                    >
                        <div className="p-3 rounded-full bg-muted">
                            <Link2 className="h-5 w-5" />
                        </div>
                        <span className="text-xs">Copy</span>
                    </button>

                    <button
                        onClick={nativeShare}
                        className="flex flex-col items-center gap-2 hover:scale-105 transition"
                    >
                        <div className="p-3 rounded-full bg-muted">
                            <Share2 className="h-5 w-5" />
                        </div>
                        <span className="text-xs">Share</span>
                    </button>

                    <button
                        onClick={(e) => {
                            createRipple(e)
                            setTimeout(() => {
                                onClose()
                                onDM && onDM()
                            }, 150)
                        }}
                        className="
    relative
    overflow-hidden
    flex
    flex-col
    items-center
    gap-2
    hover:scale-105
    transition
  "
                    >

                        <div className="p-3 rounded-full bg-muted">
                            <MessageCircle className="h-5 w-5" />
                            {ripples.map((ripple) => (
                                <span
                                    key={ripple.id}
                                    className="absolute rounded-full bg-primary/30 animate-ping"
                                    style={{
                                        width: ripple.size,
                                        height: ripple.size,
                                        top: ripple.y,
                                        left: ripple.x
                                    }}
                                />
                            ))}

                        </div>
                        <span className="text-xs">DM</span>
                    </button>

                    <button className="flex flex-col items-center gap-2 hover:scale-105 transition">
                        <div className="p-3 rounded-full bg-muted">
                            <Bookmark className="h-5 w-5" />
                        </div>
                        <span className="text-xs">Save</span>
                    </button>
                </div>

                {/* Link Preview */}
                <div className="mt-4 text-xs text-muted-foreground break-all">
                    {shareUrl}
                </div>
            </div>
        </div>
    )
}
