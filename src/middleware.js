import { NextResponse } from "next/server"

export function middleware(request) {
  const cookie = request.cookies.get("hyprr-auth")
  const isLoggedIn = cookie?.value === "true"

  const pathname = request.nextUrl.pathname

  const protectedRoutes = [
    "/feed",
    "/search",
    "/profile",
    "/reels",
    "/create",
    "/notifications",
  ]

  const isProtected = protectedRoutes.some(route =>
    pathname.startsWith(route)
  )

  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    )
  }

  // Prevent logged-in user from going back to login/register
  if (isLoggedIn && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(
      new URL("/feed", request.url)
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/feed/:path*",
    "/search/:path*",
    "/profile/:path*",
    "/reels/:path*",
    "/create/:path*",
    "/notifications/:path*",
    "/login",
    "/register",
  ],
}