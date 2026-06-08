'use client'

import Link from 'next/link'
import { Box, Typography, Chip, Button, Stack, Divider } from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Tool } from '@/types/tool'

interface ToolsListProps {
  tools: Tool[]
}

const pricingColor: Record<Tool['pricing'], string> = {
  free: '#00D4FF',
  freemium: '#7B2FFF',
  paid: '#FF6B6B',
}

export default function ToolsList({ tools }: ToolsListProps) {
  if (tools.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 12 }}>
        <Typography
          variant="h5"
          sx={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 700,
            color: 'text.primary',
            mb: 1,
          }}>
          No tools found
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: 'text.secondary', fontFamily: 'Syne, sans-serif' }}>
          Try adjusting your search or filters
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        background: (theme) => theme.palette.background.paper,
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '16px',
        overflow: 'hidden',
      }}>
      {tools.map((tool, index) => (
        <Box key={tool.id}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            sx={{
              alignItems: { xs: 'flex-start', sm: 'center' },
              justifyContent: 'space-between',
              p: 3,
              gap: 2,
            }}>
            <Box sx={{ flex: 1 }}>
              <Stack
                direction="row"
                spacing={1}
                sx={{ alignItems: 'center', mb: 0.5, flexWrap: 'wrap' }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 700,
                    color: 'text.primary',
                  }}>
                  {tool.name}
                </Typography>
                <Chip
                  label={tool.category}
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
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  lineHeight: 1.6,
                  maxWidth: 600,
                }}>
                {tool.description}
              </Typography>
            </Box>

            <Stack direction="row" spacing={1} sx={{ flexShrink: 0 }}>
              <Button
                component={Link}
                href={`/tool/${tool.slug}`}
                variant="outlined"
                size="small"
                endIcon={<ArrowForwardIcon fontSize="small" />}
                sx={{
                  fontFamily: 'Syne, sans-serif',
                  borderColor: 'rgba(255,255,255,0.12)',
                  color: 'text.secondary',
                  borderRadius: '8px',
                  '&:hover': {
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    background: (theme) => `${theme.palette.primary.main}11`,
                  },
                }}>
                Details
              </Button>
              <Button
                component="a"
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                size="small"
                endIcon={<OpenInNewIcon fontSize="small" />}
                sx={{
                  fontFamily: 'Syne, sans-serif',
                  borderRadius: '8px',
                  color: '#fff',
                  background: (theme) =>
                    `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  '&:hover': {
                    background: (theme) =>
                      `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                  },
                }}>
                Visit
              </Button>
            </Stack>
          </Stack>
          {index < tools.length - 1 && (
            <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />
          )}
        </Box>
      ))}
    </Box>
  )
}
