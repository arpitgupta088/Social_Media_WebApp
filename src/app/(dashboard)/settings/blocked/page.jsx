"use client"

import { useEffect, useState } from "react"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { getBlockedUsers } from "@/services/account.service"
import { unblockUser } from "@/services/account.service"

export default function BlockedPage() {
    const router = useRouter()
    const [blocked, setBlocked] = useState([])

    useEffect(() => {
        async function load() {
            const data = await getBlockedUsers()
            setBlocked(data)
        }
        load()
    }, [])

    return (
        <div className="min-h-screen bg-background px-4">

            {/* Header */}
            <div className="sticky top-0 z-40 flex items-center gap-3 py-3 bg-background border-b">
                <button onClick={() => router.back()}>
                    <ArrowLeft className="h-5 w-5" />
                </button>
                <h2 className="font-semibold">Blocked Accounts</h2>
            </div>

            {/* List */}
            <div className="mt-4 space-y-3">
                {blocked.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                        No blocked users
                    </p>
                )}

                {blocked.map((u) => (
                    <div
                        key={u.username}
                        className="flex items-center justify-between border rounded-xl px-4 py-3"
                    >
                        <span>@{u.username}</span>

                        <button
                            onClick={async () => {
                                await unblockUser(u.username)
                                alert("Unblocked")
                                location.reload()
                            }}
                        >
                            Unblock
                        </button>

                    </div>
                ))}
            </div>
        </div>
    )
}
