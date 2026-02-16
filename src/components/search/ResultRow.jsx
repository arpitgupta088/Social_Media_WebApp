import { BadgeCheck } from "lucide-react"

export default function ResultRow({ item }) {
  return (
    <div
      className="
        flex
        justify-between
        items-center
        rounded-xl
        px-4
        py-3
        hover:bg-muted
        transition
        cursor-pointer
      "
    >
      <span>{item.name}</span>

      <div className="flex items-center gap-2">
        {item.verified && (
          <BadgeCheck className="h-4 w-4 text-primary" />
        )}
        <span className="text-xs text-muted-foreground">
          {item.type}
        </span>
      </div>
    </div>
  )
}
