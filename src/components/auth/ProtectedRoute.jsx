// "use client"

// import { useAuth } from "@hyprr/context/auth-context"
// import { useRouter } from "next/navigation"
// import { useEffect } from "react"

// export default function ProtectedRoute({ children }) {
//   const { isAuthenticated, loading } = useAuth()
//   const router = useRouter()

//   useEffect(() => {
//     if (!loading && !isAuthenticated) {
//       router.push("/login")
//     }
//   }, [loading, isAuthenticated, router])

//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
//         Checking session...
//       </div>
//     )
//   }

//   return children
// }
