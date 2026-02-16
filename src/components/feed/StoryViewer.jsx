"use client"

import { X, Eye, Send, Users, Music } from "lucide-react"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const FILTERS = {
  None: "",
  Warm: "sepia(0.25) saturate(1.4)",
  Cool: "hue-rotate(180deg) saturate(1.2)",
  "B&W": "grayscale(1)",
  Vintage: "contrast(1.2) sepia(0.4)"
}

const VIEW_KEY = "hyprr_story_views"

function getViews(id) {
  if (typeof window === "undefined") return 0
  const data = JSON.parse(localStorage.getItem(VIEW_KEY)) || {}
  return data[id] || 0
}

function incrementViews(id) {
  if (typeof window === "undefined") return
  const data = JSON.parse(localStorage.getItem(VIEW_KEY)) || {}
  data[id] = (data[id] || 0) + 1
  localStorage.setItem(VIEW_KEY, JSON.stringify(data))
}

export default function StoryViewer({ story, onClose }) {
  const [index, setIndex] = useState(0)
  const [views, setViews] = useState(0)
  const [reply, setReply] = useState("")

  useEffect(() => {
    if (!story?.items?.length) return

    incrementViews(story.id)
    setViews(getViews(story.id))
  }, [story])

  useEffect(() => {
    if (!story?.items?.length) return

    const timer = setTimeout(() => {
      if (index < story.items.length - 1) {
        setIndex((prev) => prev + 1)
      } else {
        onClose()
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [index, story, onClose])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="fixed inset-0 z-[999] bg-black flex items-center justify-center"
      >
        {/* Progress Bars */}
        <div className="absolute top-4 left-4 right-4 flex gap-2 z-40">
          {story.items.map((_, i) => (
            <div
              key={i}
              className="flex-1 h-1 bg-white/30 rounded overflow-hidden"
            >
              <motion.div
                initial={{ width: "0%" }}
                animate={{
                  width:
                    i < index
                      ? "100%"
                      : i === index
                      ? "100%"
                      : "0%"
                }}
                transition={{ duration: 3, ease: "linear" }}
                className="h-full bg-white"
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-12 left-4 right-4 flex items-center justify-between z-40 text-white">
          <div className="flex items-center gap-3">
            <img
              src={story.avatar}
              className="h-9 w-9 rounded-full border border-white/30 object-cover"
            />

            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold">
                {story.username}
              </span>

              {story.audience === "close" && (
                <span className="flex items-center gap-1 text-[10px] text-green-400">
                  <Users size={10} />
                  Close Friends
                </span>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="hover:scale-110 transition"
          >
            <X size={26} />
          </button>
        </div>

        {/* Music Badge */}
        {story.music && (
          <div className="absolute top-24 left-4 z-40 bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur flex items-center gap-2">
            <Music size={12} />
            {story.music}
          </div>
        )}

        {/* Story Image */}
        <motion.img
          key={story.items[index]}
          src={story.items[index]}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.1 }}
          style={{
            filter: FILTERS[story.filter || "None"]
          }}
          className="max-h-full max-w-full object-contain rounded-xl shadow-2xl"
        />

        {/* Footer */}
        <div className="absolute bottom-4 left-4 right-4 z-40 flex items-center gap-3">
          <div className="flex items-center gap-2 text-white text-xs">
            <Eye size={14} />
            {views} views
          </div>

          <div className="flex-1 flex items-center bg-white/10 backdrop-blur rounded-full px-3 py-2">
            <input
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Send reply..."
              className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-white/60"
            />
            <button
              onClick={() => {
                setReply("")
                alert("Reply sent (UI demo)")
              }}
              className="text-white hover:scale-110 transition"
            >
              <Send size={16} />
            </button>
          </div>
        </div>

        {/* Tap Zones */}
        <div
          className="absolute left-0 top-0 h-full w-1/2 z-30"
          onClick={() =>
            setIndex((i) => Math.max(0, i - 1))
          }
        />
        <div
          className="absolute right-0 top-0 h-full w-1/2 z-30"
          onClick={() =>
            index < story.items.length - 1
              ? setIndex((i) => i + 1)
              : onClose()
          }
        />
      </motion.div>
    </AnimatePresence>
  )
}
