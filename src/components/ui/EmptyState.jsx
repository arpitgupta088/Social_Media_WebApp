import { Button } from "@hyprr/components/ui/button"

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-6">
      {Icon && (
        <div className="mb-4 rounded-full bg-muted p-4">
          <Icon className="h-6 w-6 text-muted-foreground" />
        </div>
      )}

      <h3 className="text-base font-semibold mb-1">
        {title}
      </h3>

      <p className="text-sm text-muted-foreground max-w-xs mb-4">
        {description}
      </p>

      {actionLabel && (
        <Button
          size="sm"
          variant="secondary"
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
