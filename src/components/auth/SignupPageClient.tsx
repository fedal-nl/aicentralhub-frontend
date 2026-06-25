'use client'

import AuthPageLayout from './AuthPageLayout'
import AuthButtons from './AuthButtons'

export default function SignupPageClient() {
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
