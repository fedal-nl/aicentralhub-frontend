'use client'

import { Box, Grid, Typography } from '@mui/material'
import { Tool } from '@/types/tool'
import ToolCard from '@/components/tool/ToolCard'

interface ToolsGridProps {
  tools: Tool[]
}

export default function ToolsGrid({ tools }: ToolsGridProps) {
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
    <Grid container spacing={2.5}>
      {tools.map((tool) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={tool.id}>
          <ToolCard tool={tool} />
        </Grid>
      ))}
    </Grid>
  )
}
