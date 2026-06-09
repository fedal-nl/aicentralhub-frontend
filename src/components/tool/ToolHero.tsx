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
import { Tool } from '@/types/tool'
import { parentCategories } from '@/data/mockData'

interface ToolHeroProps {
  tool: Tool
}

const pricingColor: Record<Tool['pricing'], string> = {
  free: '#00D4FF',
  freemium: '#7B2FFF',
  paid: '#FF6B6B',
  'free-trial': '#00E5A0',
  'contact-us': '#FF9500',
}

export default function ToolHero({ tool }: ToolHeroProps) {
  const parentCat = parentCategories.find((c) => c.name === tool.category)

  return (
    <Box
      sx={{
        background: (theme) => theme.palette.background.paper,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
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
              color: 'text.secondary',
              '&:hover': { color: 'primary.main' },
            }}>
            AI Tools
          </Button>
          {parentCat && (
            <>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                ›
              </Typography>
              <Button
                component={Link}
                href={`/ai-tools/${parentCat.slug}`}
                size="small"
                sx={{
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' },
                }}>
                {tool.category}
              </Button>
            </>
          )}
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
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
          {/* Left: info */}
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
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'text.secondary',
                }}
              />
              <Chip
                label={tool.subcategory}
                size="small"
                sx={{
                  fontSize: '0.75rem',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'text.secondary',
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
            </Stack>

            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                color: 'text.primary',
                mb: 1.5,
              }}>
              {tool.name}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',

                lineHeight: 1.8,
                maxWidth: 600,
                mb: 3,
              }}>
              {tool.description}
            </Typography>

            {/* Rating summary */}
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
                    color: 'text.primary',
                  }}>
                  {tool.rating.toFixed(1)}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
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
          </Box>

          {/* Right: logo placeholder */}
          <Box
            sx={{
              width: { xs: 100, md: 160 },
              height: { xs: 100, md: 160 },
              borderRadius: '24px',
              background: (theme) =>
                `linear-gradient(135deg, ${theme.palette.primary.main}22, ${theme.palette.secondary.main}22)`,
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
              {tool.name.charAt(0)}
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}
