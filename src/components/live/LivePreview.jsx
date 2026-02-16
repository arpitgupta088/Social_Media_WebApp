"use client"

import { Button } from "@/components/ui/button"

export default function LivePreview({ viewers, onJoin, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col justify-between">
      <div className="p-4 text-white flex justify-between">
        <span>🔴 Live Preview</span>
        <button onClick={onClose}>✕</button>
      </div>

      <div className="flex-1 flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-lg mb-2">Creator is Live</p>
          <p className="text-sm opacity-70">
            {viewers} people watching
          </p>
        </div>
      </div>

      <div className="p-4">
        <Button className="w-full" onClick={onJoin}>
          Join Live
        </Button>
      </div>
    </div>
  )
}
