"use client"

import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("theme")

    if (saved) {
      setTheme(saved)
      document.documentElement.classList.toggle("dark", saved === "dark")
    } else {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      const initial = systemDark ? "dark" : "light"
      setTheme(initial)
      document.documentElement.classList.toggle("dark", initial === "dark")
    }

    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark"
    setTheme(next)
    localStorage.setItem("theme", next)
    document.documentElement.classList.toggle("dark", next === "dark")
  }

  if (!mounted) return null

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
