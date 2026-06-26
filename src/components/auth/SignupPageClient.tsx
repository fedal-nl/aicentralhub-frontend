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

  if (status === 'authenticated' || status === 'loading') {
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
