"use client"

import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { getStories } from "@hyprr/lib/story-data"
import {
  hasUserStory,
  getUserStory,
  removeUserStory
} from "@hyprr/lib/story-store"
import StoryViewer from "./StoryViewer"
import { useRouter } from "next/navigation"

export default function StoryBar() {
  const [stories, setStories] = useState([])
  const [activeStory, setActiveStory] = useState(null)
  const router = useRouter()

  const username = "arpit_gupta"

  // Load all stories (demo + user merged from story-data.js)
  useEffect(() => {
    setStories(getStories())
  }, [])

  const userHasStory = hasUserStory(username)
  const myStory = getUserStory(username)

  const refreshStories = () => {
    setStories(getStories())
  }

  const handleDelete = () => {
    if (!confirm("Remove your story?")) return
    removeUserStory(username)
    refreshStories()
  }

  return (
    <>
      <div className="flex gap-4 px-4 py-3 overflow-x-auto border-b bg-background sticky top-[38px] z-20">

        {/* YOUR STORY */}
        <div
          onClick={() =>
            userHasStory
              ? setActiveStory(myStory)
              : router.push("/create/story")
          }
          onMouseDown={() => {
            if (!userHasStory) return
            window.__storyTimer = setTimeout(() => {
              handleDelete()
            }, 600)
          }}
          onMouseUp={() => {
            clearTimeout(window.__storyTimer)
          }}
          onTouchStart={() => {
            if (!userHasStory) return
            window.__storyTimer = setTimeout(() => {
              handleDelete()
            }, 600)
          }}
          onTouchEnd={() => {
            clearTimeout(window.__storyTimer)
          }}
          className="flex flex-col items-center min-w-[64px] cursor-pointer group"
        >

          <div
            className={`
              relative
              p-[2px]
              rounded-full
              transition-all
              duration-200
              ${userHasStory
                ? "bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500"
                : "bg-muted"
              }
            `}
          >
            <img
              src="/avatars/avatar1.jpg"
              className="h-14 w-14 rounded-full border-2 border-background object-cover"
            />

            {/* PLUS BUTTON — ALWAYS VISIBLE */}
            <div
              onClick={(e) => {
                e.stopPropagation()
                router.push("/create/story")
              }}
              className="
                absolute
                -bottom-1
                -right-1
                h-5
                w-5
                rounded-full
                bg-primary
                flex
                items-center
                justify-center
                text-white
                shadow
                hover:scale-110
                transition
              "
            >
              <Plus size={12} />
            </div>
          </div>

          <span className="text-xs truncate w-16 text-center">
            Your story
          </span>
        </div>

        {/* OTHER STORIES */}
        {stories
          .filter((s) => s.username !== username)
          .map((story) => (
            <div
              key={story.id}
              onClick={() => setActiveStory(story)}
              className="flex flex-col items-center min-w-[64px] cursor-pointer group transition hover:scale-110 active:scale-95"
            >
              <div className="p-[2px] rounded-full bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500">
                <img
                  src={story.avatar}
                  className="h-14 w-14 rounded-full border-2 border-background object-cover"
                />
              </div>

              <span className="text-xs truncate w-16 text-center">
                {story.username}
              </span>
            </div>
          ))}
      </div>

      {activeStory && (
        <StoryViewer
          story={activeStory}
          onClose={() => setActiveStory(null)}
        />
      )}
    </>
  )
}
