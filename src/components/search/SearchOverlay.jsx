"use client"

import { useEffect, useState } from "react"
import { smartSearch } from "@/services/search.service"
import SearchInput from "./SearchInput"
import SearchTabs from "./SearchTabs"
import SearchResults from "./SearchResults"
import RecentSearches from "./RecentSearches"

export default function SearchOverlay() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState("all")

  // SAVE TO LOCAL STORAGE
  const saveRecent = (value) => {
    if (!value) return

    let prev = JSON.parse(localStorage.getItem("recent-searches") || "[]")

    prev = prev.filter((i) => i !== value)
    prev.unshift(value)
    prev = prev.slice(0, 8)

    localStorage.setItem("recent-searches", JSON.stringify(prev))
  }

  // DEBOUNCE SEARCH
  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([])
      return
    }

    const timer = setTimeout(async () => {
      setLoading(true)

      const res = await smartSearch(query)
      setResults(res || [])

      setLoading(false)

      // save search text
      saveRecent(query)
    }, 400)

    return () => clearTimeout(timer)
  }, [query])

  // FILTER BY TAB
  const filtered =
    tab === "all"
      ? results
      : results.filter((r) => r.type === tab)

  return (
    <div className="p-4 space-y-4">
      <SearchInput value={query} onChange={setQuery} />

      {!query && <RecentSearches onSelect={setQuery} />}

      <SearchTabs tab={tab} setTab={setTab} />

      <SearchResults results={filtered} loading={loading} />
    </div>
  )
}
