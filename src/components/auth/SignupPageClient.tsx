'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import AuthPageLayout from './AuthPageLayout'
import AuthButtons from './AuthButtons'

export default function SignupPageClient() {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/dashboard')
    }
  }, [status, router])

  // Only hide the form once we know the user is logged in (redirecting).
  // While the session is still loading — which is always the case on the
  // server render — show the form, so the page isn't blank on first paint
  // and the footer isn't pushed down when it appears (CLS/LCP).
  if (status === 'authenticated') {
    return null
  }

  return (
    <AuthPageLayout
      title="Create your account"
      subtitle="Join AI CentralHub — free forever"
      footerText="Already have an account?"
      footerLinkText="Log in"
      footerLinkHref="/login">
      <AuthButtons callbackUrl="/" />
    </AuthPageLayout>
  )
}
