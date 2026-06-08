'use client'

import { useState } from 'react'
import {
  Box,
  Typography,
  Rating,
  Stack,
  Divider,
  Button,
  TextField,
  Card,
  LinearProgress,
} from '@mui/material'
import { Review } from '@/types/review'

interface ToolReviewsProps {
  reviews: Review[]
  averageRating: number
  reviewCount: number
}

export default function ToolReviews({
  reviews,
  averageRating,
  reviewCount,
}: ToolReviewsProps) {
  const [userRating, setUserRating] = useState<number | null>(null)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const ratingBreakdown = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
    percent:
      reviews.length > 0
        ? (reviews.filter((r) => r.rating === star).length / reviews.length) *
          100
        : 0,
  }))

  const handleSubmit = () => {
    if (!userRating || !title || !body) return
    setSubmitted(true)
  }

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: 800,
          color: 'text.primary',
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
              fontFamily: 'Syne, sans-serif',
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
              color: 'text.secondary',
              fontFamily: 'Syne, sans-serif',
              mt: 0.5,
            }}>
            {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
          </Typography>
        </Box>

        {/* Breakdown bars */}
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
                  color: 'text.secondary',
                  fontFamily: 'Syne, sans-serif',
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
                  background: 'rgba(255,255,255,0.06)',
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
                  color: 'text.secondary',
                  fontFamily: 'Syne, sans-serif',
                  minWidth: 20,
                }}>
                {count}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Stack>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', mb: 4 }} />

      {/* Existing reviews */}
      {reviews.length > 0 && (
        <Stack spacing={3} sx={{ mb: 5 }}>
          {reviews.map((review) => (
            <Card
              key={review.id}
              sx={{
                background: (theme) => theme.palette.background.paper,
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '12px',
                p: 3,
              }}>
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
                      fontFamily: 'Syne, sans-serif',
                      fontWeight: 700,
                      color: 'text.primary',
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
                        color: 'text.secondary',
                        fontFamily: 'Syne, sans-serif',
                      }}>
                      by {review.author} ·{' '}
                      {new Date(review.date).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  fontFamily: 'Syne, sans-serif',
                  lineHeight: 1.7,
                }}>
                {review.body}
              </Typography>
            </Card>
          ))}
        </Stack>
      )}

      {/* Submit review form */}
      <Box
        sx={{
          background: (theme) => theme.palette.background.paper,
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '16px',
          p: 4,
        }}>
        <Typography
          variant="h6"
          sx={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 700,
            color: 'text.primary',
            mb: 3,
          }}>
          Write a Review
        </Typography>

        {submitted ? (
          <Typography
            variant="body1"
            sx={{
              color: 'primary.main',
              fontFamily: 'Syne, sans-serif',
              fontWeight: 600,
            }}>
            Thank you for your review!
          </Typography>
        ) : (
          <Stack spacing={3}>
            <Box>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  fontFamily: 'Syne, sans-serif',
                  mb: 1,
                }}>
                Your rating
              </Typography>
              <Rating
                value={userRating}
                onChange={(_, val) => setUserRating(val)}
                sx={{ color: 'primary.main' }}
              />
            </Box>
            <TextField
              label="Review title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  fontFamily: 'Syne, sans-serif',
                  color: 'text.primary',
                  borderRadius: '10px',
                  '& fieldset': { borderColor: 'rgba(255,255,255,0.12)' },
                  '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.24)' },
                  '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                },
                '& .MuiInputLabel-root': {
                  fontFamily: 'Syne, sans-serif',
                  color: 'text.secondary',
                },
              }}
            />
            <TextField
              label="Your review"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              fullWidth
              multiline
              rows={4}
              sx={{
                '& .MuiOutlinedInput-root': {
                  fontFamily: 'Syne, sans-serif',
                  color: 'text.primary',
                  borderRadius: '10px',
                  '& fieldset': { borderColor: 'rgba(255,255,255,0.12)' },
                  '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.24)' },
                  '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                },
                '& .MuiInputLabel-root': {
                  fontFamily: 'Syne, sans-serif',
                  color: 'text.secondary',
                },
              }}
            />
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={!userRating || !title || !body}
              sx={{
                fontFamily: 'Syne, sans-serif',
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
                  background: 'rgba(255,255,255,0.08)',
                  color: 'text.secondary',
                },
              }}>
              Submit Review
            </Button>
          </Stack>
        )}
      </Box>
    </Box>
  )
}
