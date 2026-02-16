"use client"

import { ExternalLink } from "lucide-react"

export default function ProfileLinks({ links = [] }) {
  if (!links.length) return null

  return (
    <div className="mb-3 space-y-2">
      {links.map(link => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex
            items-center
            justify-between
            px-4
            py-2
            rounded-xl
            bg-muted
            hover:bg-muted/80
            transition
          "
        >
          <span className="text-sm font-medium">
            {link.label || "Link"}
          </span>
          <ExternalLink className="h-4 w-4 opacity-70" />
        </a>
      ))}
    </div>
  )
}
