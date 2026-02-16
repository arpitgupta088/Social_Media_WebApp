"use client"

import { useEffect, useState } from "react"

export default function TrimControl({ videoRef, trim, setTrim }) {
  const [duration, setDuration] = useState(15)

  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return

    const loadMeta = () => {
      setDuration(Math.floor(vid.duration || 15))
      setTrim({
        start: 0,
        end: Math.min(15, Math.floor(vid.duration || 15))
      })
    }

    vid.addEventListener("loadedmetadata", loadMeta)
    return () => vid.removeEventListener("loadedmetadata", loadMeta)
  }, [videoRef, setTrim])

  return (
    <div className="space-y-2">

      <div className="text-sm font-semibold">
        Trim Reel
      </div>

      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Start: {trim.start}s</span>
        <span>End: {trim.end}s</span>
      </div>

      <input
        type="range"
        min="0"
        max={duration - 1}
        value={trim.start}
        onChange={(e) =>
          setTrim(prev => ({
            ...prev,
            start: Number(e.target.value)
          }))
        }
        className="w-full"
      />

      <input
        type="range"
        min={trim.start + 1}
        max={duration}
        value={trim.end}
        onChange={(e) =>
          setTrim(prev => ({
            ...prev,
            end: Number(e.target.value)
          }))
        }
        className="w-full"
      />
    </div>
  )
}
