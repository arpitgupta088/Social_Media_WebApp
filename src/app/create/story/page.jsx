"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Image,
  Music,
  Type,
  Sparkles,
  AtSign,
  Users,
  Eye
} from "lucide-react"
import { useRouter } from "next/navigation"
import { addUserStory } from "@hyprr/lib/story-store"
import { motion, AnimatePresence } from "framer-motion"

const FILTERS = {
  None: "",
  Warm: "sepia(0.25) saturate(1.4)",
  Cool: "hue-rotate(180deg) saturate(1.2)",
  "B&W": "grayscale(1)",
  Vintage: "contrast(1.2) sepia(0.4)"
}

const FAKE_MUSIC = [
  "Lo-fi Beats",
  "Chill Vibes",
  "Night Drive",
  "Desi Hip Hop",
  "Retro Bollywood"
]

export default function CreateStoryPage() {
  const [preview, setPreview] = useState(null)
  const [audience, setAudience] = useState("public")
  const [filter, setFilter] = useState("None")
  const [music, setMusic] = useState(null)
  const [showMusic, setShowMusic] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [mention, setMention] = useState("")

  const router = useRouter()

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const postStory = () => {
    if (!preview) return

    addUserStory({
      id: Date.now(),
      username: "arpit_gupta",
      avatar: "/avatars/avatar1.jpg",
      audience,
      filter,
      music,
      mention,
      views: 0,
      items: [preview]
    })

    router.push("/feed")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 border-b bg-background/80 backdrop-blur">
        <button
          onClick={() => router.back()}
          className="rounded-full p-2 hover:bg-muted transition"
        >
          <ArrowLeft size={20} />
        </button>

        <h1 className="text-sm font-semibold tracking-wide">
          Add Story
        </h1>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Eye size={14} />
          Preview
        </div>
      </div>

      {/* Preview Section */}
      <div className="relative px-4 pt-4">
        <label className="relative flex h-[440px] cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed bg-muted/40 hover:bg-muted transition overflow-hidden">

          {preview ? (
            <>
              <img
                src={preview}
                style={{ filter: FILTERS[filter] }}
                className="h-full w-full object-cover"
              />

              {/* Floating Tools */}
              <div className="absolute top-3 right-3 flex flex-col gap-2">
                <Tool
                  icon={Music}
                  onClick={(e) => {
                    e.preventDefault()
                    setShowMusic(true)
                  }}
                />
                <Tool
                  icon={Sparkles}
                  onClick={(e) => {
                    e.preventDefault()
                    setShowFilters(true)
                  }}
                />
                <Tool
                  icon={AtSign}
                  onClick={(e) => {
                    e.preventDefault()
                    const name = prompt("Mention username:")
                    if (name) setMention(name)
                  }}
                />
                <Tool icon={Type} disabled />
              </div>

              {/* Music Badge */}
              {music && (
                <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur">
                  🎵 {music}
                </div>
              )}

              {/* Mention Badge */}
              {mention && (
                <div className="absolute bottom-3 right-3 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full">
                  @{mention}
                </div>
              )}
            </>
          ) : (
            <>
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Image size={28} />
                <span className="text-sm">
                  Select image for story
                </span>
              </div>
            </>
          )}

          <input
            hidden
            type="file"
            accept="image/*"
            onChange={handleFile}
          />
        </label>
      </div>

      {/* Audience Selector */}
      <div className="flex gap-3 px-4 mt-4">
        <button
          onClick={() => setAudience("public")}
          className={`flex-1 py-2 rounded-xl text-sm font-semibold transition
            ${
              audience === "public"
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/70"
            }
          `}
        >
          Your Story
        </button>

        <button
          onClick={() => setAudience("close")}
          className={`flex-1 py-2 rounded-xl text-sm font-semibold transition flex items-center justify-center gap-2
            ${
              audience === "close"
                ? "bg-green-500 text-white"
                : "bg-muted hover:bg-muted/70"
            }
          `}
        >
          <Users size={16} />
          Close Friends
        </button>
      </div>

      {/* Post Button */}
      <div className="px-4 mt-6">
        <button
          disabled={!preview}
          onClick={postStory}
          className={`
            w-full
            rounded-2xl
            py-3
            text-sm
            font-semibold
            transition-all
            ${
              preview
                ? "bg-primary text-primary-foreground hover:scale-[1.02]"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }
          `}
        >
          Add to Story
        </button>
      </div>

      {/* MUSIC MODAL */}
      <AnimatePresence>
        {showMusic && (
          <Modal onClose={() => setShowMusic(false)}>
            <h2 className="text-sm font-semibold mb-3">
              Pick Music
            </h2>
            <div className="space-y-2">
              {FAKE_MUSIC.map((track) => (
                <button
                  key={track}
                  onClick={() => {
                    setMusic(track)
                    setShowMusic(false)
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg bg-muted hover:bg-muted/70 transition"
                >
                  🎵 {track}
                </button>
              ))}
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* FILTER MODAL */}
      <AnimatePresence>
        {showFilters && (
          <Modal onClose={() => setShowFilters(false)}>
            <h2 className="text-sm font-semibold mb-3">
              Filters
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {Object.keys(FILTERS).map((f) => (
                <button
                  key={f}
                  onClick={() => {
                    setFilter(f)
                    setShowFilters(false)
                  }}
                  className={`
                    px-3 py-2 rounded-lg text-sm transition
                    ${
                      filter === f
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted hover:bg-muted/70"
                    }
                  `}
                >
                  {f}
                </button>
              ))}
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  )
}

function Tool({ icon: Icon, onClick, disabled }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="
        h-9 w-9
        rounded-full
        bg-black/60
        text-white
        flex
        items-center
        justify-center
        backdrop-blur
        hover:scale-110
        transition
        shadow-lg
        disabled:opacity-50
      "
    >
      <Icon size={16} />
    </button>
  )
}

function Modal({ children, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[999] bg-black/50 flex items-end justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 200 }}
        animate={{ y: 0 }}
        exit={{ y: 200 }}
        transition={{ type: "spring", stiffness: 200 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-t-2xl bg-background p-4"
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
