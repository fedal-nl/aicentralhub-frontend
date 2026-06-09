import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { parentCategories } from '@/data/mockData'
import CategoryPageClient from '@/components/ai-tools/CategoryPageClient'

interface Props {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  return parentCategories.map((cat) => ({ category: cat.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params
  const cat = parentCategories.find((c) => c.slug === slug)
  if (!cat) return {}
  return {
    title: `${cat.name} AI Tools`,
    description: cat.description,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params
  const cat = parentCategories.find((c) => c.slug === slug)
  if (!cat) notFound()

  return <CategoryPageClient cat={cat} />
}
