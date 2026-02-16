"use client"

import { motion } from "framer-motion"
import { Music2 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SoundChip({ sound }) {
  const router = useRouter()

  if (!sound) return null

  return (
    <motion.button
      onClick={() => router.push(`/sound/${sound.id}`)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="
        flex
        items-center
        gap-2
        px-3
        py-1.5
        rounded-full
        bg-black/60
        text-white
        text-xs
        backdrop-blur
        shadow-lg
      "
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
      >
        <Music2 size={14} />
      </motion.div>

      <motion.span
        animate={{ opacity: [1, 0.6, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="whitespace-nowrap max-w-[140px] overflow-hidden text-ellipsis"
      >
        {sound.name} – {sound.creator}
      </motion.span>
    </motion.button>
  )
}
