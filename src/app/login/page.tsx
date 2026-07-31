import { Metadata } from 'next'
import LoginPageClient from '@/components/auth/LoginPageClient'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your AI CentralHub account.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/login' },
}

export default function LoginPage() {
  return <LoginPageClient />
}
