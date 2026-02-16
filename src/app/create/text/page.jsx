"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"


export default function CreateTextPage() {
  const [text, setText] = useState("")
  const router = useRouter()


  return (

    <div className="mx-auto max-w-md p-4 space-y-4">
        <div className="flex items-center gap-2">
  <button
    onClick={() => router.back()}
   className="rounded-lg p-2 hover:bg-muted active:scale-95 transition"

  >
    <ArrowLeft size={20} />
  </button>
  <h1 className="text-lg font-semibold">Write Text</h1>
</div>

      <h1 className="text-lg font-semibold">Write Text</h1>

      <div className="rounded-2xl border p-3">
        <textarea
          placeholder="What's on your mind?"
          className="w-full resize-none bg-background text-sm focus:outline-none"
          rows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>{text.length}/280</span>
          <span>Public</span>
        </div>
      </div>

      <button
        disabled={!text.trim()}
        className="w-full rounded-xl bg-secondary py-2 text-sm text-white disabled:opacity-50"
      >
        Publish
      </button>
    </div>
  )
}
