'use client'

import { useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'

export default function SessionErrorHandler() {
  const { data: session } = useSession()

  useEffect(() => {
    if (session?.error === 'RefreshTokenFailed') {
      signOut({ callbackUrl: '/login' })
    }
  }, [session])

  return null
}
