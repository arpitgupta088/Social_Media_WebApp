"use client"

import { useEffect, useState } from "react"
import {
  getNotifications,
  markAllRead
} from "@/services/notification.service"

import NotificationItem from "@hyprr/components/notifications/NotificationItem"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

function formatTime(date) {
  if (!date) return ""
  const d = new Date(date)
  const diff = Math.floor((Date.now() - d) / 1000)

  if (diff < 60) return diff + "s"
  if (diff < 3600) return Math.floor(diff / 60) + "m"
  if (diff < 86400) return Math.floor(diff / 3600) + "h"
  return Math.floor(diff / 86400) + "d"
}

export default function NotificationsPage() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    load()
  }, [])

  async function load() {
  setLoading(true)
  const res = await getNotifications()

  // API → UI mapping
  const mapped = (res.notifications || []).map(n => ({
    id: n.id,
    user: n.sender?.username || "user",
    avatar: n.sender?.avatar || "/avatar.png",
    message: n.message,
    time: formatTime(n.created_at),
    seen: n.isRead,
    postThumb: n.postThumb || null,
    type: (n.type || "follow").toLowerCase()
  }))

  setList(mapped)
  setLoading(false)
}

  async function handleMarkAll() {
    await markAllRead()
    load()
  }

  return (
    <div className="min-h-screen bg-background animate-in slide-in-from-right duration-300">

      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-3 border-b sticky top-0 bg-background z-20">
        <div className="flex items-center gap-3">
          <Link href="/feed">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-lg font-semibold">Notifications</h1>
        </div>

        <button
          onClick={handleMarkAll}
          className="text-xs text-primary font-medium"
        >
          Mark all read
        </button>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="p-4 text-sm text-muted-foreground">
          Loading notifications...
        </div>
      )}

      {/* LIST */}
      <div className="divide-y">
        {list.map(n => (
          <NotificationItem key={n.id} data={n} />
        ))}
      </div>

      {!loading && list.length === 0 && (
        <div className="text-center text-sm text-muted-foreground py-10">
          No notifications yet
        </div>
      )}
    </div>
  )
}
