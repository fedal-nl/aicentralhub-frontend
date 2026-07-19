'use client'

import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
  Button,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import GridViewIcon from '@mui/icons-material/GridView'
import ViewListIcon from '@mui/icons-material/ViewList'
import { NewsArticle } from '@/types/news'
import { addUtmParams } from '@/lib/utm'

interface Props {
  articles: NewsArticle[]
}

const INITIAL_COUNT = 24
const LOAD_MORE_COUNT = 24

const SOURCE_COLORS: Record<string, string> = {
  techcrunch: '#00a2ff',
  venturebeat: '#7B2FFF',
  'the-verge': '#FF6B35',
  'mit-tech-review': '#00B894',
  'the-decoder': '#ca7b0e',
  'ars-technica-ai': '#8a427d',
}

const SOURCE_FAVICONS: Record<string, string> = {
  techcrunch: 'https://www.google.com/s2/favicons?domain=techcrunch.com&sz=32',
  venturebeat:
    'https://www.google.com/s2/favicons?domain=venturebeat.com&sz=32',
  'the-verge': 'https://www.google.com/s2/favicons?domain=theverge.com&sz=32',
  'mit-tech-review':
    'https://www.google.com/s2/favicons?domain=technologyreview.com&sz=32',
  'the-decoder':
    'https://www.google.com/s2/favicons?domain=the-decoder.com&sz=32',
  'ars-technica-ai':
    'https://www.google.com/s2/favicons?domain=arstechnica.com&sz=32',
}

const SOURCES = [
  'All',
  'TechCrunch',
  'VentureBeat',
  'The Verge',
  'MIT Tech Review',
  'The Decoder',
  'Ars Technica AI',
]

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return dateStr
  }
}

function SourceLabel({
  source,
  sourceName,
}: {
  source: string
  sourceName: string
}) {
  return (
    <Stack direction="row" spacing={0.8} sx={{ alignItems: 'center' }}>
      <Box
        component="img"
        src={
          SOURCE_FAVICONS[source] ??
          `https://www.google.com/s2/favicons?domain=${source}.com&sz=32`
        }
        alt={sourceName}
        sx={{ width: 16, height: 16, borderRadius: '3px' }}
      />
      <Typography
        variant="caption"
        sx={{
          fontWeight: 700,
          color: SOURCE_COLORS[source] ?? '#00D4FF',
          fontSize: '1rem',
        }}>
        {sourceName}
      </Typography>
    </Stack>
  )
}

