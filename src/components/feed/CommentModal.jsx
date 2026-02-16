"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { getComments, addComment } from "@hyprr/lib/post-store"

export default function CommentModal({ postId, onClose, currentUser }) {
  const [comments, setComments] = useState([])
  const [text, setText] = useState("")

  useEffect(() => {
    setComments(getComments(postId))
  }, [postId])

  const handleAdd = () => {
    if (!text.trim()) return

    const newComment = {
      id: Date.now(),
      user: currentUser,
      text,
    }

    const updated = addComment(postId, newComment)
    setComments([...updated])
    setText("")
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end">
      <div className="bg-background w-full rounded-t-xl p-4 max-h-[70vh] flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold">Comments</h2>
          <button onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto space-y-2 text-sm">
          {comments.length === 0 && (
            <p className="text-muted-foreground text-center">
              No comments yet
            </p>
          )}

          {comments.map((c) => (
            <div key={c.id}>
              <span className="font-semibold">{c.user}</span>{" "}
              <span>{c.text}</span>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex gap-2 pt-3 border-t">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 px-3 py-2 rounded-md bg-muted outline-none"
          />
          <button
            onClick={handleAdd}
            className="text-primary font-semibold"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  )
}
