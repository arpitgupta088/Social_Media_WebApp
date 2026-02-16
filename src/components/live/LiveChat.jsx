"use client"

import { useEffect, useState } from "react"
import { subscribeChat } from "@/services/live.service"

export default function LiveChat() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const unsub = subscribeChat(setMessages)
    return () => unsub()
  }, [])

  return (
    <div className="max-h-40 overflow-y-auto p-2 text-white text-xs space-y-1">
      {messages.map(m => (
        <div key={m.id}>
          <span className="font-semibold">{m.user}: </span>
          {m.text}
        </div>
      ))}
    </div>
  )
}
