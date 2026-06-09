'use client'

import { useState, useMemo } from 'react'
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
import { allTools } from '@/data/mockData'

export default function ToolsPageClient() {
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('search') ?? '')
  const [category, setCategory] = useState(searchParams.get('category') ?? '')
  const [subcategory, setSubcategory] = useState(
    searchParams.get('subcategory') ?? '',
  )
  const [pricing, setPricing] = useState(searchParams.get('pricing') ?? 'all')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(24)

  const filtered = useMemo(() => {
    return allTools.filter((tool) => {
      const matchesSearch =
        search === '' ||
        tool.name.toLowerCase().includes(search.toLowerCase()) ||
        tool.description.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = category === '' || tool.category === category
      const matchesSubcategory =
        subcategory === '' || tool.subcategory === subcategory
      const matchesPricing = pricing === 'all' || tool.pricing === pricing
      return (
        matchesSearch && matchesCategory && matchesSubcategory && matchesPricing
      )
    })
  }, [search, category, subcategory, pricing])

  const totalPages = Math.ceil(filtered.length / perPage)

  const paginated = useMemo(() => {
    const start = (page - 1) * perPage
    return filtered.slice(start, start + perPage)
  }, [filtered, page, perPage])

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setPage(1)
  }
  const handleCategoryChange = (value: string) => {
    setCategory(value)
    setPage(1)
  }
  const handleSubcategoryChange = (value: string) => {
    setSubcategory(value)
    setPage(1)
  }
  const handlePricingChange = (value: string) => {
    setPricing(value)
    setPage(1)
  }
  const handlePerPageChange = (e: SelectChangeEvent<number>) => {
    setPerPage(Number(e.target.value))
    setPage(1)
  }

  return (
    <Box
      sx={{
        background: (theme) => theme.palette.background.default,
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
              color: 'text.primary',
              mt: 0.5,
            }}>
            AI Tools
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',

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
          totalCount={filtered.length}
          onSearchChange={handleSearchChange}
          onCategoryChange={handleCategoryChange}
          onSubcategoryChange={handleSubcategoryChange}
          onPricingChange={handlePricingChange}
          onViewChange={setView}
        />

        <Box sx={{ mt: 4 }}>
          {view === 'grid' ? (
            <ToolsGrid tools={paginated} />
          ) : (
            <ToolsList tools={paginated} />
          )}
        </Box>

        {totalPages > 1 && (
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            sx={{
              alignItems: 'center',
              justifyContent: 'space-between',
              mt: 6,
              gap: 2,
            }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Showing {(page - 1) * perPage + 1}–
              {Math.min(page * perPage, filtered.length)} of {filtered.length}{' '}
              tools
            </Typography>

            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, value) => setPage(value)}
              shape="rounded"
              sx={{
                '& .MuiPaginationItem-root': {
                  color: 'text.secondary',
                  border: '1px solid rgba(255,255,255,0.08)',
                  '&:hover': {
                    background: (theme) => `${theme.palette.primary.main}22`,
                    color: 'primary.main',
                  },
                  '&.Mui-selected': {
                    background: (theme) => `${theme.palette.primary.main}33`,
                    color: 'primary.main',
                    borderColor: (theme) => theme.palette.primary.main,
                    '&:hover': {
                      background: (theme) => `${theme.palette.primary.main}44`,
                    },
                  },
                },
              }}
            />

            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                }}>
                Per page:
              </Typography>
              <Select
                value={perPage}
                onChange={handlePerPageChange}
                size="small"
                sx={{
                  fontSize: '0.9rem',
                  color: 'text.primary',
                  background: (theme) => theme.palette.background.paper,
                  border: '1px solid rgba(255,255,255,0.08)',
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
