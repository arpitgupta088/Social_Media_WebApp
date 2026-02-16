import { Geist, Geist_Mono, Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@hyprr/components/utils/theme-provider"
import { AuthProvider } from "@/context/auth-context"

const geistSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata = {
  title: "Hyprr Team",
  description: "HYPRR Web Platform",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <main className="pt-16">{children}</main>
          </AuthProvider>
          
        </ThemeProvider>
      </body>
    </html>
  )
}
