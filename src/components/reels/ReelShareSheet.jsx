"use client"

import { X, Link2, Share2, Send } from "lucide-react"
import { useState, useEffect } from "react"

export default function ReelShareSheet({ reel, onClose, onOpenDM }) {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setTimeout(() => setOpen(true), 10)
    }, [])

    if (!reel) return null

    const url = `${window.location.origin}/reels?id=${reel.id}`

    function copy() {
        navigator.clipboard.writeText(url)
        navigator.vibrate?.(30)
    }

    return (
        <>
            {/* BACKDROP */}
            <div
                className={`fixed inset-0 z-[999] transition ${open ? "bg-black/60 backdrop-blur-sm" : "bg-black/0"
                    }`}
                onClick={onClose}
            />

            {/* SHEET */}
            <div
                className={`
        fixed bottom-0 left-0 right-0 z-[1000]
        transition-all duration-300
        ${open ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}
        `}
            >
                <div className="mx-auto max-w-md rounded-t-3xl bg-[#0B1D3A] border border-blue-500/30 shadow-2xl p-5">

                    {/* HANDLE */}
                    <div className="w-10 h-1.5 bg-white/20 rounded-full mx-auto mb-4" />

                    {/* HEADER */}
                    <div className="flex justify-between items-center mb-5">
                        <span className="text-white font-semibold text-sm tracking-wide">
                            Share
                        </span>

                        <button
                            onClick={onClose}
                            className="p-1 rounded-full bg-white/10 hover:bg-white/20"
                        >
                            <X className="h-4 w-4 text-white" />
                        </button>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex justify-between">

                        <Action icon={Link2} label="Copy" onClick={copy} />
                        <Action icon={Share2} label="Share" onClick={() => navigator.share?.({ url })} />
                        <Action
                            icon={Send}
                            label="Send"
                            onClick={() => {
                                onClose()
                                onOpenDM()
                            }}
                        />

                    </div>

                    {/* URL preview */}
                    <div className="mt-5 text-[11px] text-white/40 truncate text-center">
                        {url}
                    </div>
                </div>
            </div>


        </>
    )
}

function Action({ icon: Icon, label, onClick }) {
    return (
        <button
            onClick={onClick}
            className="
        flex flex-col items-center gap-1
        active:scale-90 transition
      "
        >
            <div className="
        h-14 w-14
        flex items-center justify-center
        rounded-full
        bg-white/10
        hover:bg-white/20
        transition
      ">
                <Icon className="text-white" />
            </div>

            <span className="text-[11px] text-white/80">{label}</span>
        </button>
    )
}
