import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Korumalı route'lar
const protectedRoutes = ["/dashboard"]
// Auth route'ları (login olmuş kullanıcı giremez)
const authRoutes = ["/login", "/register", "/forgot-password"]

export function middleware(request: NextRequest) {
  if (process.env.NEXT_PUBLIC_DISABLE_MIDDLEWARE === "true") {
    return NextResponse.next()
  }

  const token = request.cookies.get("token")?.value
  const { pathname } = request.nextUrl

  if (pathname.startsWith("/dashboard/auth")) {
    return NextResponse.next()
  }

  // 1. Korumalı route kontrolü
  // Eğer kullanıcı korumalı bir sayfaya girmeye çalışıyorsa ve token yoksa login'e at
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))
  if (isProtectedRoute && !token) {
    const url = new URL("/login", request.url)
    url.searchParams.set("from", pathname)
    return NextResponse.redirect(url)
  }

  // 2. Auth route kontrolü
  // Eğer kullanıcı zaten giriş yapmışsa ve login/register sayfasına girmeye çalışıyorsa dashboard'a at
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
