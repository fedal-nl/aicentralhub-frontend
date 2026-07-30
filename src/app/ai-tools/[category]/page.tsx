import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCategories, getTools } from '@/lib/api'
import CategoryPageClient from '@/components/ai-tools/CategoryPageClient'

interface Props {
  params: Promise<{ category: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const categories = await getCategories()
  const cat = categories.find((c) => c.slug === category)
  if (!cat)
    return {
      title: 'Category',
      alternates: { canonical: `/ai-tools/${category}` },
    }
  return {
    title: `${cat.name} AI Tools`,
    description: `Browse ${cat.count} AI tools in the ${cat.name} category.`,
    alternates: { canonical: `/ai-tools/${category}` },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params

  let categories = []
  try {
    categories = await getCategories()
  } catch {
    notFound()
  }

  const cat = categories.find((c) => c.slug === category)
  if (!cat) notFound()

  let tools = { results: [], count: 0 }
  try {
    tools = await getTools({ category: cat.name, page_size: 12 })
  } catch {
    tools = { results: [], count: 0 }
  }

  return (
    <CategoryPageClient
      category={cat}
      initialTools={tools.results}
      totalCount={tools.count}
    />
  )
}
