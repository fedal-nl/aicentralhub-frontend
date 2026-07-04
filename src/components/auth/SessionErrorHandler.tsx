'use client'

import { useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'

export default function SessionErrorHandler() {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status !== 'authenticated') return

    // Sign out if refresh failed
    if (session?.error === 'RefreshTokenFailed') {
      signOut({ callbackUrl: '/login' })
      return
    }

    // Sign out if backend token is missing from an authenticated session
    // This handles the case where someone returns after a very long absence
    if (!session?.backendToken) {
      signOut({ callbackUrl: '/login' })
    }
  }, [session, status])

  return null
}
