export default function ProfileHighlights() {
    const highlights = ["New", "Travel", "Work", "Fun"]


    return (
        <div className="flex gap-4 overflow-x-auto px-4 py-3">
            {highlights.map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                    <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                        +
                    </div>
                    <p className="text-xs mt-1">{item}</p>
                </div>
            ))}
        </div>
    )
}