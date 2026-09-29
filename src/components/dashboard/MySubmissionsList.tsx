'use client'

import { Box, Typography, Stack, Divider, CircularProgress, Chip } from '@mui/material'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { BackendTool } from '@/types/tool'

interface MySubmissionsResponse {
  in_review_count: number
  max_in_review: number
  bypass_limit: boolean
  submissions: BackendTool[]
}

const statusLabels: Record<string, string> = {
  pending: 'Pending review',
  on_hold: 'On hold',
  rejected: 'Rejected',
  approved: 'Approved',
}

const statusColors: Record<string, { bg: string; color: string; border: string }> = {
  pending: { bg: '#E8F0FE', color: '#1A56DB', border: '#1A56DB33' },
  on_hold: { bg: '#FFF4E5', color: '#B25E09', border: '#B25E0933' },
  rejected: { bg: '#FDECEC', color: '#C22A2A', border: '#C22A2A33' },
  approved: { bg: '#E8F8EE', color: '#1E7E42', border: '#1E7E4233' },
}

export default function MySubmissionsList() {
  const [submissions, setSubmissions] = useState<BackendTool[]>([])
  const [inReviewCount, setInReviewCount] = useState(0)
  const [maxInReview, setMaxInReview] = useState(5)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    ;(async () => {
      try {
        const res = await fetch('/api/submissions')
        if (!res.ok) throw new Error('Failed to load submissions')
        const data: MySubmissionsResponse = await res.json()
        if (!cancelled) {
          setSubmissions(data.submissions ?? [])
          setInReviewCount(data.in_review_count ?? 0)
          setMaxInReview(data.max_in_review ?? 5)
        }
      } catch {
        if (!cancelled) {
          setError('Could not load your submissions. Please try again later.')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <Box
      sx={{
        background: (theme) => theme.customColors.lightBg,
        border: (theme) => `1px solid ${theme.customColors.lightBorder}`,
        borderRadius: '16px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        p: 4,
      }}>
      <Stack
        direction="row"
        sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: (theme) => theme.customColors.lightText,
          }}>
          My Submissions
        </Typography>
        {!loading && submissions.length > 0 && (
          <Chip
            label={`${inReviewCount} of ${maxInReview} in review`}
            size="small"
            sx={{
              fontWeight: 600,
              background: (theme) => `${theme.palette.primary.main}11`,
              color: 'primary.main',
              border: (theme) => `1px solid ${theme.palette.primary.main}44`,
            }}
          />
        )}
      </Stack>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress size={28} sx={{ color: 'primary.main' }} />
        </Box>
      ) : error ? (
        <Typography variant="body2" sx={{ color: '#FF6B6B' }}>
          {error}
        </Typography>
      ) : submissions.length === 0 ? (
        <Typography
          variant="body2"
          sx={{ color: (theme) => theme.customColors.lightTextSecondary }}>
          You haven&apos;t submitted any tools yet. Use the Submit Tool page to
          add your AI tool to the directory.
        </Typography>
      ) : (
        <Stack spacing={0}>
          {submissions.map((tool, index) => {
            const status = tool.review_status ?? 'pending'
            const palette = statusColors[status] ?? statusColors.pending
            const isLive = status === 'approved' && tool.is_active

            return (
              <Box key={tool.id}>
                <Stack spacing={1} sx={{ py: 2 }}>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    {isLive ? (
                      <Typography
                        variant="body2"
                        component={Link}
                        href={`/tool/${tool.slug}`}
                        sx={{
                          fontWeight: 600,
                          color: (theme) => theme.customColors.lightText,
                          textDecoration: 'none',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          '&:hover': { color: 'primary.main' },
                        }}>
                        {tool.name}
                      </Typography>
                    ) : (
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: (theme) => theme.customColors.lightText,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}>
                        {tool.name}
                      </Typography>
                    )}
                    <Chip
                      label={statusLabels[status] ?? status}
                      size="small"
                      sx={{
                        fontWeight: 600,
                        flexShrink: 0,
                        background: palette.bg,
                        color: palette.color,
                        border: `1px solid ${palette.border}`,
                      }}
                    />
                  </Stack>
                  {tool.review_comment && (
                    <Typography
                      variant="caption"
                      sx={{
                        color: (theme) => theme.customColors.lightTextSecondary,
                      }}>
                      {tool.review_comment}
                    </Typography>
                  )}
                </Stack>
                {index < submissions.length - 1 && (
                  <Divider
                    sx={{
                      borderColor: (theme) =>
                        theme.customColors.lightBorderSubtle,
                    }}
                  />
                )}
              </Box>
            )
          })}
        </Stack>
      )}
    </Box>
  )
}
