"use client"

import { useState, useEffect } from "react"
import { X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useAuth } from "@/context/auth-context"
import { updateProfile } from "@/services/profile.service"

import EditProfileForm from "./EditProfileForm"
import EditProfileLinks from "./EditProfileLinks"
import EditProfileMedia from "./EditProfileMedia"

export default function EditProfileModal({ open, onClose }) {
  const { user, setUser } = useAuth()
  const [draft, setDraft] = useState(null)
  const [isDirty, setIsDirty] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (open && user) {
      setDraft(JSON.parse(JSON.stringify(user)))
      setIsDirty(false)
    }
  }, [open, user])

  if (!open || !draft) return null

  function updateField(key, value) {
    setDraft(prev => ({ ...prev, [key]: value }))
    setIsDirty(true)
  }

  async function handleSave() {
    try {
      setSaving(true)
      const updated = await updateProfile(draft)
      setUser(updated)
      onClose()
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-background animate-slideUp">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <button onClick={onClose}>
          <X className="h-5 w-5" />
        </button>
        <h2 className="text-sm font-semibold">Edit Profile</h2>
        <Button
          size="sm"
          disabled={!isDirty || saving}
          onClick={handleSave}
        >
          {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
          Save
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="info" className="h-full">
        <TabsList className="w-full justify-around border-b rounded-none">
          <TabsTrigger value="info">Info</TabsTrigger>
          <TabsTrigger value="links">Links</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
        </TabsList>

        <div className="p-4">
          <TabsContent value="info">
            <EditProfileForm user={draft} onChange={updateField} />
          </TabsContent>

          <TabsContent value="links">
            <EditProfileLinks
              links={draft.links || []}
              onChange={links => updateField("links", links)}
            />
          </TabsContent>

          <TabsContent value="media">
            <EditProfileMedia
              avatar={draft.avatar}
              cover={draft.cover}
              onChange={(key, val) => updateField(key, val)}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
