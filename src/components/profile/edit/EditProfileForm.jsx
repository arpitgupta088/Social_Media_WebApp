import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function EditProfileForm({ user, onChange }) {
  return (
    <div className="space-y-4">
      <Input
        placeholder="Name"
        value={user.name || ""}
        onChange={e => onChange("name", e.target.value)}
      />

      <Input
        placeholder="Username"
        value={user.username || ""}
        onChange={e => onChange("username", e.target.value)}
      />

      <Textarea
        placeholder="Bio"
        maxLength={150}
        value={user.bio || ""}
        onChange={e => onChange("bio", e.target.value)}
      />

      <Input
        placeholder="Location"
        value={user.location || ""}
        onChange={e => onChange("location", e.target.value)}
      />

      <Input
        placeholder="Website"
        value={user.website || ""}
        onChange={e => onChange("website", e.target.value)}
      />
    </div>
  )
}
