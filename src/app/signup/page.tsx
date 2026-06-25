import { Metadata } from 'next'
import SignupPageClient from '@/components/auth/SignupPageClient'

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create your free AI CentralHub account.',
}

export default function SignupPage() {
  return <SignupPageClient />
}
