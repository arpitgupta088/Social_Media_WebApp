"use client"

import { useEffect } from "react"

export default function PreviewPlayer({ video, videoRef, trim }) {
  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return

    const loopTrim = () => {
      if (vid.currentTime >= trim.end) {
        vid.currentTime = trim.start
        vid.play()
      }
    }

    vid.addEventListener("timeupdate", loopTrim)
    return () => vid.removeEventListener("timeupdate", loopTrim)
  }, [trim, videoRef])

  return (
    <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl border bg-black">
      <video
        ref={videoRef}
        src={video.preview}
        autoPlay
        muted
        playsInline
        className="h-full w-full object-cover"
      />
    </div>
  )
}

