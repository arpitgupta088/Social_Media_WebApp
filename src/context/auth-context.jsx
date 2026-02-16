"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { getUser } from "@/lib/auth-store"

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const stored = getUser()
    if (stored) setUser(stored)
    else {
      setUser({
        id: "u1",
        username: "arpit_gupta",
        name: "Arpit Gupta",
        bio: "Frontend dev",
        avatar: "/avatars/avatar1.jpg",
        role: "creator"
      })
    }
  }, [])

  const role = user?.role || "user"

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
