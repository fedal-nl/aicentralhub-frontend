'use client'

import Link from 'next/link'
import {
  Box,
  Container,
  Typography,
  Chip,
  Button,
  Stack,
  Rating,
} from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import FavoriteButton from './FavoriteButton'
import SubmittedByBadge from './SubmittedByBadge'
import { Tool } from '@/types/tool'
import { parentCategories } from '@/data/mockData'
import ToolLogo from './ToolLogo'

interface ToolHeroProps {
  tool: Tool
}

const pricingColor: Record<Tool['pricing'], string> = {
  free: '#00D4FF',
  freemium: '#7B2FFF',
  paid: '#FF6B6B',
  'free-trial': '#00E5A0',
  'contact-for-pricing': '#FF9500',
}

export default function ToolHero({ tool }: ToolHeroProps) {
  const parentCat = parentCategories.find((c) => c.name === tool.category)

  return (
    <Box
      sx={{
        background: (theme) => theme.customColors.lightBg,
        borderBottom: (theme) =>
          `1px solid ${theme.customColors.lightBorderSubtle}`,
        py: 6,
      }}>
      <Container maxWidth="xl">
        {/* Breadcrumb */}
        <Stack
          direction="row"
          spacing={1}
          sx={{ alignItems: 'center', mb: 4, flexWrap: 'wrap' }}>
          <Button
            component={Link}
            href="/ai-tools"
            startIcon={<ArrowBackIcon fontSize="small" />}
            size="small"
            sx={{
              color: (theme) => theme.customColors.lightTextSecondary,
              '&:hover': { color: 'primary.main' },
            }}>
            AI Tools
          </Button>
          {parentCat && (
            <>
              <Typography
                variant="body2"
                sx={{
                  color: (theme) => theme.customColors.lightTextSecondary,
                }}>
                ›
              </Typography>
              <Button
                component={Link}
                href={`/ai-tools/${parentCat.slug}`}
                size="small"
                sx={{
                  color: (theme) => theme.customColors.lightTextSecondary,
                  '&:hover': { color: 'primary.main' },
                }}>
                {tool.category}
              </Button>
            </>
          )}
          <Typography
            variant="body2"
            sx={{ color: (theme) => theme.customColors.lightTextSecondary }}>
            ›
          </Typography>
          <Typography variant="body2" sx={{ color: 'primary.main' }}>
            {tool.name}
          </Typography>
        </Stack>

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          sx={{
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'center' },
            gap: 4,
          }}>
          <Box sx={{ flex: 1 }}>
            <Stack
              direction="row"
              spacing={1.5}
              sx={{ alignItems: 'center', mb: 2, flexWrap: 'wrap' }}>
              <Chip
                label={tool.category}
                size="small"
                sx={{
                  fontSize: '0.75rem',
                  background: (theme) => theme.customColors.lightChipBg,
                  border: (theme) =>
                    `1px solid ${theme.customColors.lightBorder}`,
                  color: (theme) => theme.customColors.lightTextSecondary,
                }}
              />
              <Chip
                label={tool.subcategory}
                size="small"
                sx={{
                  fontSize: '0.75rem',
                  background: (theme) => theme.customColors.lightChipBg,
                  border: (theme) =>
                    `1px solid ${theme.customColors.lightBorder}`,
                  color: (theme) => theme.customColors.lightTextSecondary,
                }}
              />
              <Chip
                label={tool.pricing}
                size="small"
                sx={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  background: `${pricingColor[tool.pricing]}22`,
                  color: pricingColor[tool.pricing],
                  border: `1px solid ${pricingColor[tool.pricing]}44`,
                }}
              />
              <SubmittedByBadge isOwner={tool.isCreatedByCurrentUser} />
            </Stack>

            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                color: (theme) => theme.customColors.lightText,
                mb: 1.5,
              }}>
              {tool.name}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: (theme) => theme.customColors.lightTextSecondary,
                lineHeight: 1.8,
                maxWidth: 600,
                mb: 3,
              }}>
              {tool.description}
            </Typography>

            {tool.rating && (
              <Stack
                direction="row"
                spacing={1.5}
                sx={{ alignItems: 'center', mb: 3 }}>
                <Rating
                  value={tool.rating}
                  precision={0.5}
                  readOnly
                  sx={{ color: 'primary.main' }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 700,
                    color: (theme) => theme.customColors.lightText,
                  }}>
                  {tool.rating.toFixed(1)}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: (theme) => theme.customColors.lightTextSecondary,
                  }}>
                  ({tool.reviewCount}{' '}
                  {tool.reviewCount === 1 ? 'review' : 'reviews'})
                </Typography>
              </Stack>
            )}

            <Button
              component="a"
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              size="large"
              endIcon={<OpenInNewIcon />}
              sx={{
                fontWeight: 700,
                borderRadius: '12px',
                px: 4,
                py: 1.5,
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                color: '#fff',
                '&:hover': {
                  background: (theme) =>
                    `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                },
              }}>
              Visit {tool.name}
            </Button>
            <FavoriteButton toolId={tool.id} size="large" />
          </Box>

          <ToolLogo
            logo={tool.logo}
            name={tool.name}
            size={160}
            borderRadius={24}
          />
        </Stack>
      </Container>
    </Box>
  )
}
