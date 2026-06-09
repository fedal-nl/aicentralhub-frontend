'use client'

import Link from 'next/link'
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardActionArea,
  Stack,
  Chip,
} from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { parentCategories } from '@/data/mockData'

const categoryIcons: Record<string, string> = {
  productivity: '⚡',
  'content-writing': '✍️',
  'image-design': '🎨',
  video: '🎬',
  audio: '🎵',
  'code-developer': '💻',
  'marketing-seo': '📈',
  business: '💼',
  'ai-chatbots': '🤖',
  education: '🎓',
  'fun-creative': '🎭',
  'health-life': '❤️',
}

export default function CategoriesPageClient() {
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
              color: 'text.primary',
              mt: 0.5,
            }}>
            All Categories
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',

              mt: 1,
              maxWidth: 560,
              lineHeight: 1.8,
            }}>
            Browse 7,000+ AI tools organised across 12 parent categories and 60+
            subcategories. Find exactly the type of tool you need.
          </Typography>
        </Container>
      </Box>

      {/* Categories grid */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Grid container spacing={3}>
          {parentCategories.map((cat, index) => {
            const totalTools = cat.subcategories.reduce(
              (sum, sub) => sum + sub.count,
              0,
            )
            return (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={cat.slug}>
                <Card
                  sx={{
                    height: '100%',
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
                    href={`/ai-tools/${cat.slug}`}
                    sx={{
                      p: 3,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                    }}>
                    {/* Icon */}
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: '14px',
                        background: (theme) =>
                          index % 2 === 0
                            ? `${theme.palette.primary.main}22`
                            : `${theme.palette.secondary.main}22`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.6rem',
                        mb: 2,
                      }}>
                      {categoryIcons[cat.slug] ?? '🔧'}
                    </Box>

                    {/* Name & description */}
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: 'text.primary',
                        mb: 0.5,
                      }}>
                      {cat.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',

                        lineHeight: 1.6,
                        mb: 2,
                        flex: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}>
                      {cat.description}
                    </Typography>

                    {/* Footer */}
                    <Stack
                      direction="row"
                      sx={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        mt: 'auto',
                      }}>
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ flexWrap: 'wrap', gap: 0.5 }}>
                        <Chip
                          label={`${totalTools.toLocaleString()} tools`}
                          size="small"
                          sx={{
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            background: (theme) =>
                              `${theme.palette.primary.main}22`,
                            color: 'primary.main',
                            border: (theme) =>
                              `1px solid ${theme.palette.primary.main}44`,
                          }}
                        />
                        <Chip
                          label={`${cat.subcategories.length} subcategories`}
                          size="small"
                          sx={{
                            fontSize: '0.7rem',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            color: 'text.secondary',
                          }}
                        />
                      </Stack>
                      <ArrowForwardIcon
                        sx={{ fontSize: 18, color: 'text.secondary' }}
                      />
                    </Stack>
                  </CardActionArea>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </Box>
  )
}
