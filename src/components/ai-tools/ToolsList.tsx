'use client'

import { Box, Typography, Divider } from '@mui/material'
import { Tool } from '@/types/tool'
import ToolListRow from '@/components/tool/ToolListRow'

interface ToolsListProps {
  tools: Tool[]
}

export default function ToolsList({ tools }: ToolsListProps) {
  if (tools.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 12 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: (theme) => theme.customColors.lightText,
            mb: 1,
          }}>
          No tools found
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: (theme) => theme.customColors.lightTextSecondary }}>
          Try adjusting your search or filters
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        background: (theme) => theme.customColors.lightBg,
        border: (theme) => `1px solid ${theme.customColors.lightBorder}`,
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}>
      {tools.map((tool, index) => (
        <Box key={tool.id}>
          <ToolListRow tool={tool} />
          {index < tools.length - 1 && (
            <Divider
              sx={{
                borderColor: (theme) => theme.customColors.lightBorderSubtle,
              }}
            />
          )}
        </Box>
      ))}
    </Box>
  )
}
