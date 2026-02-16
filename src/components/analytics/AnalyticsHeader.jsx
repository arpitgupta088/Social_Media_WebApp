"use client"

import { useState } from "react"
import { Download, BadgeCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AnalyticsHeader() {
  const [range, setRange] = useState("7d")

  const ranges = ["7d", "30d", "90d"]

  return (
    <div className="flex items-center justify-between flex-wrap gap-4">

      {/* LEFT */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Creator Analytics</h1>
          <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
            <BadgeCheck className="h-4 w-4" />
            Creator
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          Track your growth and engagement performance
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2">

        {/* RANGE SELECTOR */}
        <div className="flex rounded-lg border overflow-hidden">
          {ranges.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1.5 text-sm transition
                ${range === r
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
                }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* EXPORT */}
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>
    </div>
  )
}
