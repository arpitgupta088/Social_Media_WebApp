"use client"

import { useEffect } from "react"
import { useAnalyticsStore } from "@/lib/stores/analytics-store"
import AnalyticsHeader from "@/components/analytics/AnalyticsHeader"
import StatCard from "@/components/analytics/StatCard"
import GrowthChart from "@/components/analytics/GrowthChart"

export default function CreatorAnalyticsPage() {
  const { data, loading, fetchAnalytics } = useAnalyticsStore()

  useEffect(() => {
    fetchAnalytics()
  }, [])

  if (loading || !data) {
    return <div className="p-6 text-muted-foreground">Loading analytics...</div>
  }

  return (
    <div className="p-6 space-y-6">
      <AnalyticsHeader />

      <div className="grid grid-cols-2 gap-4">
        <StatCard title="Followers" value={data.stats.followers} />
        <StatCard title="Views" value={data.stats.views} />
        <StatCard title="Engagement" value={data.stats.engagement} />
        <StatCard title="Posts" value={data.stats.posts} />
      </div>

      <GrowthChart data={data.growth} />
    </div>
  )
}
