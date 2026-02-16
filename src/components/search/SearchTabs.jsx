export default function SearchTabs({ tab, setTab }) {
  const tabs = ["all", "user", "creator", "tag"]

  return (
    <div className="flex gap-2 overflow-x-auto">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => setTab(t)}
          className={`
            px-4 py-1.5 rounded-full text-sm transition
            ${tab === t
              ? "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-muted/70"}
          `}
        >
          {t}
        </button>
      ))}
    </div>
  )
}
