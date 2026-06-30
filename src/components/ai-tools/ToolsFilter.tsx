'use client'

import { useState, useEffect } from 'react'
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
  IconButton,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import GridViewIcon from '@mui/icons-material/GridView'
import ViewListIcon from '@mui/icons-material/ViewList'
import { Category } from '@/types/tool'

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

const pricingOptions = [
  'all',
  'free',
  'freemium',
  'paid',
  'free-trial',
  'contact-for-pricing',
]

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
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories')
        const data = await res.json()
        setCategories(Array.isArray(data) ? data : (data.results ?? []))
      } catch {
        // silently fail — filter still works without categories
      }
    }
    fetchCategories()
  }, [])

  const selectedCat = categories.find((c) => c.name === category)
  const subcategories = selectedCat?.subcategories ?? []

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 90,
        zIndex: 10,
        background: (theme) => theme.customColors.lightBgAlt,
        borderBottom: (theme) =>
          `1px solid ${theme.customColors.lightBorderSubtle}`,
        py: 2,
        width: '100%',
        overflowX: 'hidden',
      }}>
      <Stack spacing={1.5}>
        {/* Row 1: Search + Category */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={1.5}
          sx={{ width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              background: (theme) => theme.customColors.lightBg,
              border: (theme) => `1px solid ${theme.customColors.lightBorder}`,
              borderRadius: '10px',
              px: 2,
              py: 0.8,
              gap: 1,
              width: '100%',
              maxWidth: { md: 340 },
              '&:focus-within': {
                borderColor: (theme) => theme.palette.primary.main,
              },
            }}>
            <SearchIcon
              sx={{
                color: (theme) => theme.customColors.lightTextSecondary,
                fontSize: 20,
                flexShrink: 0,
              }}
            />
            <InputBase
              fullWidth
              placeholder="Search tools..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              sx={{
                fontSize: '0.9rem',
                color: (theme) => theme.customColors.lightText,
                minWidth: 0,
              }}
            />
            {search && (
              <IconButton
                onClick={() => onSearchChange('')}
                size="small"
                sx={{
                  color: (theme) => theme.customColors.lightTextSecondary,
                  flexShrink: 0,
                }}>
                <ClearIcon fontSize="small" />
              </IconButton>
            )}
          </Box>

          <Select
            value={category}
            onChange={(e) => {
              onCategoryChange(e.target.value)
              onSubcategoryChange('')
            }}
            size="small"
            displayEmpty
            fullWidth
            sx={{
              fontSize: '0.9rem',
              color: (theme) => theme.customColors.lightText,
              background: (theme) => theme.customColors.lightBg,
              border: (theme) => `1px solid ${theme.customColors.lightBorder}`,
              borderRadius: '10px',
              width: { xs: '100%', md: 'auto' },
              minWidth: { md: 180 },
              flexShrink: 0,
              '.MuiOutlinedInput-notchedOutline': { border: 'none' },
            }}>
            <MenuItem value="">All Categories</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat.slug} value={cat.name}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </Stack>

        {/* Row 2: Pricing chips */}
        <Stack
          direction="row"
          spacing={1}
          sx={{ flexWrap: 'wrap', gap: 1, rowGap: 1 }}>
          {pricingOptions.map((option) => (
            <Chip
              key={option}
              label={
                option === 'all'
                  ? 'All'
                  : option
                      .split('-')
                      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                      .join(' ')
              }
              size="small"
              onClick={() => onPricingChange(option)}
              sx={{
                fontWeight: 600,
                cursor: 'pointer',
                background:
                  pricing === option
                    ? (theme) => `${theme.palette.primary.main}22`
                    : (theme) => theme.customColors.lightChipBg,
                color:
                  pricing === option
                    ? 'primary.main'
                    : (theme) => theme.customColors.lightTextSecondary,
                border:
                  pricing === option
                    ? (theme) => `1px solid ${theme.palette.primary.main}66`
                    : (theme) => `1px solid ${theme.customColors.lightBorder}`,
              }}
            />
          ))}
        </Stack>

        {/* Row 3: View toggle + count */}
        <Stack
          direction="row"
          sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={(_, val) => val && onViewChange(val)}
            size="small"
            sx={{
              background: (theme) => theme.customColors.lightBg,
              border: (theme) => `1px solid ${theme.customColors.lightBorder}`,
              borderRadius: '10px',
              '.MuiToggleButton-root': {
                border: 'none',
                color: (theme) => theme.customColors.lightTextSecondary,
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

          <Typography
            variant="body2"
            sx={{
              color: (theme) => theme.customColors.lightTextSecondary,
              whiteSpace: 'nowrap',
            }}>
            {totalCount.toLocaleString()} tools
          </Typography>
        </Stack>

        {/* Row 4: Subcategory chips */}
        {subcategories.length > 0 && (
          <Stack
            direction="row"
            spacing={1}
            sx={{ flexWrap: 'wrap', gap: 1, rowGap: 1, pt: 0.5 }}>
            <Chip
              label="All"
              size="small"
              onClick={() => onSubcategoryChange('')}
              sx={{
                fontWeight: 600,
                cursor: 'pointer',
                background:
                  subcategory === ''
                    ? (theme) => `${theme.palette.secondary.main}22`
                    : (theme) => theme.customColors.lightChipBg,
                color:
                  subcategory === ''
                    ? 'secondary.main'
                    : (theme) => theme.customColors.lightTextSecondary,
                border:
                  subcategory === ''
                    ? (theme) => `1px solid ${theme.palette.secondary.main}66`
                    : (theme) => `1px solid ${theme.customColors.lightBorder}`,
              }}
            />
            {subcategories.map((sub) => (
              <Chip
                key={sub.slug}
                label={`${sub.name} (${sub.count})`}
                size="small"
                onClick={() => onSubcategoryChange(sub.name)}
                sx={{
                  cursor: 'pointer',
                  background:
                    subcategory === sub.name
                      ? (theme) => `${theme.palette.secondary.main}22`
                      : (theme) => theme.customColors.lightChipBg,
                  color:
                    subcategory === sub.name
                      ? 'secondary.main'
                      : (theme) => theme.customColors.lightTextSecondary,
                  border:
                    subcategory === sub.name
                      ? (theme) => `1px solid ${theme.palette.secondary.main}66`
                      : (theme) =>
                          `1px solid ${theme.customColors.lightBorder}`,
                }}
              />
            ))}
          </Stack>
        )}
      </Stack>
    </Box>
  )
}
