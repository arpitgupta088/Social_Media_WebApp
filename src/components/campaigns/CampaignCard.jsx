"use client"

import { motion } from "framer-motion"
import { BadgeDollarSign, Clock, Layers } from "lucide-react"
import Link from "next/link"

export default function CampaignCard({ campaign }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl bg-card p-4 border shadow-sm"
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-lg">{campaign.brand}</h3>
        <span className="text-xs text-muted-foreground">
          {campaign.deadline}
        </span>
      </div>

      <p className="text-sm mb-3">{campaign.title}</p>

      <div className="flex gap-3 text-xs text-muted-foreground mb-4">
        <div className="flex items-center gap-1">
          <BadgeDollarSign size={14} />
          {campaign.budget}
        </div>
        <div className="flex items-center gap-1">
          <Layers size={14} />
          {campaign.platform}
        </div>
        <div className="flex items-center gap-1">
          <Clock size={14} />
          {campaign.niche}
        </div>
      </div>

      <Link
        href={`/campaigns/${campaign.id}`}
        className="block text-center rounded-xl bg-primary py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition"
      >
        View Campaign
      </Link>
    </motion.div>
  )
}
