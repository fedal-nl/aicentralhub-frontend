import { NextResponse } from 'next/server'
import { auth } from '@/auth'

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const protectedPaths = ['/dashboard', '/submit-tool']
  const isProtected = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path),
  )

  if (isProtected && !isLoggedIn) {
    const loginUrl = new URL('/login', req.nextUrl.origin)
    loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }
})

export const config = {
  matcher: ['/dashboard', '/submit-tool'],
}
