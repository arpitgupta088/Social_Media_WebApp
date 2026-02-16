"use client"

import { useState, useRef, useEffect } from "react"
import { Film, ArrowLeft, Sparkles, Crop } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { addMedia } from "@hyprr/lib/media-store"
import { saveMediaFile } from "@hyprr/lib/media-db"
import ReelEditor from "@hyprr/components/reel-editor/ReelEditor"
import { Scissors } from "lucide-react"
import { useSearchParams } from "next/navigation"

// ---------------- PRESETS ----------------
const FILTERS = [
  { name: "Normal", class: "" },
  { name: "Warm", class: "sepia-[.25] saturate-[1.4]" },
  { name: "Cool", class: "hue-rotate-[180deg] saturate-[1.2]" },
  { name: "B&W", class: "grayscale" },
  { name: "Vintage", class: "sepia saturate-[1.2] contrast-[1.1]" }
]

const CROP_RATIOS = [
  { label: "9:16", value: "9/16" },
  { label: "1:1", value: "1/1" },
  { label: "Free", value: "auto" }
]

export default function CreateReelPage() {
  const [video, setVideo] = useState(null)
  const [caption, setCaption] = useState("")
  const [link, setLink] = useState("")
  const searchParams = useSearchParams()
const sound = searchParams.get("sound") || "original_arpit_gupta"

  const [activePanel, setActivePanel] = useState(null)
  const [filter, setFilter] = useState("")
  const [ratio, setRatio] = useState("9/16")
  const [trim, setTrim] = useState({ start: 0, end: null })

  const router = useRouter()
  const videoRef = useRef(null)

  // ---------------- FILE PICK ----------------
  const handleFile = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const id = crypto.randomUUID()
    await saveMediaFile(id, file)

    const preview = URL.createObjectURL(file)

    setVideo({
      id,
      preview
    })
  }

  // ---------------- CLEANUP ----------------
  useEffect(() => {
    return () => {
      if (video?.preview) {
        URL.revokeObjectURL(video.preview)
      }
    }
  }, [video])

  // ---------------- PUBLISH ----------------
  const publishReel = () => {
    if (!video) return

    addMedia({
      username: "arpit_gupta",
      avatar: "/avatars/avatar1.jpg",
      caption,
      link,
      mediaType: "video",
      mediaId: video.id,
      mediaUrl: video.preview,
      isReel: true,
      isStory: false,
      trim,
      filter,
      cropRatio: ratio,
      time: "Just now",
      sound
    })

    router.push("/feed")
  }

  return (
    <div className="min-h-screen bg-background">

      {/* HEADER */}
      <div className="sticky top-0 z-30 flex items-center gap-2 px-4 py-3 border-b bg-background/80 backdrop-blur">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-muted transition"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-sm font-semibold">Node Editor</h1>
      </div>

      {/* PREVIEW / EDITOR */}
      <div className="relative px-4 pt-4">
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="relative mx-auto w-full max-w-[360px] overflow-hidden rounded-3xl border bg-black shadow-xl"
          style={{ aspectRatio: ratio }}
        >
          {!video && (
            <label className="flex h-full cursor-pointer flex-col items-center justify-center text-white">
              <Film className="mb-2" />
              <span className="text-sm opacity-70">
                Upload vertical video
              </span>
              <input type="file" hidden accept="video/*" onChange={handleFile} />
            </label>
          )}

          {video && (
            <>
              <video
                ref={videoRef}
                src={video.preview}
                autoPlay
                muted
                playsInline
                className={`h-full w-full object-cover transition-all duration-500 ${filter}`}
                onLoadedMetadata={(e) => {
                  const v = e.currentTarget
                  if (trim?.start) {
                    v.currentTime = trim.start
                  }
                }}
                onTimeUpdate={(e) => {
                  const v = e.currentTarget
                  if (trim?.end && v.currentTime >= trim.end) {
                    v.currentTime = trim.start || 0
                    v.play()
                  }
                }}
              />

              {/* TRIM EDITOR OVERLAY */}
              <ReelEditor
                video={video}
                onChange={(data) => setTrim(data)}
              />
            </>
          )}
        </motion.div>
      </div>

      {/* TOOLBAR */}
      {video && (
        <div className="fixed bottom-0 left-0 right-0 z-30">
          <div className="mx-auto max-w-md rounded-t-3xl bg-background/90 backdrop-blur border-t shadow-xl px-6 py-4">
            <div className="flex justify-around">
              <Tool
                icon={Sparkles}
                label="Filters"
                onClick={() =>
                  setActivePanel(activePanel === "filter" ? null : "filter")
                }
              />
              <Tool
                icon={Crop}
                label="Crop"
                onClick={() =>
                  setActivePanel(activePanel === "crop" ? null : "crop")
                }
              />
              <Tool
                icon={Scissors}
                label="Trim"
                onClick={() =>
                  setActivePanel(activePanel === "trim" ? null : "trim")
                }
              />

            </div>
          </div>
        </div>
      )}

      {/* FILTER PANEL */}
      <SlidePanel show={activePanel === "filter"}>
        <h3 className="font-semibold mb-3">Filters</h3>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {FILTERS.map((f) => (
            <button
              key={f.name}
              onClick={() => setFilter(f.class)}
              className="min-w-[80px] rounded-xl border px-3 py-2 text-sm hover:bg-muted transition"
            >
              {f.name}
            </button>
          ))}
        </div>
      </SlidePanel>

      {/* CROP PANEL */}
      <SlidePanel show={activePanel === "crop"}>
        <h3 className="font-semibold mb-3">Crop Ratio</h3>
        <div className="flex gap-3">
          {CROP_RATIOS.map((r) => (
            <button
              key={r.label}
              onClick={() => setRatio(r.value)}
              className="flex-1 rounded-xl border px-3 py-2 text-sm hover:bg-muted transition"
            >
              {r.label}
            </button>
          ))}
        </div>
      </SlidePanel>

      {/* TRIM PANEL */}
      <SlidePanel show={activePanel === "trim"}>
        <h3 className="font-semibold mb-3">Trim Video</h3>
        <ReelEditor
          video={video}
          onChange={(data) => setTrim(data)}
        />
      </SlidePanel>


      {/* CAPTION */}
      <div className="px-4 mt-6">
        <textarea
          placeholder="Write a reel caption..."
          className="w-full rounded-xl border bg-background p-3 text-sm focus:outline-none"
          rows={2}
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
      </div>

      {/* LINK */}
      <div className="px-4 mt-3">
        <input
          type="url"
          placeholder="Add link (optional)"
          className="w-full rounded-xl border bg-background p-3 text-sm focus:outline-none"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </div>

      {/* PUBLISH */}
      <div className="px-4 mt-6 pb-32">
        <button
          onClick={publishReel}
          disabled={!video}
          className="w-full rounded-2xl bg-primary py-3 text-sm font-semibold text-white hover:scale-[1.02] transition disabled:opacity-40"
        >
          Publish Reel
        </button>
      </div>
    </div>
  )
}

/* ---------------- UI COMPONENTS ---------------- */

function Tool({ icon: Icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1 text-xs hover:text-primary transition"
    >
      <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center hover:scale-110 transition">
        <Icon size={20} />
      </div>
      {label}
    </button>
  )
}

function SlidePanel({ show, children }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 200, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="fixed bottom-20 left-0 right-0 z-40 mx-auto max-w-md bg-background rounded-t-3xl border shadow-xl px-6 py-4"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
