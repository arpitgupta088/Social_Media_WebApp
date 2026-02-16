"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { subscribeViewers, subscribeChat, sendChatMessage } from "@/services/live.service"
import LiveChat from "./LiveChat"
import { stopLive } from "@/services/live.service"

export default function LivePlayer({ onExit }) {
  const [viewers, setViewers] = useState(0)
  const [input, setInput] = useState("")

  useEffect(() => {
    const unsubV = subscribeViewers(data => {
      setViewers(data.viewers)
    })
    return () => unsubV()
  }, [])

  function send() {
    if (!input.trim()) return
    sendChatMessage(input)
    setInput("")
  }

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      <div className="p-3 flex justify-between text-white">
        <span>🔴 LIVE · {viewers} watching</span>
        <button
          onClick={() => {
            stopLive()
            onExit()
          }}
        >
          ✕
        </button>

      </div>

      <div className="flex-1 flex items-center justify-center text-white">
        <p className="opacity-60">Live Video Stream</p>
      </div>

      <LiveChat />

      <div className="p-2 flex gap-2">
        <input
          className="flex-1 rounded-md px-3 py-2 text-sm"
          placeholder="Say something..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <Button size="sm" onClick={send}>
          Send
        </Button>
      </div>
    </div>
  )
}
