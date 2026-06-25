'use client'

import AuthPageLayout from './AuthPageLayout'
import AuthButtons from './AuthButtons'

export default function LoginPageClient() {
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
