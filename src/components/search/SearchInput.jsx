"use client"

export default function SearchInput({ value, onChange }) {
  return (
    <input
      id="smart-search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search users, tags, creators... (Press /)"
      className="
        w-full
        rounded-xl
        border
        bg-background
        px-4
        py-3
        text-sm
        focus:outline-none
        focus:ring-2
        focus:ring-primary
      "
    />
  )
}
