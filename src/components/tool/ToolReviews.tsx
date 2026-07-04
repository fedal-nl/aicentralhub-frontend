'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {
  Box,
  Typography,
  Rating,
  Stack,
  Divider,
  Button,
  TextField,
  Card,
  CardContent,
  LinearProgress,
  IconButton,
} from '@mui/material'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { Review } from '@/types/review'

interface ToolReviewsProps {
  toolId: number
  reviews: Review[]
  averageRating: number
  reviewCount: number
}

export default function ToolReviews({
  toolId,
  reviews,
  averageRating,
  reviewCount,
}: ToolReviewsProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [userRating, setUserRating] = useState<number | null>(null)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const ratingBreakdown = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
    percent:
      reviews.length > 0
        ? (reviews.filter((r) => r.rating === star).length / reviews.length) *
          100
        : 0,
  }))

  const handleSubmit = async () => {
    if (!userRating || !title || !body) return

    if (status !== 'authenticated') {
      router.push('/login')
      return
    }

    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tool: toolId,
          rating: userRating,
          title,
          body,
        }),
      })

      if (!res.ok) throw new Error('Failed to submit review')

      setSubmitted(true)
      router.refresh()
    } catch {
      setError('Something went wrong submitting your review. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteReview = async (reviewId: number) => {
    try {
      const res = await fetch(`/api/reviews/${reviewId}`, { method: 'DELETE' })
      if (res.ok) {
        router.refresh()
      }
    } catch {
      // silently fail
    }
  }

  const textFieldSx = {
    '& .MuiOutlinedInput-root': {
      color: (theme: import('@mui/material/styles').Theme) =>
        theme.customColors.lightText,
      borderRadius: '10px',
      '& fieldset': {
        borderColor: (theme: import('@mui/material/styles').Theme) =>
          theme.customColors.lightBorder,
      },
      '&:hover fieldset': {
        borderColor: (theme: import('@mui/material/styles').Theme) =>
          theme.customColors.lightTextSecondary,
      },
      '&.Mui-focused fieldset': { borderColor: 'primary.main' },
    },
    '& .MuiInputLabel-root': {
      color: (theme: import('@mui/material/styles').Theme) =>
        theme.customColors.lightTextSecondary,
    },
  }

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 800,
          color: (theme) => theme.customColors.lightText,
          mb: 4,
        }}>
        Ratings & Reviews
      </Typography>

      {/* Rating summary */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} sx={{ mb: 5 }}>
        <Box sx={{ textAlign: 'center', minWidth: 120 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              background: (theme) =>
                `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
            {reviewCount > 0 ? averageRating.toFixed(1) : '—'}
          </Typography>
          <Rating
            value={averageRating}
            precision={0.5}
            readOnly
            sx={{ color: 'primary.main' }}
          />
          <Typography
            variant="body2"
            sx={{
              color: (theme) => theme.customColors.lightTextSecondary,
              mt: 0.5,
            }}>
            {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
          </Typography>
        </Box>

        <Box sx={{ flex: 1 }}>
          {ratingBreakdown.map(({ star, count, percent }) => (
            <Stack
              key={star}
              direction="row"
              spacing={1.5}
              sx={{ alignItems: 'center', mb: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  color: (theme) => theme.customColors.lightTextSecondary,
                  minWidth: 10,
                }}>
                {star}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={percent}
                sx={{
                  flex: 1,
                  height: 8,
                  borderRadius: 4,
                  background: (theme) => theme.customColors.lightBorder,
                  '& .MuiLinearProgress-bar': {
                    background: (theme) =>
                      `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    borderRadius: 4,
                  },
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: (theme) => theme.customColors.lightTextSecondary,
                  minWidth: 20,
                }}>
                {count}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Stack>

      <Divider
        sx={{
          borderColor: (theme) => theme.customColors.lightBorderSubtle,
          mb: 4,
        }}
      />

      {/* Review list */}
      {reviews.length > 0 && (
        <Stack spacing={3} sx={{ mb: 5 }}>
          {reviews.map((review) => (
            <Card
              key={review.id}
              sx={{
                background: (theme) => theme.customColors.lightBgAlt,
                border: (theme) =>
                  `1px solid ${theme.customColors.lightBorder}`,
                borderRadius: '12px',
                boxShadow: 'none',
              }}>
              <CardContent sx={{ p: 3 }}>
                <Stack
                  direction="row"
                  sx={{
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    mb: 1,
                  }}>
                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 700,
                        color: (theme) => theme.customColors.lightText,
                      }}>
                      {review.title}
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ alignItems: 'center', mt: 0.5 }}>
                      <Rating
                        value={review.rating}
                        readOnly
                        size="small"
                        sx={{ color: 'primary.main' }}
                      />
                      <Typography
                        variant="caption"
                        sx={{
                          color: (theme) =>
                            theme.customColors.lightTextSecondary,
                        }}>
                        by {review.username} ·{' '}
                        {new Date(review.created_at).toLocaleDateString(
                          'en-GB',
                          { day: 'numeric', month: 'short', year: 'numeric' },
                        )}
                      </Typography>
                    </Stack>
                  </Box>
                  {session?.backendProfile?.username === review.username && (
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteReview(review.id)}
                      sx={{
                        color: (theme) => theme.customColors.lightTextSecondary,
                        '&:hover': { color: '#FF6B6B' },
                      }}>
                      <DeleteOutlinedIcon fontSize="small" />
                    </IconButton>
                  )}
                </Stack>
                <Typography
                  variant="body2"
                  sx={{
                    color: (theme) => theme.customColors.lightTextSecondary,
                    lineHeight: 1.7,
                  }}>
                  {review.body}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}

      {/* Review form */}
      <Box
        sx={{
          background: (theme) => theme.customColors.lightBg,
          border: (theme) => `1px solid ${theme.customColors.lightBorder}`,
          borderRadius: '16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          p: 4,
        }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: (theme) => theme.customColors.lightText,
            mb: 3,
          }}>
          Write a Review
        </Typography>

        {submitted ? (
          <Typography
            variant="body1"
            sx={{ color: 'primary.main', fontWeight: 600 }}>
            Thank you for your review!
          </Typography>
        ) : (
          <Stack spacing={3}>
            <Box>
              <Typography
                variant="body2"
                sx={{
                  color: (theme) => theme.customColors.lightTextSecondary,
                  mb: 1,
                }}>
                Your rating
              </Typography>
              <Rating
                value={userRating}
                onChange={(_, val) => setUserRating(val)}
                sx={{
                  color: 'primary.main',
                  '& .MuiRating-iconEmpty': {
                    color: (theme) => theme.customColors.lightBorder,
                  },
                }}
              />
            </Box>
            <TextField
              label="Review title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              size="small"
              sx={textFieldSx}
            />
            <TextField
              label="Your review"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              fullWidth
              multiline
              rows={4}
              sx={textFieldSx}
            />
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={!userRating || !title || !body || submitting}
              sx={{
                fontWeight: 700,
                borderRadius: '10px',
                alignSelf: 'flex-start',
                px: 4,
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                color: '#fff',
                '&:hover': {
                  background: (theme) =>
                    `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                },
                '&.Mui-disabled': {
                  background: (theme) => theme.customColors.lightChipBg,
                  color: (theme) => theme.customColors.lightTextSecondary,
                },
              }}>
              {submitting ? 'Submitting...' : 'Submit Review'}
            </Button>
            {error && (
              <Typography variant="body2" sx={{ color: '#FF6B6B' }}>
                {error}
              </Typography>
            )}
            {status !== 'authenticated' && (
              <Typography
                variant="body2"
                sx={{
                  color: (theme) => theme.customColors.lightTextSecondary,
                }}>
                You&apos;ll be asked to log in before submitting.
              </Typography>
            )}
          </Stack>
        )}
      </Box>
    </Box>
  )
}
