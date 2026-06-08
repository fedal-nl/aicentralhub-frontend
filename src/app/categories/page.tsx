import { Metadata } from 'next'
import CategoriesPageClient from '@/components/categories/CategoriesPageClient'

export const metadata: Metadata = {
  title: 'AI Tool Categories',
  description:
    'Browse 7,000+ AI tools across 12 parent categories and 60+ subcategories.',
}

export default function CategoriesPage() {
  return <CategoriesPageClient />
}
