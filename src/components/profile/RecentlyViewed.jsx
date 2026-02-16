"use client"

import { useEffect, useState } from "react"
import { Eye, X } from "lucide-react"
import { getReels } from "@hyprr/lib/media-store"
import { useReel } from "@/context/reel-context"

const KEY = "hyprr_recent_reels"

export default function RecentlyViewed() {
  const [open, setOpen] = useState(false)
  const [reels, setReels] = useState([])
  const reelContext = useReel()

  useEffect(() => {
    const raw = localStorage.getItem(KEY)
    const ids = raw ? JSON.parse(raw) : []

    const all = getReels()
    const recent = ids
      .map(id => all.find(r => r.id === id))
      .filter(Boolean)

    setReels(recent)
  }, [open])

  if (!reels.length) return null

  return (
    <div className="px-4 pt-4">
      {/* BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="
          flex items-center gap-2
          px-4 py-2
          rounded-full
          bg-muted
          hover:bg-muted/70
          transition-all
          text-sm font-semibold
          active:scale-95
        "
      >
        <Eye className="h-4 w-4" />
        Recently Viewed
      </button>

      {/* SLIDE UP PANEL */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-end"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={e => e.stopPropagation()}
            className="
              w-full
              bg-background
              rounded-t-2xl
              p-4
              animate-slideUp
            "
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold">
                Recently Viewed
              </h2>

              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-full hover:bg-muted transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* REEL TRAY */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {reels.map(reel => (
                <button
                  key={reel.id}
                  onClick={() => {
                    reelContext?.openReel(reel)
                    setOpen(false)
                  }}
                  className="
                    min-w-[110px]
                    aspect-[9/16]
                    bg-black
                    rounded-xl
                    overflow-hidden
                    relative
                    group
                  "
                >
                  <img
                    src={reel.thumbnail || reel.mediaUrl}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                  />

                  {/* Play overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/40 p-2 rounded-full">
                      ▶
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
