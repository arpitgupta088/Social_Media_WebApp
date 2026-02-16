"use client"

import { useEffect, useState } from "react"
import { getCampaigns } from "@/services/campaign.service"
import CampaignCard from "@/components/campaigns/CampaignCard"

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([])

  useEffect(() => {
    getCampaigns().then(setCampaigns)
  }, [])

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold mb-2">Brand Campaigns</h1>

      {campaigns.map(c => (
        <CampaignCard key={c.id} campaign={c} />
      ))}
    </div>
  )
}
