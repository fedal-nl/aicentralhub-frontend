'use client'

import Link from 'next/link'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardActionArea,
  Chip,
  Stack,
} from '@mui/material'
import { Tool } from '@/types/tool'

interface RelatedToolsProps {
  tools: Tool[]
  currentSlug: string
}

const pricingColor: Record<Tool['pricing'], string> = {
  free: '#00D4FF',
  freemium: '#7B2FFF',
  paid: '#FF6B6B',
  'free-trial': '#00E5A0',
  'contact-us': '#FF9500',
}

export default function RelatedTools({
  tools,
  currentSlug,
}: RelatedToolsProps) {
  const related = tools.filter((t) => t.slug !== currentSlug).slice(0, 4)
  if (related.length === 0) return null

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: 800,
          color: 'text.primary',
          mb: 4,
        }}>
        Related Tools
      </Typography>
      <Grid container spacing={2.5}>
        {related.map((tool) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={tool.id}>
            <Card
              sx={{
                background: (theme) => theme.palette.background.paper,
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '16px',
                transition: 'all 0.2s',
                '&:hover': {
                  borderColor: (theme) => theme.palette.primary.main,
                  transform: 'translateY(-4px)',
                  boxShadow: (theme) =>
                    `0 8px 32px ${theme.palette.primary.main}22`,
                },
              }}>
              <CardActionArea
                component={Link}
                href={`/tool/${tool.slug}`}
                sx={{ p: 3 }}>
                <Stack
                  direction="row"
                  sx={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1.5,
                  }}>
                  <Chip
                    label={tool.subcategory}
                    size="small"
                    sx={{
                      fontFamily: 'Syne, sans-serif',
                      fontSize: '0.7rem',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'text.secondary',
                    }}
                  />
                  <Chip
                    label={tool.pricing}
                    size="small"
                    sx={{
                      fontFamily: 'Syne, sans-serif',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      background: `${pricingColor[tool.pricing]}22`,
                      color: pricingColor[tool.pricing],
                      border: `1px solid ${pricingColor[tool.pricing]}44`,
                    }}
                  />
                </Stack>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 700,
                    color: 'text.primary',
                    mb: 0.5,
                  }}>
                  {tool.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.6,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                  {tool.description}
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
