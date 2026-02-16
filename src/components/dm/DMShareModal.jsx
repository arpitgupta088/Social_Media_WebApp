"use client"

import { useEffect, useState } from "react"
import { X, Send, Search } from "lucide-react"
import { sendDMShare } from "@/services/dm.service"

const DEMO_FOLLOWERS = [
  { username: "rahul_dev", name: "Rahul" },
  { username: "simran.ui", name: "Simran" },
  { username: "alex.codes", name: "Alex" },
  { username: "maria.design", name: "Maria" }
]

export default function DMShareModal({ open, onClose, post, currentUser }) {
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState([])
  const [sending, setSending] = useState(false)

  useEffect(() => {
    if (!open) {
      setQuery("")
      setSelected([])
    }
  }, [open])

  if (!open || !post) return null

  const filtered = DEMO_FOLLOWERS.filter((u) =>
    u.username.toLowerCase().includes(query.toLowerCase())
  )

  function toggleUser(username) {
    setSelected((prev) =>
      prev.includes(username)
        ? prev.filter((u) => u !== username)
        : [...prev, username]
    )
  }

  async function handleSend() {
    setSending(true)

    selected.forEach((user) => {
      sendDMShare({
        from: currentUser,
        to: user,
        post
      })
    })

    setTimeout(() => {
      setSending(false)
      onClose()
      alert(`Sent to ${selected.length} people`)
    }, 400)
  }

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/40 flex items-end"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full rounded-t-2xl bg-background p-4 animate-slideUp"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <p className="font-semibold text-sm">Send to</p>
          <button onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 mb-3 bg-muted rounded-lg px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search followers..."
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>

        {/* Users */}
        <div className="max-h-60 overflow-y-auto space-y-2">
          {filtered.map((u) => (
            <button
              key={u.username}
              onClick={() => toggleUser(u.username)}
              className={`
                w-full flex items-center justify-between px-3 py-2 rounded-lg
                transition
                ${
                  selected.includes(u.username)
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }
              `}
            >
              <div className="text-left">
                <p className="text-sm font-semibold">{u.username}</p>
                <p className="text-xs opacity-80">{u.name}</p>
              </div>
              {selected.includes(u.username) && <Send className="h-4 w-4" />}
            </button>
          ))}
        </div>

        {/* Send Button */}
        <button
          disabled={!selected.length || sending}
          onClick={handleSend}
          className="
            w-full mt-4
            px-4 py-2
            rounded-full
            bg-primary
            text-primary-foreground
            font-semibold
            transition
            disabled:opacity-50
          "
        >
          {sending ? "Sending..." : `Send (${selected.length})`}
        </button>
      </div>
    </div>
  )
}
