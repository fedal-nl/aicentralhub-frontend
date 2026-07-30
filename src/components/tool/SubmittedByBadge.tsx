'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Chip } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

interface Props {
  slug: string
}

export default function SubmittedByBadge({ slug }: Props) {
  const { status } = useSession()
  const [isOwner, setIsOwner] = useState(false)

  useEffect(() => {
    if (status !== 'authenticated') return

    let cancelled = false

    const checkOwnership = async () => {
      try {
        const res = await fetch(`/api/tool-status/${slug}`)
        const data = await res.json()
        if (!cancelled && data.isCreatedByCurrentUser) {
          setIsOwner(true)
        }
      } catch {
        // silently fail, badge just doesn't show
      }
    }

    checkOwnership()
    return () => {
      cancelled = true
    }
  }, [slug, status])

  if (!isOwner) return null

  return (
    <Chip
      icon={
        <CheckCircleIcon sx={{ fontSize: '1rem', color: 'success.main' }} />
      }
      label="Submitted by you"
      size="small"
      sx={{
        fontWeight: 600,
        fontSize: '0.75rem',
        background: (theme) => `${theme.palette.success.main}22`,
        color: 'success.main',
        border: (theme) => `1px solid ${theme.palette.success.main}44`,
        ml: 1.5,
      }}
    />
  )
}
