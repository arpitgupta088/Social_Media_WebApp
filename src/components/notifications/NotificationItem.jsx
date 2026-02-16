"use client"

import Link from "next/link"

const typeAccent = {
  like: "bg-red-500",
  comment: "bg-blue-500",
  follow: "bg-green-500",
  mention: "bg-purple-500",
  request: "bg-yellow-500"
}

export default function NotificationItem({ data }) {
  return (
    <div
      className="
        relative
        flex items-center justify-between
        px-4 py-3
        hover:bg-muted/50
        transition-all
        duration-200
        cursor-pointer
        group
        active:scale-[0.98]
      "
    >
      {/* Left Accent Bar */}
      {/* <span
        className={`absolute left-0 top-0 h-full w-[3px] rounded-r ${
          typeAccent[data.type] || "bg-muted"
        }`}
      /> */}

      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="relative">
          <img
            src={data.avatar || "/avatar.png"}
            alt={`${data.user} avatar`}
            className="
              h-10 w-10
              rounded-full
              object-cover
              transition-transform
              duration-200
              group-hover:scale-105
            "
          />

          {/* Unread Dot (optional) */}
          {!data.seen && (
            <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-primary" />
          )}
        </div>

        <div className="text-sm">
          <span className="font-semibold group-hover:text-primary">
            {data.user}
          </span>{" "}
          <span className="text-muted-foreground">
            {data.message}
          </span>
          <div className="text-xs text-muted-foreground">
            {data.time}
          </div>
        </div>
      </div>

      {/* Post Thumbnail */}
      {data.postThumb && (
        <img
          src={data.postThumb}
          alt="Post preview"
          className="
            h-10 w-10
            rounded-md
            object-cover
            transition-transform
            duration-200
            group-hover:scale-105
          "
        />
      )}

      {/* Follow Button */}
      {data.type === "follow" && (
        <button
          className="
            px-3 py-1.5
            rounded-full
            text-xs
            bg-primary
            text-primary-foreground
            hover:brightness-110
            transition
            active:scale-95
          "
        >
          Follow
        </button>
      )}
    </div>
  )
}
