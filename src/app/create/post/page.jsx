"use client"

import { useState } from "react"
import { Image, X } from "lucide-react"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
// import { addPost } from "@hyprr/lib/post-store"
import { addMedia } from "@hyprr/lib/media-store"



export default function CreatePostPage() {
  const [preview, setPreview] = useState(null)
  const [caption, setCaption] = useState("")
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


  return (
    <div className="mx-auto max-w-md p-4 space-y-4">
      <div className="flex items-center gap-2">
        <button
          onClick={() => router.back()}
          className="rounded-lg p-2 hover:bg-muted transition"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-semibold">Create Post</h1>
      </div>

      <h1 className="text-lg font-semibold">Create Post</h1>

      {/* Upload Box */}
      <label className="flex h-60 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed bg-muted/40 hover:bg-muted transition">
        {preview ? (
          <img
            src={preview}
            alt="preview"
            className="h-full w-full rounded-2xl object-cover"
          />
        ) : (
          <>
            <Image className="mb-2" />
            <span className="text-sm text-muted-foreground">
              Click to upload image
            </span>
          </>
        )}
        <input type="file" hidden accept="image/*" onChange={handleFile} />
      </label>

      {/* Caption */}
      <textarea
        placeholder="Write a caption..."
        className="w-full rounded-xl border bg-background p-3 text-sm focus:outline-none"
        rows={3}
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />

      {/* Actions */}
      <div className="flex gap-2">
        <button className="flex-1 rounded-xl border py-2 text-sm hover:bg-muted">
          Save Draft
        </button>
        <button
          onClick={() => {
            if (!preview) return

            addMedia({
              username: "arpit_gupta",
              avatar: "/avatars/avatar1.jpg",
              caption,
              link: "",
              mediaType: "image",
              mediaUrl: preview,
              isReel: false,
              isStory: false
            })


            router.push("/feed")
          }}
          className="flex-1 rounded-xl bg-primary py-2 text-sm text-white hover:opacity-90"
        >
          Post
        </button>


      </div>
    </div>
  )
}
