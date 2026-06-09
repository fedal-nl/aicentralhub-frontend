import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { parentCategories, allTools } from '@/data/mockData'
import SubcategoryPageClient from '@/components/ai-tools/SubcategoryPageClient'

interface Props {
  params: Promise<{ category: string; subcategory: string }>
}

export async function generateStaticParams() {
  return parentCategories.flatMap((cat) =>
    cat.subcategories.map((sub) => ({
      category: cat.slug,
      subcategory: sub.slug,
    })),
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: catSlug, subcategory: subSlug } = await params
  const cat = parentCategories.find((c) => c.slug === catSlug)
  const sub = cat?.subcategories.find((s) => s.slug === subSlug)
  if (!cat || !sub) return {}
  return {
    title: `${sub.name} AI Tools`,
    description: `Browse the best ${sub.name} AI tools in the ${cat.name} category.`,
  }
}

export default async function SubcategoryPage({ params }: Props) {
  const { category: catSlug, subcategory: subSlug } = await params
  const cat = parentCategories.find((c) => c.slug === catSlug)
  const sub = cat?.subcategories.find((s) => s.slug === subSlug)
  if (!cat || !sub) notFound()

  const tools = allTools.filter((t) => t.subcategory === sub.name)

  return <SubcategoryPageClient cat={cat} sub={sub} tools={tools} />
}
