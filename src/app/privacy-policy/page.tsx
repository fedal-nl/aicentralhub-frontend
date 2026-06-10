import { Metadata } from 'next'
import PolicyPageClient from '@/components/legal/PolicyPageClient'
import { privacyPolicyContent } from '@/data/legalContent'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy for AI CentralHub — how we collect, use and protect your personal data.',
}

export default function PrivacyPolicyPage() {
  return <PolicyPageClient content={privacyPolicyContent} />
}
