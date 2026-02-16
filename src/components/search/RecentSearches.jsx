"use client"
import { useState, useEffect } from "react"

export default function RecentSearches({ onSelect }) {
  const [recent, setRecent] = useState([])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("recent-searches") || "[]")
    setRecent(data)
  }, [])

  const clear = () => {
    localStorage.removeItem("recent-searches")
    setRecent([])
  }

  if (!recent.length) return null

  return (
    <div>
      <div className="flex justify-between mb-2">
        <p className="text-xs text-muted-foreground">Recent</p>
        <button
          onClick={clear}
          className="text-xs text-primary"
        >
          Clear all
        </button>
      </div>

      <div className="space-y-2">
        {recent.map((item, i) => (
          <button
            key={i}
            onClick={() => onSelect(item)}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  )
}
