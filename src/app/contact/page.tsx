import { Metadata } from 'next'
import ContactPageClient from '@/components/contact/ContactPageClient'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    "Get in touch with the AI CentralHub team. We'd love to hear from you.",
}

export default function ContactPage() {
  return <ContactPageClient />
}
