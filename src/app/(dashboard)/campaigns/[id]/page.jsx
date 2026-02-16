"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { getCampaigns, applyToCampaign } from "@/services/campaign.service"

export default function CampaignDetail() {
  const { id } = useParams()
  const [campaign, setCampaign] = useState(null)
  const [applied, setApplied] = useState(false)

  useEffect(() => {
    getCampaigns().then(c => {
      setCampaign(c.find(x => x.id === id))
    })
  }, [id])

  if (!campaign) return null

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">{campaign.title}</h1>

      <div className="rounded-xl bg-card p-4 border space-y-2">
        <p><b>Brand:</b> {campaign.brand}</p>
        <p><b>Budget:</b> {campaign.budget}</p>
        <p><b>Platform:</b> {campaign.platform}</p>
        <p><b>Niche:</b> {campaign.niche}</p>
        <p><b>Deadline:</b> {campaign.deadline}</p>
      </div>

      <button
        disabled={applied}
        onClick={async () => {
          await applyToCampaign(id, "me")
          setApplied(true)
        }}
        className={`w-full py-3 rounded-xl font-semibold transition ${
          applied
            ? "bg-muted text-muted-foreground"
            : "bg-primary text-primary-foreground hover:opacity-90"
        }`}
      >
        {applied ? "Applied" : "Apply to Campaign"}
      </button>
    </div>
  )
}
