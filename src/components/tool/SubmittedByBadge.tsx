'use client'

import { Chip } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

interface Props {
  isOwner?: boolean
}

export default function SubmittedByBadge({ isOwner }: Props) {
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
