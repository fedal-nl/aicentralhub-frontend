import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import { Box, Container, Typography, Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { parentCategories, allTools } from '@/data/mockData'
import ToolsGrid from '@/components/ai-tools/ToolsGrid'

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

  return (
    <Box sx={{ background: 'background.default', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="xl">
        {/* Back button */}
        <Button
          component={Link}
          href={`/ai-tools/${cat.slug}`}
          startIcon={<ArrowBackIcon />}
          sx={{
            fontFamily: 'Syne, sans-serif',
            color: 'text.secondary',
            mb: 4,
            '&:hover': { color: 'primary.main' },
          }}>
          {cat.name}
        </Button>

        {/* Header */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="overline"
            sx={{
              color: 'primary.main',
              fontFamily: 'Syne, sans-serif',
              fontWeight: 700,
              letterSpacing: '0.15em',
            }}>
            {cat.name}
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              color: 'text.primary',
              mt: 0.5,
            }}>
            {sub.name} AI Tools
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              fontFamily: 'Syne, sans-serif',
              mt: 1,
            }}>
            {sub.count.toLocaleString()} tools in this subcategory
          </Typography>
        </Box>

        {/* Tools grid */}
        <ToolsGrid tools={tools} />
      </Container>
    </Box>
  )
}
