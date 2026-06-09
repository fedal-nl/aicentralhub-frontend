'use client'

import Link from 'next/link'
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  Stack,
} from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { featuredTools } from '@/data/mockData'
import { Tool } from '@/types/tool'

const pricingColor: Record<Tool['pricing'], string> = {
  free: '#00D4FF',
  freemium: '#7B2FFF',
  paid: '#FF6B6B',
  'free-trial': '#00E5A0',
  'contact-us': '#FF9500',
}

export default function FeaturedTools() {
  return (
    <Box sx={{ py: 10, background: (theme) => theme.customColors.lightBg }}>
      <Container maxWidth="xl">
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
              Hand-picked
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: (theme) => theme.customColors.lightText,
                mt: 0.5,
              }}>
              Featured AI Tools
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

        <Box
          sx={{
            display: 'flex',
            gap: 2.5,
            overflowX: 'auto',
            pb: 2,
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
          }}>
          {featuredTools.map((tool) => (
            <Card
              key={tool.id}
              sx={{
                minWidth: 260,
                maxWidth: 260,
                flexShrink: 0,
                background: (theme) => theme.customColors.lightBg,
                border: (theme) =>
                  `1px solid ${theme.customColors.lightBorder}`,
                borderRadius: '16px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                transition:
                  'transform 0.2s, border-color 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  borderColor: (theme) => theme.palette.primary.main,
                  boxShadow: (theme) =>
                    `0 8px 32px ${theme.palette.primary.main}22`,
                },
              }}>
              <CardContent sx={{ p: 3 }}>
                <Stack spacing={2}>
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

                  <Box>
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
          ))}
        </Box>
      </Container>
    </Box>
  )
}
