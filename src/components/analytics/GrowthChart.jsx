"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts"

export default function GrowthChart({ data }) {
  return (
    <div className="rounded-xl border bg-background p-4 h-64">
      <p className="mb-3 font-semibold">Follower Growth</p>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
