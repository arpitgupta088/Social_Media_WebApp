"use client"

export default function UndoSnackbar({ open, onUndo }) {
  if (!open) return null

  return (
    <div className="fixed bottom-16 left-1/2 z-50 -translate-x-1/2">
      <div className="flex items-center gap-4 bg-black text-white px-4 py-2 rounded-full shadow-lg animate-slideUp">
        <span className="text-sm">Post deleted</span>

        <button
          onClick={onUndo}
          className="text-primary font-semibold hover:underline"
        >
          UNDO
        </button>
      </div>
    </div>
  )
}
