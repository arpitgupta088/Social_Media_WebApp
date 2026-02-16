export default function StoryBarSkeleton() {
  return (
    <div className="flex gap-4 overflow-x-auto px-4 py-3 border-b">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col items-center min-w-[64px] animate-pulse"
        >
          <div className="h-14 w-14 rounded-full bg-muted" />
          <div className="h-3 w-10 bg-muted rounded mt-2" />
        </div>
      ))}
    </div>
  )
}
