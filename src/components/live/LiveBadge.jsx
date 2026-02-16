"use client"

export default function LiveBadge({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        absolute
        top-1
        left-1
        bg-red-600
        text-white
        text-[10px]
        px-2
        py-0.5
        rounded-full
        animate-pulse
      "
    >
      LIVE
    </button>
  )
}
