export default function StatCard({ title, value }) {
  return (
    <div className="rounded-xl border bg-background p-4 shadow-sm">
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  )
}
