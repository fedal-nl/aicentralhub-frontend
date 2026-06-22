'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  Box,
  Container,
  Typography,
  Pagination,
  Stack,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material'
import ToolsFilter from './ToolsFilter'
import ToolsGrid from './ToolsGrid'
import ToolsList from './ToolsList'
import ToolGridSkeleton from '@/components/skeletons/ToolGridSkeleton'
import ToolListSkeleton from '@/components/skeletons/ToolListSkeleton'
import { Tool } from '@/types/tool'

interface Props {
  initialTools: Tool[]
  initialCount: number
}

export default function ToolsPageClient({ initialTools, initialCount }: Props) {
  const searchParams = useSearchParams()
  const [tools, setTools] = useState<Tool[]>(initialTools)
  const [totalCount, setTotalCount] = useState(initialCount)
  const [loading, setLoading] = useState(false)

  const [search, setSearch] = useState(searchParams.get('search') ?? '')
  const [category, setCategory] = useState(searchParams.get('category') ?? '')
  const [subcategory, setSubcategory] = useState(
    searchParams.get('subcategory') ?? '',
  )
  const [pricing, setPricing] = useState(searchParams.get('pricing') ?? 'all')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(24)

  const fetchTools = async (params: {
    search?: string
    category?: string
    subcategory?: string
    pricing?: string
    page?: number
    page_size?: number
  }) => {
    setLoading(true)
    try {
      const query = new URLSearchParams()
      if (params.search) query.set('search', params.search)
      if (params.category) query.set('category', params.category)
      if (params.subcategory) query.set('subcategory', params.subcategory)
      if (params.pricing && params.pricing !== 'all')
        query.set('pricing', params.pricing)
      if (params.page) query.set('page', String(params.page))
      if (params.page_size) query.set('page_size', String(params.page_size))

      const res = await fetch(`/api/tools-proxy?${query.toString()}`)
      const data = await res.json()
      setTools(data.results ?? [])
      setTotalCount(data.count ?? 0)
    } catch (error) {
      console.error('Failed to fetch tools:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setPage(1)
    fetchTools({
      search: value,
      category,
      subcategory,
      pricing,
      page: 1,
      page_size: perPage,
    })
  }

  const handleCategoryChange = (value: string) => {
    setCategory(value)
    setSubcategory('')
    setPage(1)
    fetchTools({
      search,
      category: value,
      subcategory: '',
      pricing,
      page: 1,
      page_size: perPage,
    })
  }

  const handleSubcategoryChange = (value: string) => {
    setSubcategory(value)
    setPage(1)
    fetchTools({
      search,
      category,
      subcategory: value,
      pricing,
      page: 1,
      page_size: perPage,
    })
  }

  const handlePricingChange = (value: string) => {
    setPricing(value)
    setPage(1)
    fetchTools({
      search,
      category,
      subcategory,
      pricing: value,
      page: 1,
      page_size: perPage,
    })
  }

  const handlePerPageChange = (e: SelectChangeEvent<number>) => {
    const value = Number(e.target.value)
    setPerPage(value)
    setPage(1)
    fetchTools({
      search,
      category,
      subcategory,
      pricing,
      page: 1,
      page_size: value,
    })
  }

  const handlePageChange = (value: number) => {
    setPage(value)
    fetchTools({
      search,
      category,
      subcategory,
      pricing,
      page: value,
      page_size: perPage,
    })
  }

  const totalPages = Math.ceil(totalCount / perPage)

  return (
    <Box
      sx={{
        background: (theme) => theme.customColors.lightBgAlt,
        minHeight: '100vh',
      }}>
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="overline"
            sx={{
              color: 'primary.main',
              fontWeight: 700,
              letterSpacing: '0.15em',
            }}>
            Directory
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: (theme) => theme.customColors.lightText,
              mt: 0.5,
            }}>
            AI Tools
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: (theme) => theme.customColors.lightTextSecondary,
              mt: 1,
            }}>
            Browse and discover the best AI tools across every category.
          </Typography>
        </Box>

        <ToolsFilter
          search={search}
          category={category}
          subcategory={subcategory}
          pricing={pricing}
          view={view}
          totalCount={totalCount}
          onSearchChange={handleSearchChange}
          onCategoryChange={handleCategoryChange}
          onSubcategoryChange={handleSubcategoryChange}
          onPricingChange={handlePricingChange}
          onViewChange={setView}
        />

        <Box sx={{ mt: 4 }}>
          {loading ? (
            view === 'grid' ? (
              <ToolGridSkeleton count={perPage > 12 ? 12 : perPage} />
            ) : (
              <ToolListSkeleton count={8} />
            )
          ) : view === 'grid' ? (
            <ToolsGrid tools={tools} />
          ) : (
            <ToolsList tools={tools} />
          )}
        </Box>

        {!loading && totalPages > 1 && (
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            sx={{
              alignItems: 'center',
              justifyContent: 'space-between',
              mt: 6,
              gap: 2,
            }}>
            <Typography
              variant="body2"
              sx={{ color: (theme) => theme.customColors.lightTextSecondary }}>
              Showing {(page - 1) * perPage + 1}–
              {Math.min(page * perPage, totalCount)} of {totalCount} tools
            </Typography>

            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, value) => handlePageChange(value)}
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

            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <Typography
                variant="body2"
                sx={{
                  color: (theme) => theme.customColors.lightTextSecondary,
                }}>
                Per page:
              </Typography>
              <Select
                value={perPage}
                onChange={handlePerPageChange}
                size="small"
                sx={{
                  fontSize: '0.9rem',
                  color: (theme) => theme.customColors.lightText,
                  background: (theme) => theme.customColors.lightBg,
                  border: (theme) =>
                    `1px solid ${theme.customColors.lightBorder}`,
                  borderRadius: '8px',
                  '.MuiOutlinedInput-notchedOutline': { border: 'none' },
                }}>
                {[24, 36, 48].map((n) => (
                  <MenuItem key={n} value={n}>
                    {n}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
          </Stack>
        )}
      </Container>
    </Box>
  )
}