export default function NewsPageClient({ articles }: Props) {
  const [activeSource, setActiveSource] = useState('All')
  const [view, setView] = useState<'grid' | 'list'>('list')
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT)

  const filtered =
    activeSource === 'All'
      ? articles
      : articles.filter((a) => a.sourceName === activeSource)

  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  const handleSourceChange = (source: string) => {
    setActiveSource(source)
    setVisibleCount(INITIAL_COUNT) // reset on filter change
  }

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
            Stay informed
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: (theme) => theme.customColors.lightText,
              mt: 0.5,
            }}>
            AI News
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: (theme) => theme.customColors.lightTextSecondary,
              mt: 1,
            }}>
            The latest AI news from TechCrunch, VentureBeat, The Verge, MIT
            Technology Review, The Decoder and Ars Technica AI — updated daily.
          </Typography>

          {/* Source filter chips + view toggle */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            sx={{
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', sm: 'center' },
              mt: 3,
              gap: 2,
            }}>
            <Stack
              direction="row"
              spacing={1}
              sx={{ flexWrap: 'wrap', gap: 2 }}>
              {SOURCES.map((source) => (
                <Chip
                  key={source}
                  icon={
                    source !== 'All' ? (
                      <Box
                        component="img"
                        src={
                          SOURCE_FAVICONS[
                            source
                              .toLowerCase()
                              .replace(/\s+/g, '-')
                              .replace(/&/g, '')
                          ]
                        }
                        alt={source}
                        sx={{
                          width: 14,
                          height: 14,
                          borderRadius: '2px',
                          ml: '8px !important',
                        }}
                      />
                    ) : undefined
                  }
                  label={source}
                  onClick={() => handleSourceChange(source)}
                  sx={{
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    height: 36,
                    px: 1,
                    ml: '0 !important',
                    cursor: 'pointer',
                    background:
                      activeSource === source
                        ? (theme) => `${theme.palette.primary.main}22`
                        : (theme) => theme.customColors.lightChipBg,
                    color:
                      activeSource === source
                        ? 'primary.main'
                        : (theme) => theme.customColors.lightTextSecondary,
                    border:
                      activeSource === source
                        ? (theme) => `1px solid ${theme.palette.primary.main}66`
                        : (theme) =>
                            `1px solid ${theme.customColors.lightBorder}`,
                    '&:hover': {
                      background: (theme) => `${theme.palette.primary.main}11`,
                      color: 'primary.main',
                    },
                  }}
                />
              ))}
            </Stack>
            <Typography
              variant="body2"
              sx={{
                color: (theme) => theme.customColors.lightTextSecondary,
                display: { xs: 'block', md: 'none' },
                mt: 1,
              }}>
              {filtered.length} articles
            </Typography>
            {/* View toggle + count */}
            <Stack
              direction="row"
              spacing={1.5}
              sx={{
                alignItems: 'center',
                flexShrink: 0,
                display: { xs: 'none', md: 'flex' },
              }}>
              <Typography
                variant="body2"
                sx={{
                  color: (theme) => theme.customColors.lightTextSecondary,
                  whiteSpace: 'nowrap',
                }}>
                {filtered.length} articles
              </Typography>
              <ToggleButtonGroup
                value={view}
                exclusive
                onChange={(_, val) => val && setView(val)}
                size="small"
                sx={{
                  background: (theme) => theme.customColors.lightBg,
                  border: (theme) =>
                    `1px solid ${theme.customColors.lightBorder}`,
                  borderRadius: '10px',
                  '.MuiToggleButton-root': {
                    border: 'none',
                    color: (theme) => theme.customColors.lightTextSecondary,
                    px: 1.5,
                    '&.Mui-selected': {
                      background: (theme) => `${theme.palette.primary.main}22`,
                      color: 'primary.main',
                    },
                  },
                }}>
                <ToggleButton value="grid">
                  <GridViewIcon fontSize="small" />
                </ToggleButton>
                <ToggleButton value="list">
                  <ViewListIcon fontSize="small" />
                </ToggleButton>
              </ToggleButtonGroup>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 6 }}>
        {filtered.length === 0 ? (
          <Typography
            variant="body2"
            sx={{
              color: (theme) => theme.customColors.lightTextSecondary,
              textAlign: 'center',
              py: 6,
            }}>
            No articles available right now. Check back soon.
          </Typography>
        ) : view === 'grid' ? (
          /* Grid View */
          <>
            <Grid container spacing={3}>
              {visible.map((article, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
                  <Card
                    component="a"
                    href={addUtmParams(article.link, 'news')}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      background: (theme) => theme.customColors.lightBg,
                      border: (theme) =>
                        `1px solid ${theme.customColors.lightBorder}`,
                      borderRadius: '16px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                      },
                    }}>
                    <CardContent
                      sx={{
                        p: 3,
                        flex: 1,
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
                          <SourceLabel
                            source={article.source}
                            sourceName={article.sourceName}
                          />
                          <Typography
                            variant="caption"
                            sx={{
                              color: (theme) =>
                                theme.customColors.lightTextSecondary,
                            }}>
                            {formatDate(article.pubDate)}
                          </Typography>
                        </Stack>

                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 700,
                            color: (theme) => theme.customColors.lightText,
                            lineHeight: 1.4,
                            flex: 1,
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}>
                          {article.title}
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{
                            color: (theme) =>
                              theme.customColors.lightTextSecondary,
                            lineHeight: 1.6,
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}>
                          {article.description}
                        </Typography>

                        {article.categories.length > 0 && (
                          <Stack
                            direction="row"
                            spacing={0.5}
                            sx={{ flexWrap: 'wrap', gap: 0.5 }}>
                            {article.categories.slice(0, 3).map((cat) => (
                              <Chip
                                key={cat}
                                label={cat}
                                size="small"
                                sx={{
                                  fontSize: '0.6rem',
                                  height: 20,
                                  background: (theme) =>
                                    theme.customColors.lightChipBg,
                                  color: (theme) =>
                                    theme.customColors.lightTextSecondary,
                                  border: (theme) =>
                                    `1px solid ${theme.customColors.lightBorder}`,
                                }}
                              />
                            ))}
                          </Stack>
                        )}

                        <Divider
                          sx={{
                            borderColor: (theme) =>
                              theme.customColors.lightBorderSubtle,
                          }}
                        />

                        <Button
                          size="small"
                          endIcon={<OpenInNewIcon sx={{ fontSize: 14 }} />}
                          sx={{
                            alignSelf: 'flex-start',
                            fontWeight: 600,
                            color: 'primary.main',
                            p: 0,
                            '&:hover': {
                              background: 'transparent',
                              opacity: 0.8,
                            },
                          }}>
                          Read article
                        </Button>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {hasMore && (
              <Stack sx={{ alignItems: 'center', mt: 6 }}>
                <Button
                  onClick={() =>
                    setVisibleCount((prev) => prev + LOAD_MORE_COUNT)
                  }
                  variant="outlined"
                  sx={{
                    fontWeight: 700,
                    borderRadius: '10px',
                    px: 6,
                    py: 1.5,
                    borderColor: (theme) => theme.customColors.lightBorder,
                    color: (theme) => theme.customColors.lightText,
                    '&:hover': {
                      borderColor: 'primary.main',
                      color: 'primary.main',
                      background: (theme) => `${theme.palette.primary.main}11`,
                    },
                  }}>
                  Load more ({filtered.length - visibleCount} remaining)
                </Button>
              </Stack>
            )}
          </>
        ) : (
          /* List View */
          <>
            <Stack spacing={0}>
              {visible.map((article, index) => (
                <Box
                  key={index}
                  sx={{
                    mb: 1,
                  }}>
                  <Box
                    component="a"
                    href={addUtmParams(article.link, 'news')}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      display: 'flex',
                      alignItems: 'stretch',
                      gap: 3,
                      py: 3,
                      px: 2,
                      textDecoration: 'none',
                      background: (theme) => theme.customColors.lightBg,
                      border: (theme) =>
                        `1px solid ${theme.customColors.lightBorder}`,
                      borderRadius: '16px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                      },
                    }}>
                    <Box
                      sx={{
                        width: 6,
                        borderRadius: 2,
                        background: SOURCE_COLORS[article.source] ?? '#00D4FF',
                        flexShrink: 0,
                      }}
                    />

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={1}
                        sx={{ alignItems: { sm: 'center' }, mb: 1 }}>
                        <SourceLabel
                          source={article.source}
                          sourceName={article.sourceName}
                        />
                        <Typography
                          variant="caption"
                          sx={{
                            color: (theme) =>
                              theme.customColors.lightTextSecondary,
                          }}>
                          {formatDate(article.pubDate)}
                          {article.author && ` · ${article.author}`}
                        </Typography>
                      </Stack>

                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 700,
                          color: (theme) => theme.customColors.lightText,
                          lineHeight: 1.4,
                          mb: 0.5,
                        }}>
                        {article.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: (theme) =>
                            theme.customColors.lightTextSecondary,
                          lineHeight: 1.6,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}>
                        {article.description}
                      </Typography>

                      {article.categories.length > 0 && (
                        <Stack
                          direction="row"
                          spacing={0.5}
                          sx={{ flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                          {article.categories.slice(0, 4).map((cat) => (
                            <Chip
                              key={cat}
                              label={cat}
                              size="small"
                              sx={{
                                fontSize: '0.6rem',
                                height: 20,
                                background: (theme) =>
                                  theme.customColors.lightChipBg,
                                color: (theme) =>
                                  theme.customColors.lightTextSecondary,
                                border: (theme) =>
                                  `1px solid ${theme.customColors.lightBorder}`,
                              }}
                            />
                          ))}
                        </Stack>
                      )}
                    </Box>

                    <OpenInNewIcon
                      sx={{
                        fontSize: 16,
                        color: (theme) => theme.customColors.lightTextSecondary,
                        flexShrink: 0,
                        mt: 0.5,
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Stack>

            {hasMore && (
              <Stack sx={{ alignItems: 'center', mt: 6 }}>
                <Button
                  onClick={() =>
                    setVisibleCount((prev) => prev + LOAD_MORE_COUNT)
                  }
                  variant="outlined"
                  sx={{
                    fontWeight: 700,
                    borderRadius: '10px',
                    px: 6,
                    py: 1.5,
                    borderColor: (theme) => theme.customColors.lightBorder,
                    color: (theme) => theme.customColors.lightText,
                    '&:hover': {
                      borderColor: 'primary.main',
                      color: 'primary.main',
                      background: (theme) => `${theme.palette.primary.main}11`,
                    },
                  }}>
                  Load more ({filtered.length - visibleCount} remaining)
                </Button>
              </Stack>
            )}
          </>
        )}
      </Container>
    </Box>
  )
}
