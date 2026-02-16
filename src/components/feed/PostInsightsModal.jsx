"use client"

import { X, Eye, Heart, MessageCircle, Bookmark, User } from "lucide-react"
import { getInsights } from "@hyprr/lib/insights-store"

export default function PostInsightsModal({ postId, onClose }) {
  const data = getInsights(postId)

  const engagement =
    data.views === 0
      ? 0
      : Math.round(
          ((data.likes + data.comments + data.saves) / data.views) * 100
        )

  return (
    <div
      className="fixed inset-0 z-50 flex items-end bg-black/40"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full rounded-t-2xl bg-background p-5 animate-slideUp"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Post Insights</h2>
          <button onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Metric icon={Eye} label="Views" value={data.views} />
          <Metric icon={Heart} label="Likes" value={data.likes} />
          <Metric icon={MessageCircle} label="Comments" value={data.comments} />
          <Metric icon={Bookmark} label="Saves" value={data.saves} />
          <Metric icon={User} label="Profile Visits" value={data.profileVisits} />
          <Metric label="Engagement" value={`${engagement}%`} highlight />
        </div>
      </div>
    </div>
  )
}

function Metric({ icon: Icon, label, value, highlight }) {
  return (
    <div
      className={`
        flex flex-col items-center justify-center
        rounded-xl border p-4
        ${highlight ? "bg-primary/10 text-primary" : "bg-muted/40"}
      `}
    >
      {Icon && <Icon className="h-5 w-5 mb-1" />}
      <span className="text-lg font-semibold">{value}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  )
}
