import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Plus } from "lucide-react"

export default function EditProfileLinks({ links, onChange }) {
  function updateLink(i, key, value) {
    const updated = [...links]
    updated[i] = { ...updated[i], [key]: value }
    onChange(updated)
  }

  function addLink() {
    onChange([...links, { id: Date.now(), label: "", url: "" }])
  }

  function removeLink(i) {
    const updated = links.filter((_, idx) => idx !== i)
    onChange(updated)
  }

  return (
    <div className="space-y-4">
      {links.map((link, i) => (
        <div key={link.id} className="flex gap-2">
          <Input
            placeholder="Label"
            value={link.label}
            onChange={e => updateLink(i, "label", e.target.value)}
          />
          <Input
            placeholder="URL"
            value={link.url}
            onChange={e => updateLink(i, "url", e.target.value)}
          />
          <button onClick={() => removeLink(i)}>
            <Trash2 className="h-4 w-4 text-red-500" />
          </button>
        </div>
      ))}

      <Button variant="outline" className="w-full" onClick={addLink}>
        <Plus className="h-4 w-4 mr-2" />
        Add Link
      </Button>
    </div>
  )
}
