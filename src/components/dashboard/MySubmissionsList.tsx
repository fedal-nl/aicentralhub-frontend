'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import {
  PaginatedResponse,
  SubmissionStatus,
  ToolSubmission,
} from '@/types/tool'

interface StatusStyle {
  label: string
  bg: string
  color: string
  border: string
}

const statusStyles: Record<SubmissionStatus, StatusStyle> = {
  pending: {
    label: 'Pending',
    bg: '#E8F0FE',
    color: '#1A56DB',
    border: '#1A56DB33',
  },
  in_review: {
    label: 'In review',
    bg: '#F3EAFE',
    color: '#7B3FC4',
    border: '#7B3FC433',
  },
  on_hold: {
    label: 'On hold',
    bg: '#FFF4E5',
    color: '#B25E09',
    border: '#B25E0933',
  },
  rejected: {
    label: 'Rejected',
    bg: '#FDECEC',
    color: '#C22A2A',
    border: '#C22A2A33',
  },
  approved: {
    label: 'Approved',
    bg: '#E8F8EE',
    color: '#1E7E42',
    border: '#1E7E4233',
  },
}

// Anything the backend returns that we don't have a style for renders
// neutrally using the backend's own display label.
const fallbackStyle: Omit<StatusStyle, 'label'> = {
  bg: '#F1F3F5',
  color: '#495057',
  border: '#49505733',
}

function formatSubmittedDate(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default function MySubmissionsList() {
  const [submissions, setSubmissions] = useState<ToolSubmission[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    ;(async () => {
      try {
        const res = await fetch('/api/submissions?page=1')
        if (!res.ok) throw new Error('Failed to load submissions')
        const data: PaginatedResponse<ToolSubmission> = await res.json()
        if (!cancelled) {
          setSubmissions(data.results ?? [])
          setTotalCount(data.count ?? 0)
          setHasMore(Boolean(data.next))
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

  const handleLoadMore = useCallback(async () => {
    const nextPage = page + 1
    setLoadingMore(true)
    setError('')
    try {
      const res = await fetch(`/api/submissions?page=${nextPage}`)
      if (!res.ok) throw new Error('Failed to load more submissions')
      const data: PaginatedResponse<ToolSubmission> = await res.json()
      setSubmissions((prev) => [...prev, ...(data.results ?? [])])
      setTotalCount(data.count ?? 0)
      setHasMore(Boolean(data.next))
      setPage(nextPage)
    } catch {
      setError('Could not load more submissions. Please try again.')
    } finally {
      setLoadingMore(false)
    }
  }, [page])

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
        {!loading && totalCount > 0 && (
          <Chip
            label={`${totalCount} submitted`}
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
      ) : submissions.length === 0 ? (
        error ? (
          <Typography variant="body2" sx={{ color: '#FF6B6B' }}>
            {error}
          </Typography>
        ) : (
          <Typography
            variant="body2"
            sx={{ color: (theme) => theme.customColors.lightTextSecondary }}>
            You haven&apos;t submitted any tools yet. Use the Submit Tool page
            to add your AI tool to the directory.
          </Typography>
        )
      ) : (
        <TableContainer>
          <Table size="small" sx={{ minWidth: 560 }}>
            <TableHead>
              <TableRow
                sx={{
                  '& .MuiTableCell-root': {
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: (theme) => theme.customColors.lightTextSecondary,
                    borderBottom: (theme) =>
                      `1px solid ${theme.customColors.lightBorderSubtle}`,
                    px: 1.5,
                    py: 1,
                  },
                }}>
                <TableCell>Tool</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Submitted</TableCell>
                <TableCell>Comment</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {submissions.map((submission) => {
                const { tool, status } = submission
                const known = statusStyles[status as SubmissionStatus]
                const label = known?.label ?? submission.status_display ?? status
                const style = known ?? fallbackStyle
                const isLive = status === 'approved' && tool.is_active
                const submittedOn = formatSubmittedDate(submission.submitted_at)

                return (
                  <TableRow
                    key={submission.id}
                    sx={{
                      '& .MuiTableCell-root': {
                        borderBottom: (theme) =>
                          `1px solid ${theme.customColors.lightBorderSubtle}`,
                        px: 1.5,
                        py: 1.5,
                        verticalAlign: 'top',
                      },
                      '&:last-child .MuiTableCell-root': {
                        borderBottom: 'none',
                      },
                    }}>
                    <TableCell sx={{ minWidth: 140 }}>
                      {isLive ? (
                        <Typography
                          variant="body2"
                          component={Link}
                          href={`/tool/${tool.slug}`}
                          sx={{
                            fontWeight: 600,
                            color: (theme) => theme.customColors.lightText,
                            textDecoration: 'none',
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
                          }}>
                          {tool.name}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={label}
                        size="small"
                        sx={{
                          fontWeight: 600,
                          background: style.bg,
                          color: style.color,
                          border: `1px solid ${style.border}`,
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: (theme) =>
                            theme.customColors.lightTextSecondary,
                        }}>
                        {submittedOn || '—'}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ minWidth: 180 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: (theme) =>
                            submission.comments
                              ? theme.customColors.lightText
                              : theme.customColors.lightTextSecondary,
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-word',
                        }}>
                        {submission.comments || '—'}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {!loading && hasMore && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button
            variant="outlined"
            size="small"
            onClick={handleLoadMore}
            disabled={loadingMore}
            sx={{ borderRadius: '8px' }}>
            {loadingMore ? 'Loading…' : 'Load more'}
          </Button>
        </Box>
      )}

      {!loading && submissions.length > 0 && error && (
        <Typography variant="body2" sx={{ color: '#FF6B6B', mt: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  )
}
