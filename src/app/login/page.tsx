import { Metadata } from 'next'
import LoginPageClient from '@/components/auth/LoginPageClient'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your AI CentralHub account.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/login' },
}

// Auth-dependent route: must never be cached (by Next.js's own data cache
// or any hosting-level cache layer). Without this, Hostinger's cache was
// serving stale RSC-format responses instead of rendered HTML on refresh.
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export default function LoginPage() {
  return <LoginPageClient />
}
