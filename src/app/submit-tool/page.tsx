import { Metadata } from 'next'
import ComingSoonClient from '@/components/submit-tool/ComingSoonClient'
import SubmitToolPageClient from '@/components/submit-tool/SubmitToolPageClient'

export const metadata: Metadata = {
  title: 'Submit a Tool',
  description:
    'Submit your AI tool to the AI CentralHub directory and reach thousands of users.',
}

// Flip this to true once pricing plans are ready and this page should go live
const SUBMIT_TOOL_LIVE = false

export default function SubmitToolPage() {
  if (!SUBMIT_TOOL_LIVE) {
    return <ComingSoonClient />
  }
  return <SubmitToolPageClient />
}
