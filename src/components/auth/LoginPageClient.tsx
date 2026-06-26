'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import AuthPageLayout from './AuthPageLayout'
import AuthButtons from './AuthButtons'

export default function LoginPageClient() {
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
      title="Welcome back"
      subtitle="Log in to your AI CentralHub account"
      footerText="Don't have an account?"
      footerLinkText="Sign up"
      footerLinkHref="/signup">
      <AuthButtons callbackUrl="/" />
    </AuthPageLayout>
  )
}
