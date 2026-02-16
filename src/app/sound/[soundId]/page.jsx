"use client"

import { useParams, useRouter } from "next/navigation"
import { getReelsBySound } from "@hyprr/lib/media-store"
import { Play, ArrowLeft } from "lucide-react"

export default function SoundPage() {
  const { soundId } = useParams()
  const router = useRouter()

  const reels = getReelsBySound(soundId)

  return (
    <div className="min-h-screen bg-background">
      
      {/* HEADER */}
      <div className="sticky top-0 z-20 flex items-center gap-3 px-4 py-3 border-b bg-background/80 backdrop-blur">
        <button onClick={() => router.back()}>
          <ArrowLeft />
        </button>
        <div>
          <p className="font-semibold text-sm">Original Sound</p>
          <p className="text-xs text-muted-foreground">
            {soundId.replace("original_", "")}
          </p>
        </div>
      </div>

      {/* USE SOUND */}
      <div className="p-4">
        <button
          onClick={() =>
            router.push(`/create/reel?sound=${soundId}`)
          }
          className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition"
        >
          Use this sound
        </button>
      </div>

      {/* REELS GRID */}
      <div className="grid grid-cols-3 gap-1 px-2">
        {reels.map(reel => (
          <div
            key={reel.id}
            className="relative aspect-[9/16] bg-black rounded-lg overflow-hidden"
          >
            <video
              src={reel.mediaUrl}
              muted
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <Play className="h-6 w-6 opacity-80" />
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
