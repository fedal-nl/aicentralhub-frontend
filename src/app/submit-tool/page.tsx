import { Metadata } from 'next'
import SubmitToolPageClient from '@/components/submit-tool/SubmitToolPageClient'

export const metadata: Metadata = {
  title: 'Submit a Tool',
  description:
    'Submit your AI tool to the AI CentralHub directory and reach thousands of users.',
  alternates: { canonical: '/submit-tool' },
}

export default function SubmitToolPage() {
  return <SubmitToolPageClient />
}
