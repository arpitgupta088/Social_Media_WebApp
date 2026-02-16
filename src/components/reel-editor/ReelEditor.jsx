"use client"

import { useRef, useState } from "react"
import PreviewPlayer from "./PreviewPlayer"
import TrimControl from "./TrimControl"

export default function ReelEditor({ video, onPublish }) {
  const videoRef = useRef(null)

  const [trim, setTrim] = useState({
    start: 0,
    end: 15
  })

  return (
    <div className="space-y-4">

      <PreviewPlayer
        video={video}
        videoRef={videoRef}
        trim={trim}
      />

      <TrimControl
        videoRef={videoRef}
        trim={trim}
        setTrim={setTrim}
      />

      <button
        onClick={() => onPublish(trim)}
        className="w-full rounded-xl bg-primary py-2 text-sm text-white hover:opacity-90"
      >
        Publish Node
      </button>

    </div>
  )
}
