'use client'

import {
  Box,
  InputBase,
  Select,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton,
  Chip,
  Stack,
  Typography,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import GridViewIcon from '@mui/icons-material/GridView'
import ViewListIcon from '@mui/icons-material/ViewList'
import { parentCategories } from '@/data/mockData'

interface ToolsFilterProps {
  search: string
  category: string
  subcategory: string
  pricing: string
  view: 'grid' | 'list'
  totalCount: number
  onSearchChange: (value: string) => void
  onCategoryChange: (value: string) => void
  onSubcategoryChange: (value: string) => void
  onPricingChange: (value: string) => void
  onViewChange: (value: 'grid' | 'list') => void
}

const pricingOptions = ['all', 'free', 'freemium', 'paid']

export default function ToolsFilter({
  search,
  category,
  subcategory,
  pricing,
  view,
  totalCount,
  onSearchChange,
  onCategoryChange,
  onSubcategoryChange,
  onPricingChange,
  onViewChange,
}: ToolsFilterProps) {
  const selectedParent = parentCategories.find((c) => c.name === category)
  const subcategories = selectedParent?.subcategories ?? []

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 70,
        zIndex: 10,
        background: (theme) => theme.palette.background.default,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        py: 2,
      }}>
      <Stack spacing={2}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          sx={{
            alignItems: { xs: 'stretch', md: 'center' },
            justifyContent: 'space-between',
          }}>
          {/* Search */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              background: (theme) => theme.palette.background.paper,
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '10px',
              px: 2,
              py: 0.8,
              gap: 1,
              flexGrow: 1,
              maxWidth: { md: 340 },
              '&:focus-within': {
                borderColor: (theme) => theme.palette.primary.main,
              },
            }}>
            <SearchIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
            <InputBase
              fullWidth
              placeholder="Search tools..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              sx={{
                fontFamily: 'Syne, sans-serif',
                fontSize: '0.9rem',
                color: 'text.primary',
              }}
            />
          </Box>

          <Stack
            direction="row"
            spacing={2}
            sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Category filter */}
            <Select
              value={category}
              onChange={(e) => {
                onCategoryChange(e.target.value)
                onSubcategoryChange('')
              }}
              size="small"
              displayEmpty
              sx={{
                fontFamily: 'Syne, sans-serif',
                fontSize: '0.9rem',
                color: 'text.primary',
                background: (theme) => theme.palette.background.paper,
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '10px',
                minWidth: 180,
                '.MuiOutlinedInput-notchedOutline': { border: 'none' },
              }}>
              <MenuItem value="">All Categories</MenuItem>
              {parentCategories.map((cat) => (
                <MenuItem
                  key={cat.slug}
                  value={cat.name}
                  sx={{ fontFamily: 'Syne, sans-serif' }}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>

            {/* Pricing filter */}
            <Stack direction="row" spacing={1}>
              {pricingOptions.map((option) => (
                <Chip
                  key={option}
                  label={
                    option === 'all'
                      ? 'All'
                      : option.charAt(0).toUpperCase() + option.slice(1)
                  }
                  size="small"
                  onClick={() => onPricingChange(option)}
                  sx={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background:
                      pricing === option
                        ? (theme) => `${theme.palette.primary.main}22`
                        : 'rgba(255,255,255,0.05)',
                    color:
                      pricing === option ? 'primary.main' : 'text.secondary',
                    border:
                      pricing === option
                        ? (theme) => `1px solid ${theme.palette.primary.main}66`
                        : '1px solid rgba(255,255,255,0.08)',
                  }}
                />
              ))}
            </Stack>

            {/* View toggle */}
            <ToggleButtonGroup
              value={view}
              exclusive
              onChange={(_, val) => val && onViewChange(val)}
              size="small"
              sx={{
                background: (theme) => theme.palette.background.paper,
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '10px',
                '.MuiToggleButton-root': {
                  border: 'none',
                  color: 'text.secondary',
                  px: 1.5,
                  '&.Mui-selected': {
                    background: (theme) => `${theme.palette.primary.main}22`,
                    color: 'primary.main',
                  },
                },
              }}>
              <ToggleButton value="grid">
                <GridViewIcon fontSize="small" />
              </ToggleButton>
              <ToggleButton value="list">
                <ViewListIcon fontSize="small" />
              </ToggleButton>
            </ToggleButtonGroup>

            {/* Count */}
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                fontFamily: 'Syne, sans-serif',
                whiteSpace: 'nowrap',
              }}>
              {totalCount} tools
            </Typography>
          </Stack>
        </Stack>

        {/* Subcategory chips — only show when a parent category is selected */}
        {subcategories.length > 0 && (
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
            <Chip
              label="All"
              size="small"
              onClick={() => onSubcategoryChange('')}
              sx={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 600,
                cursor: 'pointer',
                background:
                  subcategory === ''
                    ? (theme) => `${theme.palette.secondary.main}22`
                    : 'rgba(255,255,255,0.05)',
                color: subcategory === '' ? 'secondary.main' : 'text.secondary',
                border:
                  subcategory === ''
                    ? (theme) => `1px solid ${theme.palette.secondary.main}66`
                    : '1px solid rgba(255,255,255,0.08)',
              }}
            />
            {subcategories.map((sub) => (
              <Chip
                key={sub.slug}
                label={`${sub.name} (${sub.count})`}
                size="small"
                onClick={() => onSubcategoryChange(sub.name)}
                sx={{
                  fontFamily: 'Syne, sans-serif',
                  cursor: 'pointer',
                  background:
                    subcategory === sub.name
                      ? (theme) => `${theme.palette.secondary.main}22`
                      : 'rgba(255,255,255,0.05)',
                  color:
                    subcategory === sub.name
                      ? 'secondary.main'
                      : 'text.secondary',
                  border:
                    subcategory === sub.name
                      ? (theme) => `1px solid ${theme.palette.secondary.main}66`
                      : '1px solid rgba(255,255,255,0.08)',
                }}
              />
            ))}
          </Stack>
        )}
      </Stack>
    </Box>
  )
}
