import { Metadata } from 'next'
import { getCategories } from '@/lib/api'
import CategoriesPageClient from '@/components/categories/CategoriesPageClient'
import { Category } from '@/types/tool'

export const metadata: Metadata = {
  title: 'AI Tool Categories',
  description:
    'Browse AI tools by category. Explore 12 categories and 50+ subcategories of AI tools.',
  alternates: { canonical: '/categories' },
}

export default async function CategoriesPage() {
  let categories: Category[] = []
  try {
    categories = await getCategories()
  } catch {
    categories = []
  }

  return <CategoriesPageClient categories={categories} />
}
