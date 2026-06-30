'use client'

import Link from 'next/link'
import { Box, Container, Typography, Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ToolsGrid from './ToolsGrid'
import { Category, Subcategory, Tool } from '@/types/tool'

interface Props {
  cat: Category
  subcategory: Subcategory
  initialTools: Tool[]
  totalCount: number
}

export default function SubcategoryPageClient({
  cat,
  subcategory,
  initialTools,
}: Props) {
  return (
    <Box
      sx={{
        background: (theme) => theme.customColors.lightBgAlt,
        minHeight: '100vh',
        py: 6,
      }}>
      <Container maxWidth="xl">
        <Button
          component={Link}
          href={`/ai-tools/${cat.slug}`}
          startIcon={<ArrowBackIcon />}
          sx={{
            color: (theme) => theme.customColors.lightTextSecondary,
            mb: 4,
            '&:hover': { color: 'primary.main' },
          }}>
          {cat.name}
        </Button>

        <Box sx={{ mb: 6 }}>
          <Typography
            variant="overline"
            sx={{
              color: 'primary.main',
              fontWeight: 700,
              letterSpacing: '0.15em',
            }}>
            {cat.name}
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: (theme) => theme.customColors.lightText,
              mt: 0.5,
            }}>
            {subcategory.name} AI Tools
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: (theme) => theme.customColors.lightTextSecondary,
              mt: 1,
            }}>
            {subcategory.count.toLocaleString()} tools in this subcategory
          </Typography>
        </Box>

        <ToolsGrid tools={initialTools} />
      </Container>
    </Box>
  )
}
