"use client"

import { createContext, useContext, useState } from "react"

const ReelContext = createContext(null)

export function ReelProvider({ children }) {
  const [activeReel, setActiveReel] = useState(null)
  const [open, setOpen] = useState(false)

  function openReel(reel) {
    setActiveReel(reel)
    setOpen(true)
  }

  function closeReel() {
    setOpen(false)
    setActiveReel(null)
  }

  return (
    <ReelContext.Provider
      value={{
        activeReel,
        open,
        openReel,
        closeReel
      }}
    >
      {children}
    </ReelContext.Provider>
  )
}

export function useReel() {
  return useContext(ReelContext)
}
