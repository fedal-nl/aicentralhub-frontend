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
  IconButton,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
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
  const selectedParent = parentCategories.find((c) => c.name === category)
  const subcategories = selectedParent?.subcategories ?? []

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 70,
        zIndex: 10,
        background: (theme) => theme.customColors.lightBgAlt,
        borderBottom: (theme) =>
          `1px solid ${theme.customColors.lightBorderSubtle}`,
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
              background: (theme) => theme.customColors.lightBg,
              border: (theme) => `1px solid ${theme.customColors.lightBorder}`,
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
            <SearchIcon
              sx={{
                color: (theme) => theme.customColors.lightTextSecondary,
                fontSize: 20,
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
              }}
            />
            {search && (
              <IconButton
                onClick={() => onSearchChange('')}
                size="small"
                sx={{
                  color: (theme) => theme.customColors.lightTextSecondary,
                  '&:hover': { color: (theme) => theme.customColors.lightText },
                }}>
                <ClearIcon fontSize="small" />
              </IconButton>
            )}
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
                fontSize: '0.9rem',
                color: (theme) => theme.customColors.lightText,
                background: (theme) => theme.customColors.lightBg,
                border: (theme) =>
                  `1px solid ${theme.customColors.lightBorder}`,
                borderRadius: '10px',
                minWidth: 180,
                '.MuiOutlinedInput-notchedOutline': { border: 'none' },
              }}>
              <MenuItem value="">All Categories</MenuItem>
              {parentCategories.map((cat) => (
                <MenuItem key={cat.slug} value={cat.name}>
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
                        : (theme) =>
                            `1px solid ${theme.customColors.lightBorder}`,
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
                background: (theme) => theme.customColors.lightBg,
                border: (theme) =>
                  `1px solid ${theme.customColors.lightBorder}`,
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

            {/* Count */}
            <Typography
              variant="body2"
              sx={{
                color: (theme) => theme.customColors.lightTextSecondary,
                whiteSpace: 'nowrap',
              }}>
              {totalCount} tools
            </Typography>
          </Stack>
        </Stack>

        {/* Subcategory chips */}
        {subcategories.length > 0 && (
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
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
