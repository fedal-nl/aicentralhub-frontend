import { Metadata } from 'next'
import { getTotalToolCount, formatToolCount } from '@/lib/toolCount'
import ContactPageClient from '@/components/contact/ContactPageClient'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    "Get in touch with the AI CentralHub team. We'd love to hear from you.",
}

export default async function ContactPage() {
  const count = await getTotalToolCount()
  const toolCountLabel = formatToolCount(count)

  return <ContactPageClient toolCountLabel={toolCountLabel} />
}
