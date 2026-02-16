"use client"

import Navbar from "@hyprr/components/ui/Navbar"
import BottomNav from "@hyprr/components/ui/BottomNav"
import { ThemeProvider } from "@hyprr/lib/theme-context"
import { usePathname } from "next/navigation"

export default function DashboardLayout({ children }) {
  const pathname = usePathname()
  const hideNav = pathname.startsWith("/settings") || pathname.startsWith("/dm/")

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background flex justify-center transition-colors duration-300">
        {/* App Frame */}
        <div className="w-full max-w-full md:max-w-2xl lg:max-w-3xl border-x bg-background flex flex-col min-h-screen transition-colors duration-300">

          {/* Fixed Top Navbar */}
          {!hideNav && (
            <div className="sticky top-0 z-30 bg-background border-b">
              <Navbar />
            </div>
          )}


          {/* Page Content */}
          <main className="flex-1 pb-20 pt-4 px-4 transition-colors duration-300">
            {children}
          </main>

          {/* Fixed Bottom Nav */}
          {!hideNav && (
            <div className="sticky bottom-0 z-30 bg-background border-t">
              <BottomNav />
            </div>
          )}

        </div>
      </div>
    </ThemeProvider>
  )
}
