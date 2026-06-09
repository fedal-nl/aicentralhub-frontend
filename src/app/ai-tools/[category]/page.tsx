import { notFound } from 'next/navigation'
import { Metadata } from 'next'
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
  Button,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { parentCategories, allTools } from '@/data/mockData'

interface Props {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  return parentCategories.map((cat) => ({ category: cat.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params
  const cat = parentCategories.find((c) => c.slug === slug)
  if (!cat) return {}
  return {
    title: `${cat.name} AI Tools`,
    description: cat.description,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params
  const cat = parentCategories.find((c) => c.slug === slug)
  if (!cat) notFound()

  const toolsInCategory = allTools.filter((t) => t.category === cat.name)

  return (
    <Box sx={{ background: 'background.default', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="xl">
        {/* Back button */}
        <Button
          component={Link}
          href="/ai-tools"
          startIcon={<ArrowBackIcon />}
          sx={{
            color: 'text.secondary',
            mb: 4,
            '&:hover': { color: 'primary.main' },
          }}>
          All Categories
        </Button>

        {/* Header */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="overline"
            sx={{
              color: 'primary.main',

              fontWeight: 700,
              letterSpacing: '0.15em',
            }}>
            Category
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: 'text.primary',
              mt: 0.5,
            }}>
            {cat.name}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',

              mt: 1,
              maxWidth: 600,
            }}>
            {cat.description}
          </Typography>
        </Box>

        {/* Subcategories grid */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: 'text.primary',
            mb: 3,
          }}>
          Subcategories
        </Typography>
        <Grid container spacing={2} sx={{ mb: 8 }}>
          {cat.subcategories.map((sub) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={sub.slug}>
              <Card
                sx={{
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '12px',
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: 'primary.main',
                    background: 'rgba(0,212,255,0.03)',
                    transform: 'translateY(-2px)',
                  },
                }}>
                <CardActionArea
                  component={Link}
                  href={`/ai-tools/${cat.slug}/${sub.slug}`}
                  sx={{ p: 3 }}>
                  <Stack
                    direction="row"
                    sx={{
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: 'text.primary',
                        }}>
                        {sub.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',

                          mt: 0.5,
                        }}>
                        {sub.count.toLocaleString()} tools
                      </Typography>
                    </Box>
                    <ArrowForwardIcon
                      sx={{ color: 'text.secondary', fontSize: 20 }}
                    />
                  </Stack>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Tools in this category */}
        {toolsInCategory.length > 0 && (
          <>
            <Stack
              direction="row"
              sx={{
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
              }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: 'text.primary',
                }}>
                Featured in {cat.name}
              </Typography>
              <Button
                component={Link}
                href={`/ai-tools?category=${encodeURIComponent(cat.name)}`}
                endIcon={<ArrowForwardIcon />}
                sx={{ color: 'primary.main' }}>
                View all
              </Button>
            </Stack>
            <Grid container spacing={2}>
              {toolsInCategory.slice(0, 8).map((tool) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={tool.id}>
                  <Card
                    sx={{
                      background: 'background.paper',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '16px',
                      transition: 'all 0.2s',
                      '&:hover': {
                        borderColor: 'primary.main',
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 32px rgba(0,212,255,0.13)',
                      },
                    }}>
                    <CardActionArea
                      component={Link}
                      href={`/tool/${tool.slug}`}
                      sx={{ p: 3 }}>
                      <Stack
                        direction="row"
                        sx={{
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          mb: 1.5,
                        }}>
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
                            background: 'rgba(0,212,255,0.13)',
                            color: 'primary.main',
                            border: '1px solid rgba(0,212,255,0.27)',
                          }}
                        />
                      </Stack>
                      <Typography
                        variant="h6"
                        sx={{
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
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}>
                        {tool.description}
                      </Typography>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>
    </Box>
  )
}
