'use client'

import Link from 'next/link'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  Stack,
} from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import { Tool } from '@/types/tool'
import { pricingColor, pricingLabel } from '@/lib/pricingColors'
import FavoriteButton from './FavoriteButton'
import { addUtmParams } from '@/lib/utm'

interface ToolCardProps {
  tool: Tool
  topPick?: boolean
}

export default function ToolCard({ tool, topPick = false }: ToolCardProps) {
  return (
    <Card
      sx={{
        height: '100%',
        background: (theme) => theme.customColors.lightBg,
        border: (theme) => `1px solid ${theme.customColors.lightBorder}`,
        borderRadius: '16px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        position: 'relative',
        overflow: 'visible',
        transition: 'transform 0.2s, border-color 0.2s, box-shadow 0.2s',
        '&:focus': { outline: 'none' },
        '&:focus-visible': { outline: 'none' },
        '&:hover': {
          transform: 'translateY(-4px)',
          borderColor: (theme) => theme.palette.primary.main,
          boxShadow: (theme) => `0 8px 32px ${theme.palette.primary.main}22`,
        },
      }}>
      {topPick && (
        <Chip
          icon={<AutoAwesomeIcon sx={{ fontSize: 12 }} />}
          label="Top Pick"
          size="small"
          sx={{
            position: 'absolute',
            top: -12,
            right: 16,
            fontWeight: 700,
            fontSize: '0.7rem',
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            color: '#fff',
            zIndex: 1,
          }}
        />
      )}

      <CardContent
        sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Stack spacing={2} sx={{ flex: 1 }}>
          <Stack
            direction="row"
            sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Chip
              label={tool.category}
              size="small"
              sx={{
                fontSize: '0.7rem',
                maxWidth: '140px',
                background: (theme) => theme.customColors.lightChipBg,
                border: (theme) =>
                  `1px solid ${theme.customColors.lightBorder}`,
                color: (theme) => theme.customColors.lightTextSecondary,
              }}
            />
            <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
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
              <FavoriteButton toolId={tool.id} size="small" />
            </Stack>
          </Stack>

          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: (theme) => theme.customColors.lightText,
                mb: 0.5,
              }}>
              {tool.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: (theme) => theme.customColors.lightTextSecondary,
                lineHeight: 1.6,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}>
              {tool.description}
            </Typography>
          </Box>

          <Stack direction="row" spacing={1} sx={{ pt: 1 }}>
            <Button
              component={Link}
              href={`/tool/${tool.slug}`}
              variant="outlined"
              size="small"
              fullWidth
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
              href={addUtmParams(tool.url)}
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
      </CardContent>
    </Card>
  )
}
