"use client"

import { useEffect, useState } from "react"
import { Bookmark } from "lucide-react"
import { getSavedReels } from "@hyprr/lib/media-store"

const SAVE_KEY = "hyprr_saved_reels"

export default function SavedPage() {
  const [reels, setReels] = useState([])

  useEffect(() => {
    const raw = localStorage.getItem(SAVE_KEY)
    const ids = raw ? JSON.parse(raw) : []
    const data = getSavedReels(ids)
    setReels(data)
  }, [])

  return (
    <div className="min-h-screen bg-background">

      {/* HEADER */}
      <div className="sticky top-0 z-20 px-4 py-3 border-b bg-background flex items-center gap-2">
        <Bookmark className="h-5 w-5" />
        <h1 className="font-semibold text-sm">Saved Nodes</h1>
      </div>

      {/* EMPTY */}
      {!reels.length && (
        <div className="p-10 text-center text-muted-foreground">
          No saved nodes yet
          <p className="text-xs mt-2">
            Tap 🔖 on any node to save it
          </p>
        </div>
      )}

      {/* GRID */}
      <div className="grid grid-cols-3 gap-1 px-2 py-2">
        {reels.map(reel => (
          <button
            key={reel.id}
            onClick={() => {
              window.location.href = `/feed?reel=${reel.id}`
            }}
            className="relative aspect-[9/16] bg-black rounded-lg overflow-hidden"
          >
            <video
              src={reel.mediaUrl}
              muted
              preload="metadata"
              poster={reel.thumbnail || reel.mediaUrl}
              className="h-full w-full object-cover"
            />

          </button>
        ))}
      </div>
    </div>
  )
}
