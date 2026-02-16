export default function PostSkeleton() {
  return (
    <div className="border-b animate-pulse">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-2">
        <div className="h-8 w-8 rounded-full bg-muted" />
        <div className="h-4 w-24 bg-muted rounded" />
      </div>

      {/* Media */}
      <div className="h-[420px] bg-muted" />

      {/* Actions */}
      <div className="flex gap-4 px-4 py-3">
        <div className="h-6 w-6 bg-muted rounded" />
        <div className="h-6 w-6 bg-muted rounded" />
        <div className="h-6 w-6 bg-muted rounded" />
      </div>

      {/* Likes */}
      <div className="px-4">
        <div className="h-4 w-20 bg-muted rounded" />
      </div>

      {/* Caption */}
      <div className="px-4 pb-4 mt-2 space-y-2">
        <div className="h-4 w-32 bg-muted rounded" />
        <div className="h-4 w-48 bg-muted rounded" />
      </div>
    </div>
  )
}
