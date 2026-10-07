import { NextResponse, type NextRequest } from "next/server"
import { getSessionCookie } from "better-auth/cookies"

const PUBLIC_ADMIN_PATHS = ["/admin/sign-in", "/admin/forgot-password", "/admin/reset-password"]

/**
 * Optimistic check only: sends visitors without a session cookie to the
 * sign-in page. Real authorisation happens server-side on every page, action
 * and route handler (see src/server/session.ts).
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (PUBLIC_ADMIN_PATHS.some((p) => pathname === p)) return NextResponse.next()
  if (!getSessionCookie(request)) {
    return NextResponse.redirect(new URL("/admin/sign-in", request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
}
