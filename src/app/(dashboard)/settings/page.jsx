"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { requestCreator } from "@/services/account.service"


function Section({ title, children }) {
  return (
    <div className="mb-6">
      <h3 className="px-2 mb-2 text-xs font-semibold text-muted-foreground uppercase">
        {title}
      </h3>
      <div className="rounded-xl border bg-card overflow-hidden">
        {children}
      </div>
    </div>
  )
}

function Item({ label, right, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-muted transition"
    >
      <span>{label}</span>
      {right && <span className="text-muted-foreground">{right}</span>}
    </button>
  )
}

function Toggle({ label }) {
  const [on, setOn] = useState(false)

  return (
    <button
      onClick={() => setOn(!on)}
      className="w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-muted transition"
    >
      <span>{label}</span>
      <div
        className={`h-5 w-9 rounded-full p-0.5 transition ${on ? "bg-primary" : "bg-muted"
          }`}
      >
        <div
          className={`h-4 w-4 rounded-full bg-background transition ${on ? "translate-x-4" : ""
            }`}
        />
      </div>
    </button>
  )
}

export default function SettingsPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background px-4 pb-10">
      {/* Header */}
      <div className="sticky top-0 z-40 flex items-center gap-3 py-3 bg-background/90 backdrop-blur border-b">
        <button onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h2 className="font-semibold text-base">Settings</h2>
      </div>

      <div className="mt-4">
        <Section title="Account">
          <Item label="Edit Profile" />
          <Item label="Username" right="@arpitt_gupta_" />
          <Item label="Email" right="Change" />
          <Item label="Password" right="Change" />
          <Toggle label="Two-Factor Authentication" />
        </Section>

        <Section title="Privacy">
          <Toggle label="Private Account" />
          <Item
            label="Blocked Accounts"
            onClick={() => router.push("/settings/blocked")}
          />
          <Item label="Story Controls" />
          <Item label="Mentions & Tags" />
        </Section>

        <Section title="Notifications">
          <Toggle label="Likes" />
          <Toggle label="Comments" />
          <Toggle label="New Followers" />
          <Toggle label="Messages" />
          <Toggle label="Brand Campaign Alerts" />
        </Section>

        <Section title="Appearance">
          <Item label="Theme" right="System" />
          <Item label="Font Size" right="Medium" />
          <Item label="Feed Layout" right="Compact" />
        </Section>

        <Section title="Creator / Brand">
          <Item
            label="Request Creator Profile"
            onClick={async () => {
              const res = await requestCreator()
              if (res.success) {
                alert("Creator request sent for approval")
              }
            }}
          />
          <Item label="Switch account type" />
          <Item label="Campaign Dashboard" />
          <Item label="Insights" />
          <Item label="Monetization" />
        </Section>


        <Section title="Support">
          <Item label="Help Center" />
          <Item label="Report a Problem" />
          <Item label="About Hyprr" />
        </Section>

        <Section title="Danger Zone">
          <Item
            label="Deactivate Account"
            onClick={() => alert("Account deactivated")}
          />
          <Item
            label="Delete Account"
            onClick={() => alert("Account deleted")}
          />
        </Section>
      </div>
    </div>
  )
}
