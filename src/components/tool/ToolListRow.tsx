'use client'

import Link from 'next/link'
import { Box, Typography, Chip, Button, Stack } from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import FiberNewIcon from '@mui/icons-material/FiberNew'
import { Tool } from '@/types/tool'
import { pricingColor, pricingLabel } from '@/lib/pricingColors'
import FavoriteButton from './FavoriteButton'

interface ToolListRowProps {
  tool: Tool
  index?: number
  isNew?: boolean
  secondaryLabel?: string
}

export default function ToolListRow({
  tool,
  index,
  isNew = false,
  secondaryLabel,
}: ToolListRowProps) {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      sx={{
        alignItems: { xs: 'flex-start', sm: 'center' },
        justifyContent: 'space-between',
        p: 3,
        gap: 2,
        transition: 'background 0.2s',
        '&:hover': { background: (theme) => `${theme.palette.primary.main}08` },
      }}>
      <Stack direction="row" spacing={3} sx={{ alignItems: 'center', flex: 1 }}>
        {index !== undefined && (
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              color: (theme) => theme.customColors.lightBorder,
              minWidth: 32,
              fontSize: '1.2rem',
            }}>
            {String(index + 1).padStart(2, '0')}
          </Typography>
        )}
        <Box sx={{ flex: 1 }}>
          <Stack
            direction="row"
            spacing={1}
            sx={{ alignItems: 'center', mb: 0.5, flexWrap: 'wrap' }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                color: (theme) => theme.customColors.lightText,
              }}>
              {tool.name}
            </Typography>
            {isNew && (
              <FiberNewIcon sx={{ fontSize: 20, color: 'primary.main' }} />
            )}
            <Chip
              label={secondaryLabel ?? tool.category}
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
              label={pricingLabel(tool.pricing)}
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
            }}>
            {tool.description}
          </Typography>
        </Box>
      </Stack>

      <Stack
        direction="row"
        spacing={1}
        sx={{
          flexShrink: 0,
          alignItems: 'center',
          width: { xs: '100%', sm: 'auto' },
        }}>
        <FavoriteButton toolId={tool.id} size="small" />
        <Button
          component={Link}
          href={`/tool/${tool.slug}`}
          variant="outlined"
          size="small"
          fullWidth
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
          fullWidth
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
  )
}
