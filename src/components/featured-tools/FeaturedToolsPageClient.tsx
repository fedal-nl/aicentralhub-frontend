'use client'

import Link from 'next/link'
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  Stack,
} from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import { featuredTools } from '@/data/mockData'
import { Tool } from '@/types/tool'

const pricingColor: Record<Tool['pricing'], string> = {
  free: '#00D4FF',
  freemium: '#7B2FFF',
  paid: '#FF6B6B',
  'free-trial': '#00E5A0',
  'contact-us': '#FF9500',
}

export default function FeaturedToolsPageClient() {
  return (
    <Box
      sx={{
        background: (theme) => theme.palette.background.default,
        minHeight: '100vh',
      }}>
      {/* Header */}
      <Box
        sx={{
          background: (theme) => theme.palette.background.paper,
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          py: 8,
        }}>
        <Container maxWidth="xl">
          <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
            <Chip
              icon={<AutoAwesomeIcon sx={{ fontSize: 16 }} />}
              label="Hand-picked by the team"
              sx={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 600,
                background: (theme) => `${theme.palette.primary.main}11`,
                border: (theme) => `1px solid ${theme.palette.primary.main}44`,
                color: 'primary.main',
                px: 1,
              }}
            />
            <Typography
              variant="overline"
              sx={{
                color: 'primary.main',
                fontFamily: 'Syne, sans-serif',
                fontWeight: 700,
                letterSpacing: '0.15em',
              }}>
              Curated Selection
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 800,
                color: 'text.primary',
              }}>
              Featured AI Tools
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                fontFamily: 'Syne, sans-serif',
                maxWidth: 560,
                lineHeight: 1.8,
              }}>
              A hand-picked selection of the best AI tools across every
              category, chosen by the AI CentralHub team for their quality,
              innovation and usefulness.
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* Tools grid */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Grid container spacing={3}>
          {featuredTools.map((tool, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={tool.id}>
              <Card
                sx={{
                  height: '100%',
                  background: (theme) => theme.palette.background.paper,
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '16px',
                  transition:
                    'transform 0.2s, border-color 0.2s, box-shadow 0.2s',
                  position: 'relative',
                  overflow: 'visible',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    borderColor: (theme) => theme.palette.primary.main,
                    boxShadow: (theme) =>
                      `0 8px 32px ${theme.palette.primary.main}22`,
                  },
                }}>
                {/* Featured badge for first 3 */}
                {index < 3 && (
                  <Chip
                    icon={<AutoAwesomeIcon sx={{ fontSize: 12 }} />}
                    label="Top Pick"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: -12,
                      right: 16,
                      fontFamily: 'Syne, sans-serif',
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
                  sx={{
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                  <Stack spacing={2} sx={{ flex: 1 }}>
                    <Stack
                      direction="row"
                      sx={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
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

                    <Box sx={{ flex: 1 }}>
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
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}>
                        {tool.description}
                      </Typography>
                    </Box>

                    <Stack direction="row" spacing={1}>
                      <Button
                        component={Link}
                        href={`/tool/${tool.slug}`}
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{
                          fontFamily: 'Syne, sans-serif',
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
                        fullWidth
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
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
