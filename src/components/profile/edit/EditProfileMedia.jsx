import { Button } from "@/components/ui/button"

export default function EditProfileMedia({ avatar, cover, onChange }) {
  function handleImage(e, key) {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      onChange(key, reader.result)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-6">
      {/* Avatar */}
      <div>
        <p className="text-sm mb-2">Profile Photo</p>
        {avatar && (
          <img
            src={avatar}
            className="h-24 w-24 rounded-full object-cover mb-2"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={e => handleImage(e, "avatar")}
        />
      </div>

      {/* Cover */}
      <div>
        <p className="text-sm mb-2">Cover Photo</p>
        {cover && (
          <img
            src={cover}
            className="h-32 w-full rounded-lg object-cover mb-2"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={e => handleImage(e, "cover")}
        />
      </div>
    </div>
  )
}
