"use client"

import { useParams } from "next/navigation"
import { joinMembership } from "@/lib/membership-store"

export default function MembershipPage() {
  const { username } = useParams()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-xl font-bold">
        Join {username}'s Membership
      </h1>

      <button
        onClick={() => {
          joinMembership(username)
          alert("Membership joined")
        }}
        className="px-6 py-3 rounded-full bg-yellow-500 font-semibold"
      >
        Confirm Join
      </button>
    </div>
  )
}
