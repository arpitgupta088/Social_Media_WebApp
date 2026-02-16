"use client"

import { useEffect, useRef, useState } from "react"
import { X, Volume2, VolumeX, Send, Share2, Bookmark, BookmarkCheck } from "lucide-react"
import { useReel } from "@/context/reel-context"
import ShareSheet from "@/components/share/ShareSheet"
import SoundChip from "@/components/sound/SoundChip"
import DMShareModal from "@/components/dm/DMShareModal"

const SAVE_KEY = "hyprr_saved_reels"

export default function ReelViewer() {
  const { activeReel, closeReel } = useReel()

  const videoRef = useRef(null)
  const holdTimer = useRef(null)

  const [muted, setMuted] = useState(true)
  const [holding, setHolding] = useState(false)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState(false)

  const [showShare, setShowShare] = useState(false)
  const [showDM, setShowDM] = useState(false)
  const [saved, setSaved] = useState(false)

  // 🔊 Load sound preference
  useEffect(() => {
    const pref = localStorage.getItem("hyprr-reel-sound")
    if (pref === "on") setMuted(false)
  }, [])

  // 💾 Load save state
  useEffect(() => {
    if (!activeReel) return
    const raw = localStorage.getItem(SAVE_KEY)
    const list = raw ? JSON.parse(raw) : []
    setSaved(list.includes(activeReel.id))
  }, [activeReel])

  // ▶️ Force play when reel opens
  useEffect(() => {
    if (!activeReel || !videoRef.current) return

    const v = videoRef.current
    v.muted = muted
    v.currentTime = 0

    const tryPlay = async () => {
      try {
        await v.play()
        setReady(true)
      } catch {
        setTimeout(() => {
          v.play().catch(() => {})
        }, 300)
      }
    }

    tryPlay()
  }, [activeReel, muted])

  if (!activeReel) return null

  function toggleSound() {
    const next = !muted
    setMuted(next)
    localStorage.setItem("hyprr-reel-sound", next ? "off" : "on")

    if (videoRef.current) {
      videoRef.current.muted = next
    }
  }

  // 💾 Save Reel
  function toggleSave() {
    const raw = localStorage.getItem(SAVE_KEY)
    let list = raw ? JSON.parse(raw) : []

    if (list.includes(activeReel.id)) {
      list = list.filter(id => id !== activeReel.id)
      setSaved(false)
    } else {
      list.push(activeReel.id)
      setSaved(true)
    }

    localStorage.setItem(SAVE_KEY, JSON.stringify(list))
  }

  // 🕒 LONG PRESS = 2× SPEED
  function startPress() {
    holdTimer.current = setTimeout(() => {
      setHolding(true)
      if (videoRef.current) {
        videoRef.current.playbackRate = 2
      }
    }, 1200)
  }

  function endPress() {
    clearTimeout(holdTimer.current)
    holdTimer.current = null

    if (videoRef.current) {
      videoRef.current.playbackRate = 1
    }

    setHolding(false)
  }

  function shareUrl() {
  const url = `${window.location.origin}/reels?id=${activeReel.id}`
  navigator.clipboard.writeText(url)
  alert("Link copied")
}


  return (
    <div className="fixed inset-0 z-[999] bg-black flex items-center justify-center">
      <div
        className="relative h-full w-full"
        onMouseDown={startPress}
        onMouseUp={endPress}
        onMouseLeave={endPress}
        onTouchStart={startPress}
        onTouchEnd={endPress}
      >
        {/* LOADING / ERROR */}
        {!ready && !error && (
          <div className="absolute inset-0 flex items-center justify-center text-white z-40">
            Loading node...
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-40 gap-3">
            <p>Node failed to load</p>
            <button
              onClick={() => {
                setError(false)
                setReady(false)
                videoRef.current?.play().catch(() => {})
              }}
              className="px-4 py-2 rounded-full bg-white text-black text-sm font-semibold"
            >
              Retry
            </button>
          </div>
        )}

        <video
          ref={videoRef}
          src={activeReel.mediaUrl}
          autoPlay
          loop
          playsInline
          muted={muted}
          onLoadedData={() => setReady(true)}
          onError={() => setError(true)}
          className="h-full w-full object-contain bg-black"
        />

        {/* TOP BAR */}
        <div className="absolute top-4 left-0 right-0 flex justify-between px-4 text-white z-50">
          <button
            onClick={closeReel}
            className="p-2 rounded-full bg-black/60 hover:bg-black/80 transition"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="flex gap-2">
            {/* DM */}
            <button
              onClick={() => setShowDM(true)}
              className="p-2 rounded-full bg-black/60 hover:bg-black/80 transition active:scale-90"
              title="Send to DM"
            >
              <Send className="h-5 w-5" />
            </button>

            {/* SHARE */}
            <button onClick={shareUrl}

              className="p-2 rounded-full bg-black/60 hover:bg-black/80 transition active:scale-90"
              title="Share"
            >
              <Share2 className="h-5 w-5" />
            </button>

            {/* SAVE */}
            <button
              onClick={toggleSave}
              className="p-2 rounded-full bg-black/60 hover:bg-black/80 transition active:scale-90"
              title="Save"
            >
              {saved ? (
                <BookmarkCheck className="h-5 w-5 text-yellow-400" />
              ) : (
                <Bookmark className="h-5 w-5" />
              )}
            </button>

            {/* SOUND */}
            <button
              onClick={toggleSound}
              className="p-2 rounded-full bg-black/60 hover:bg-black/80 transition"
            >
              {muted ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* CAPTION + SOUND */}
        <div className="absolute bottom-10 left-4 right-4 z-40 space-y-2 text-white">
          <p className="font-semibold">{activeReel.username}</p>
          <p className="text-sm opacity-90">
            {activeReel.caption}
          </p>

          <SoundChip sound={activeReel.sound} />

          <button
            onClick={() =>
              window.location.href = `/sound/${activeReel.sound || `original_${activeReel.username}`}`
            }
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 text-xs hover:bg-black/80 transition"
          >
            🎵 Original Sound - {activeReel.username}
          </button>
        </div>

        {/* SPEED INDICATOR */}
        {holding && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-40">
            <div className="px-4 py-2 rounded-full bg-black/70 text-white text-sm font-semibold">
              2× Speed
            </div>
          </div>
        )}
      </div>

      {/* SHARE */}
      <ShareSheet
        open={showShare}
        onClose={() => setShowShare(false)}
        post={activeReel}
      />

      {/* DM */}
      <DMShareModal
        open={showDM}
        onClose={() => setShowDM(false)}
        post={activeReel}
        currentUser="arpit"
      />
    </div>
  )
}
