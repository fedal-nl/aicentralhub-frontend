'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Box,
  Container,
  Typography,
  Grid,
  Chip,
  Stack,
  Divider,
  Pagination,
} from '@mui/material'
import { Category } from '@/types/tool'
import { Tool } from '@/types/tool'
import ToolCard from '@/components/tool/ToolCard'
import ToolGridSkeleton from '@/components/skeletons/ToolGridSkeleton'

interface Props {
  category: Category
  initialTools: Tool[]
  totalCount: number
}

export default function CategoryPageClient({
  category,
  initialTools,
  totalCount,
}: Props) {
  const [tools, setTools] = useState<Tool[]>(initialTools)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [activeSubcategory, setActiveSubcategory] = useState('')
  const perPage = 12
  const totalPages = Math.ceil(totalCount / perPage)

  const fetchTools = async (subcategory: string, newPage: number) => {
    setLoading(true)
    try {
      const query = new URLSearchParams()
      query.set('category', category.name)
      if (subcategory) query.set('subcategory', subcategory)
      query.set('page', String(newPage))
      query.set('page_size', String(perPage))

      const res = await fetch(`/api/tools-proxy?${query.toString()}`)
      const data = await res.json()
      setTools(data.results ?? [])
    } catch {
      // keep existing tools
    } finally {
      setLoading(false)
    }
  }

  const handleSubcategoryChange = (slug: string, name: string) => {
    setActiveSubcategory(slug)
    setPage(1)
    fetchTools(name, 1)
  }

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
    const activeSub = category.subcategories.find(
      (s) => s.slug === activeSubcategory,
    )
    fetchTools(activeSub?.name ?? '', value)
  }

  return (
    <Box
      sx={{
        background: (theme) => theme.customColors.lightBgAlt,
        minHeight: '100vh',
      }}>
      {/* Header */}
      <Box
        sx={{
          background: (theme) => theme.customColors.lightBg,
          borderBottom: (theme) =>
            `1px solid ${theme.customColors.lightBorderSubtle}`,
          py: 8,
        }}>
        <Container maxWidth="xl">
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <Typography
              variant="body2"
              component={Link}
              href="/categories"
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}>
              Categories
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: (theme) => theme.customColors.lightTextSecondary }}>
              /
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: (theme) => theme.customColors.lightTextSecondary }}>
              {category.name}
            </Typography>
          </Stack>

          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: (theme) => theme.customColors.lightText,
            }}>
            {category.name}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: (theme) => theme.customColors.lightTextSecondary,
              mt: 1,
            }}>
            {category.count.toLocaleString()} AI tools in this category
          </Typography>

          <Divider
            sx={{
              borderColor: (theme) => theme.customColors.lightBorderSubtle,
              my: 3,
            }}
          />

          {/* Subcategory filter chips */}
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
            <Chip
              label={`All (${category.count.toLocaleString()})`}
              onClick={() => handleSubcategoryChange('', '')}
              sx={{
                fontWeight: 600,
                cursor: 'pointer',
                background:
                  activeSubcategory === ''
                    ? (theme) => `${theme.palette.primary.main}22`
                    : (theme) => theme.customColors.lightChipBg,
                color:
                  activeSubcategory === ''
                    ? 'primary.main'
                    : (theme) => theme.customColors.lightTextSecondary,
                border:
                  activeSubcategory === ''
                    ? (theme) => `1px solid ${theme.palette.primary.main}66`
                    : (theme) => `1px solid ${theme.customColors.lightBorder}`,
              }}
            />
            {category.subcategories.map((sub) => (
              <Chip
                key={sub.slug}
                label={`${sub.name} (${sub.count})`}
                onClick={() => handleSubcategoryChange(sub.slug, sub.name)}
                sx={{
                  cursor: 'pointer',
                  background:
                    activeSubcategory === sub.slug
                      ? (theme) => `${theme.palette.primary.main}22`
                      : (theme) => theme.customColors.lightChipBg,
                  color:
                    activeSubcategory === sub.slug
                      ? 'primary.main'
                      : (theme) => theme.customColors.lightTextSecondary,
                  border:
                    activeSubcategory === sub.slug
                      ? (theme) => `1px solid ${theme.palette.primary.main}66`
                      : (theme) =>
                          `1px solid ${theme.customColors.lightBorder}`,
                }}
              />
            ))}
          </Stack>
        </Container>
      </Box>

      {/* Tools grid */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        {loading ? (
          <ToolGridSkeleton count={12} />
        ) : tools.length === 0 ? (
          <Typography
            variant="body2"
            sx={{
              color: (theme) => theme.customColors.lightTextSecondary,
              textAlign: 'center',
              py: 6,
            }}>
            No tools found in this subcategory yet.
          </Typography>
        ) : (
          <Grid container spacing={2.5}>
            {tools.map((tool) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={tool.id}>
                <ToolCard tool={tool} />
              </Grid>
            ))}
          </Grid>
        )}

        {!loading && totalPages > 1 && (
          <Stack sx={{ alignItems: 'center', mt: 6 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              shape="rounded"
              sx={{
                '& .MuiPaginationItem-root': {
                  color: (theme) => theme.customColors.lightTextSecondary,
                  border: (theme) =>
                    `1px solid ${theme.customColors.lightBorder}`,
                  '&:hover': {
                    background: (theme) => `${theme.palette.primary.main}22`,
                    color: 'primary.main',
                  },
                  '&.Mui-selected': {
                    background: (theme) => `${theme.palette.primary.main}33`,
                    color: 'primary.main',
                    borderColor: (theme) => theme.palette.primary.main,
                  },
                },
              }}
            />
          </Stack>
        )}
      </Container>
    </Box>
  )
}
