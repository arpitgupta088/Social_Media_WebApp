"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Image, Film, Type, X } from "lucide-react"

export default function CreateModal({ open, onClose }) {
  const router = useRouter()

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [onClose])

  if (!open) return null

  const go = (path) => {
    onClose()
    router.push(path)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="relative w-full max-w-md animate-slideUp rounded-t-2xl border bg-background p-4 shadow-2xl">
        {/* Handle */}
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-muted" />

        <h2 className="mb-4 text-center text-sm font-medium text-muted-foreground">
          Create
        </h2>

        <div className="space-y-3">
          <CreateButton
            icon={Image}
            label="Create Post"
            onClick={() => go("/create/post")}
          />
          <CreateButton
            icon={Film}
            label="Create Node"
            onClick={() => go("/create/reel")}
          />
          <CreateButton
            icon={Type}
            label="Write Text"
            onClick={() => go("/create/text")}
          />
        </div>

        <button
          onClick={onClose}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border py-2 text-sm text-muted-foreground transition hover:bg-muted"
        >
          <X size={16} />
          Cancel
        </button>
      </div>
    </div>
  )
}

function CreateButton({ icon: Icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-xl border px-4 py-3 transition hover:scale-[1.02] hover:bg-muted active:scale-[0.98]"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon size={18} />
      </div>
      <span className="text-sm font-medium">{label}</span>
    </button>
  )
}
