import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getCategories, getTools } from '@/lib/api'
import SubcategoryPageClient from '@/components/ai-tools/SubcategoryPageClient'

interface Props {
  params: Promise<{ category: string; subcategory: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, subcategory } = await params
  const categories = await getCategories()
  const cat = categories.find((c) => c.slug === category)
  const sub = cat?.subcategories.find((s) => s.slug === subcategory)

  if (!cat || !sub) return { title: 'Subcategory' }
  return {
    title: `${sub.name} AI Tools — ${cat.name}`,
    description: `Browse ${sub.count} AI tools in ${sub.name}.`,
    alternates: {
      canonical: `/ai-tools/${cat.slug}/${sub.slug}`,
    },
  }
}

export default async function SubcategoryPage({ params }: Props) {
  const { category, subcategory } = await params

  const categories = await getCategories()
  const cat = categories.find((c) => c.slug === category)
  if (!cat) notFound()

  const sub = cat.subcategories.find((s) => s.slug === subcategory)
  if (!sub) notFound()

  let tools = { results: [], count: 0 }
  try {
    tools = await getTools({
      category: cat.name,
      subcategory: sub.name,
      page_size: 24,
    })
  } catch {
    tools = { results: [], count: 0 }
  }

  return (
    <SubcategoryPageClient
      cat={cat}
      subcategory={sub}
      initialTools={tools.results}
      totalCount={tools.count}
    />
  )
}
