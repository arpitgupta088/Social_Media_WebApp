"use client"

import { Check, CheckCheck } from "lucide-react"

export default function MessageBubble({ message, prevFrom }) {
  const isMe = message.from === "me"
  const isGrouped = prevFrom === message.from

  const statusIcon = () => {
    if (!isMe) return null
    if (message.status === "sent") return <Check size={12} />
    if (message.status === "delivered") return <CheckCheck size={12} />
    if (message.status === "seen")
      return <CheckCheck size={12} className="text-blue-500" />
  }

  return (
    <div
      className={`
        flex
        ${isMe ? "justify-end" : "justify-start"}
      `}
    >
      <div
        className={`
          max-w-[70%]
          px-3
          py-2
          text-[14px]
          leading-snug
          transition-all
          duration-200
          animate-slideUp
          shadow-sm

          ${isMe
            ? `
              bg-gradient-to-br
              from-indigo-500
              to-blue-500
              text-white
              ${isGrouped ? "rounded-2xl rounded-tr-sm" : "rounded-2xl rounded-br-sm"}
            `
            : `
              bg-muted
              text-foreground
              ${isGrouped ? "rounded-2xl rounded-tl-sm" : "rounded-2xl rounded-bl-sm"}
            `
          }
        `}
      >
        <div>{message.text}</div>

        {isMe && (
          <div className="flex justify-end mt-1 text-[10px] opacity-70">
            {statusIcon()}
          </div>
        )}
      </div>
    </div>
  )
}
