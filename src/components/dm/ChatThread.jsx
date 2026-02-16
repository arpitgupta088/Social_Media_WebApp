"use client"

import { useEffect, useRef, useState } from "react"
import { Send, Image, Smile } from "lucide-react"
import MessageBubble from "./MessageBubble"
import DMHeader from "./DMHeader"
import { getSocket } from "@/lib/socket"
import { getThread } from "@/services/dm.service"
import { getMessages, sendMessage, markConversationRead } from "@/services/chat.service"
import { getSharedInThread } from "@/services/dm.service"


export default function ChatThread({ username, sharedProfile }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [typing, setTyping] = useState(false)
const socketRef = useRef(null)
  const containerRef = useRef(null)
  const bottomRef = useRef(null)
  const shouldAutoScroll = useRef(true)
  const firstLoad = useRef(true)
  const typingTimeout = useRef(null)

  // 🔥 SHARE LINK AUTO INSERT
  useEffect(() => {
    if (sharedProfile) {
      setInput(sharedProfile)
    }
  }, [sharedProfile])

  // Load thread
  useEffect(() => {
  async function load() {
    let apiMsgs = []

    try {
      apiMsgs = await getMessages(username)
    } catch {}
    
    const demo = await getThread(username)
    const shares = getSharedInThread(username)

    let final = []

    if (apiMsgs && apiMsgs.length > 0) {
      final = apiMsgs.map((m) => ({
        id: m.id,
        from: m.sender?.username === username ? username : "me",
        text: m.content,
        time: "",
        status: m.isRead ? "seen" : "delivered"
      }))
    } else {
      final = demo
    }

  
    // merge shared posts
    const shareMsgs = shares.map((s) => ({
      id: s.id,
      from: s.from === username ? username : "me",
      text: `🔗 shared post`,
      time: "",
      status: "seen"
    }))

    setMessages([...final, ...shareMsgs])

    markConversationRead(username)
  }

  load()
}, [username])


  //socket listeners
  useEffect(() => {
    if (!socketRef.current) {
  socketRef.current = getSocket()
}
const socket = socketRef.current


    socket.on("new_message", (msg) => {
      if (msg.sender?.username !== username) return

      setMessages((prev) => [
        ...prev,
        {
          id: msg.id,
          from: username,
          text: msg.content,
          time: "",
          status: "delivered"
        }
      ])
    })

    socket.on("user_typing", (d) => {
      if (d.username === username) setTyping(true)
    })

    socket.on("user_stop_typing", (d) => {
      if (d.username === username) setTyping(false)
    })

    return () => {
  socket.off("new_message")
  socket.off("user_typing")
  socket.off("user_stop_typing")
}

  }, [username])


  // Detect scroll position
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onScroll = () => {
      const nearBottom =
        el.scrollHeight - el.scrollTop - el.clientHeight < 40

      shouldAutoScroll.current = nearBottom
    }

    el.addEventListener("scroll", onScroll)
    return () => el.removeEventListener("scroll", onScroll)
  }, [])

  // Smart auto-scroll
  useEffect(() => {
    if (!bottomRef.current) return

    if (firstLoad.current) {
      firstLoad.current = false
      return
    }

    if (shouldAutoScroll.current) {
      bottomRef.current.scrollIntoView({
        behavior: "smooth",
      })
    }
  }, [messages])


  // typing indicator


  const handleTyping = (e) => {
  setInput(e.target.value)

  if (!socketRef.current) return

  socketRef.current.emit("typing", { receiverId: username })

  clearTimeout(typingTimeout.current)
  typingTimeout.current = setTimeout(() => {
    socketRef.current.emit("stop_typing", { receiverId: username })
  }, 1200)
}

// FAKE DEMO typing
useEffect(() => {
  if (!username) return

  const timer = setInterval(() => {
    setTyping(true)

    setTimeout(() => {
      setTyping(false)
    }, 1200)
  }, 3000)

  return () => clearInterval(timer)
}, [username])



  // Send message
 const send = async () => {
  if (!input.trim()) return

  const tempId = Date.now()

  const optimistic = {
    id: tempId,
    from: "me",
    text: input,
    time: "",
    status: "sending"
  }

  setMessages((p) => [...p, optimistic])
  setInput("")

  const res = await sendMessage(username, optimistic.text)
  if (socketRef.current) {
  socketRef.current.emit("send_message", {
    receiverId: username,
    content: optimistic.text
  })
}



  if (!res) return

  setMessages((p) =>
    p.map((m) =>
      m.id === tempId
        ? { ...m, id: res.id, status: "seen" }
        : m
    )
  )
}


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <DMHeader username={username} />

      {/* THREAD */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto px-4 py-3 space-y-1"
      >
        {messages.map((m, i) => (
          <MessageBubble
            key={`${m.id}-${i}`}
            message={m}
            prevFrom={messages[i - 1]?.from}
          />
        ))}

        {typing && (
          <div className="text-xs text-muted-foreground px-2 animate-pulse">
            {username} is typing...
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* INPUT BAR */}
      <div className="sticky bottom-0 bg-background/95 backdrop-blur border-t px-3 py-2">
        <div className="flex items-center gap-2 rounded-full border bg-background px-3 py-1.5">
          <button className="p-1 text-muted-foreground hover:text-foreground transition">
            <Image size={18} />
          </button>

          <input
            value={input}
            onChange={handleTyping}
            placeholder="Message..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />

          <button className="p-1 text-muted-foreground hover:text-foreground transition">
            <Smile size={18} />
          </button>

          <button
            onClick={send}
            className="ml-1 rounded-full bg-primary px-3 py-1.5 text-white active:scale-95 transition"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
