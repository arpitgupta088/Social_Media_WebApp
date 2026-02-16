export default function PublicHighlights({ highlights }) {
  return (
    <div className="flex gap-4 overflow-x-auto py-4">
      {highlights.map((h, i) => (
        <div key={i} className="flex flex-col items-center min-w-[70px]">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center text-xs font-semibold">
            {h[0]}
          </div>
          <span className="text-xs mt-1">{h}</span>
        </div>
      ))}
    </div>
  )
}
