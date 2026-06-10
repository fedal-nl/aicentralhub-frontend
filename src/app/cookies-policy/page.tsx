import { Metadata } from 'next'
import PolicyPageClient from '@/components/legal/PolicyPageClient'
import { cookiesPolicyContent } from '@/data/legalContent'

export const metadata: Metadata = {
  title: 'Cookies Policy',
  description:
    'Cookies Policy for AI CentralHub — how we use cookies and similar technologies.',
}

export default function CookiesPolicyPage() {
  return <PolicyPageClient content={cookiesPolicyContent} />
}
