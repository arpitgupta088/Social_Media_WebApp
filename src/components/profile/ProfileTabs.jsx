"use client"

export default function ProfileTabs({ active, onChange }) {
  const tabs = ["latest", "membership", "public"]

  return (
    <div className="flex gap-2 px-4 mb-4 overflow-x-auto">
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`
            px-4
            py-2
            rounded-full
            text-sm
            font-semibold
            transition
            capitalize
            ${active === tab
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
            }
          `}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
