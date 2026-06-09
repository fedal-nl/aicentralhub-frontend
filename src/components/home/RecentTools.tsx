'use client'

import Link from 'next/link'
import {
  Box,
  Container,
  Typography,
  Stack,
  Chip,
  Button,
  Divider,
} from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import FiberNewIcon from '@mui/icons-material/FiberNew'
import { allTools } from '@/data/mockData'
import { Tool } from '@/types/tool'

const pricingColor: Record<Tool['pricing'], string> = {
  free: '#00D4FF',
  freemium: '#7B2FFF',
  paid: '#FF6B6B',
  'free-trial': '#00E5A0',
  'contact-us': '#FF9500',
}

// In production this will be fetched from the API sorted by created_at desc
const recentTools = allTools.slice(16, 24)

export default function RecentTools() {
  return (
    <Box
      sx={{
        py: 10,
        background: (theme) => theme.palette.background.default,
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
      <Container maxWidth="xl">
        {/* Section header */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          sx={{
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            mb: 5,
          }}>
          <Box>
            <Typography
              variant="overline"
              sx={{
                color: 'primary.main',

                fontWeight: 700,
                letterSpacing: '0.15em',
              }}>
              Fresh picks
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: 'text.primary',
                mt: 0.5,
              }}>
              Recently Added
            </Typography>
          </Box>
          <Button
            component={Link}
            href="/ai-tools"
            endIcon={<ArrowForwardIcon />}
            sx={{
              color: 'primary.main',
              mt: { xs: 2, sm: 0 },
              '&:hover': {
                background: (theme) => `${theme.palette.primary.main}11`,
              },
            }}>
            View all tools
          </Button>
        </Stack>

        {/* Tools list */}
        <Box
          sx={{
            background: (theme) => theme.palette.background.paper,
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '16px',
            overflow: 'hidden',
          }}>
          {recentTools.map((tool, index) => (
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
                {/* Left: number + info */}
                <Stack
                  direction="row"
                  spacing={3}
                  sx={{ alignItems: 'center', flex: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 800,
                      color: 'rgba(255,255,255,0.1)',
                      minWidth: 32,
                      fontSize: '1.2rem',
                    }}>
                    {String(index + 1).padStart(2, '0')}
                  </Typography>
                  <Box sx={{ flex: 1 }}>
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ alignItems: 'center', mb: 0.5, flexWrap: 'wrap' }}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 700,
                          color: 'text.primary',
                        }}>
                        {tool.name}
                      </Typography>
                      <FiberNewIcon
                        sx={{ fontSize: 20, color: 'primary.main' }}
                      />
                      <Chip
                        label={tool.subcategory}
                        size="small"
                        sx={{
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
                      }}>
                      {tool.description}
                    </Typography>
                  </Box>
                </Stack>

                {/* Right: actions */}
                <Stack direction="row" spacing={1} sx={{ flexShrink: 0 }}>
                  <Button
                    component={Link}
                    href={`/tool/${tool.slug}`}
                    variant="outlined"
                    size="small"
                    sx={{
                      borderColor: 'rgba(255,255,255,0.12)',
                      color: 'text.secondary',
                      borderRadius: '8px',
                      '&:hover': {
                        borderColor: 'primary.main',
                        color: 'primary.main',
                        background: (theme) =>
                          `${theme.palette.primary.main}11`,
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
              {index < recentTools.length - 1 && (
                <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />
              )}
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  )
}
