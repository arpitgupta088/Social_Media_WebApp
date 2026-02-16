"use client"
import { useRouter } from "next/navigation"

export default function SearchResults({ results, loading }) {
  const router = useRouter()

  if (loading) {
  return (
    <div className="space-y-3">
      {[1,2,3,4,5].map((i) => (
        <div
          key={i}
          className="flex items-center gap-3 p-2"
        >
          <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
          <div className="flex-1 space-y-1">
            <div className="h-3 w-32 bg-muted rounded animate-pulse" />
            <div className="h-3 w-20 bg-muted rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  )
}


  if (!results.length) {
    return (
      <p className="text-sm text-muted-foreground">
        No results found
      </p>
    )
  }

  return (
    <div className="space-y-1">
      {results.map((u) => (
        <div
          key={u.id}
          onClick={() => {
            // save to recent search
            let prev = JSON.parse(localStorage.getItem("recent-searches") || "[]")

            const value = u.username || u.name || ""

            prev = prev.filter((i) => i !== value)
            prev.unshift(value)
            prev = prev.slice(0, 8)

            localStorage.setItem("recent-searches", JSON.stringify(prev))

            // 🔥 navigation
            if (u.type === "user") {
              router.push(`/user/${u.username}`)
            }

            if (u.type === "tag") {
              router.push(`/search?tag=${u.username}`)
            }

            if (u.type === "node") {
              router.push(`/node/${u.id}`)
            }
          }}

          className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted cursor-pointer"
        >
          <img
            src={u.avatar || "/avatar.png"}
            className="h-10 w-10 rounded-full"
          />

          <div>
            <p className="text-sm font-semibold">
              {u.username}
            </p>
            <p className="text-xs text-muted-foreground">
              {u.type}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
