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
  Stack,
} from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Category } from '@/types/tool'

interface Props {
  categories: Category[]
}

export default function CategoriesPageClient({ categories }: Props) {
  return (
    <Box
      sx={{
        background: (theme) => theme.customColors.lightBgAlt,
        minHeight: '100vh',
      }}>
      {/* Header */}
      <Box
        sx={{
          background: (theme) => theme.customColors.lightBg,
          borderBottom: (theme) =>
            `1px solid ${theme.customColors.lightBorderSubtle}`,
          py: 8,
        }}>
        <Container maxWidth="xl">
          <Typography
            variant="overline"
            sx={{
              color: 'primary.main',
              fontWeight: 700,
              letterSpacing: '0.15em',
            }}>
            Browse
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: (theme) => theme.customColors.lightText,
              mt: 0.5,
            }}>
            AI Tool Categories
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: (theme) => theme.customColors.lightTextSecondary,
              mt: 1,
              maxWidth: 560,
            }}>
            Explore{' '}
            {categories.reduce((sum, c) => sum + c.count, 0).toLocaleString()}{' '}
            AI tools across {categories.length} categories and{' '}
            {categories.reduce((sum, c) => sum + c.subcategories.length, 0)}{' '}
            subcategories.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 8 }}>
        {categories.length === 0 ? (
          <Typography
            variant="body2"
            sx={{
              color: (theme) => theme.customColors.lightTextSecondary,
              textAlign: 'center',
              py: 6,
            }}>
            Unable to load categories right now. Please try again later.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {categories.map((cat) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={cat.slug}>
                <Card
                  component={Link}
                  href={`/ai-tools/${cat.slug}`}
                  sx={{
                    height: '100%',
                    display: 'block',
                    textDecoration: 'none',
                    background: (theme) => theme.customColors.lightBg,
                    border: (theme) =>
                      `1px solid ${theme.customColors.lightBorder}`,
                    borderRadius: '16px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
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
                          alignItems: 'flex-start',
                        }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color: (theme) => theme.customColors.lightText,
                          }}>
                          {cat.name}
                        </Typography>
                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{ alignItems: 'center', flexShrink: 0 }}>
                          <Chip
                            label={`${cat.count.toLocaleString()} tools`}
                            size="small"
                            sx={{
                              fontWeight: 600,
                              background: (theme) =>
                                `${theme.palette.primary.main}11`,
                              color: 'primary.main',
                              border: (theme) =>
                                `1px solid ${theme.palette.primary.main}44`,
                            }}
                          />
                        </Stack>
                      </Stack>

                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                        {cat.subcategories.slice(0, 5).map((sub) => (
                          <Chip
                            key={sub.slug}
                            label={`${sub.name} (${sub.count})`}
                            size="small"
                            sx={{
                              fontSize: '0.7rem',
                              background: (theme) =>
                                theme.customColors.lightChipBg,
                              border: (theme) =>
                                `1px solid ${theme.customColors.lightBorder}`,
                              color: (theme) =>
                                theme.customColors.lightTextSecondary,
                            }}
                          />
                        ))}
                        {cat.subcategories.length > 5 && (
                          <Chip
                            label={`+${cat.subcategories.length - 5} more`}
                            size="small"
                            sx={{
                              fontSize: '0.7rem',
                              background: (theme) =>
                                theme.customColors.lightChipBg,
                              border: (theme) =>
                                `1px solid ${theme.customColors.lightBorder}`,
                              color: (theme) =>
                                theme.customColors.lightTextSecondary,
                            }}
                          />
                        )}
                      </Box>

                      <Stack
                        direction="row"
                        sx={{ alignItems: 'center', color: 'primary.main' }}>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 600, color: 'primary.main' }}>
                          Browse {cat.name}
                        </Typography>
                        <ArrowForwardIcon sx={{ fontSize: 16, ml: 0.5 }} />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  )
}
