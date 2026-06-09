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
  'free-trial': '#00E5A0',
  'contact-us': '#FF9500',
}

export default function ToolsList({ tools }: ToolsListProps) {
  if (tools.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 12 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: (theme) => theme.customColors.lightText,
            mb: 1,
          }}>
          No tools found
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: (theme) => theme.customColors.lightTextSecondary }}>
          Try adjusting your search or filters
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        background: (theme) => theme.customColors.lightBg,
        border: (theme) => `1px solid ${theme.customColors.lightBorder}`,
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
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
              transition: 'background 0.2s',
              '&:hover': {
                background: (theme) => `${theme.palette.primary.main}08`,
              },
            }}>
            <Box sx={{ flex: 1 }}>
              <Stack
                direction="row"
                spacing={1}
                sx={{ alignItems: 'center', mb: 0.5, flexWrap: 'wrap' }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: (theme) => theme.customColors.lightText,
                  }}>
                  {tool.name}
                </Typography>
                <Chip
                  label={tool.category}
                  size="small"
                  sx={{
                    fontSize: '0.7rem',
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
                  color: (theme) => theme.customColors.lightTextSecondary,
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
                  borderColor: (theme) => theme.customColors.lightBorder,
                  color: (theme) => theme.customColors.lightTextSecondary,
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
            <Divider
              sx={{
                borderColor: (theme) => theme.customColors.lightBorderSubtle,
              }}
            />
          )}
        </Box>
      ))}
    </Box>
  )
}
