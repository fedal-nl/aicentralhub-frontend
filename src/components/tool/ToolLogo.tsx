'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Box } from '@mui/material'

interface ToolLogoProps {
  logo?: string
  name: string
  size?: number
  borderRadius?: number
}

// Deterministic color from the tool name, so the same tool always
// gets the same fallback color instead of a random one on every render.
function colorFromName(name: string) {
  const colors = [
    '#6366F1',
    '#8B5CF6',
    '#EC4899',
    '#F59E0B',
    '#10B981',
    '#3B82F6',
    '#EF4444',
    '#14B8A6',
  ]
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return colors[hash % colors.length]
}

export default function ToolLogo({
  logo,
  name,
  size = 40,
  borderRadius = 10,
}: ToolLogoProps) {
  const [failed, setFailed] = useState(false)

  if (!logo || failed) {
    return (
      <Box
        sx={{
          width: size,
          height: size,
          borderRadius: `${borderRadius}px`,
          background: colorFromName(name),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          color: '#fff',
          fontWeight: 700,
          fontSize: size * 0.42,
        }}>
        {name.charAt(0).toUpperCase()}
      </Box>
    )
  }

  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: `${borderRadius}px`,
        overflow: 'hidden',
        flexShrink: 0,
        position: 'relative',
        background: (theme) => theme.customColors.lightChipBg,
      }}>
      <Image
        src={logo}
        alt={`${name} logo`}
        fill
        sizes={`${size}px`}
        style={{ objectFit: 'contain', padding: size * 0.1 }}
        onError={() => setFailed(true)}
      />
    </Box>
  )
}
