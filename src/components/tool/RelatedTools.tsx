'use client'

import { Box, Typography, Grid } from '@mui/material'
import { Tool } from '@/types/tool'
import ToolCard from './ToolCard'

interface RelatedToolsProps {
  tools: Tool[]
  currentSlug: string
}

export default function RelatedTools({
  tools,
  currentSlug,
}: RelatedToolsProps) {
  const related = tools.filter((t) => t.slug !== currentSlug).slice(0, 4)
  if (related.length === 0) return null

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 800,
          color: (theme) => theme.customColors.lightText,
          mb: 4,
        }}>
        Related Tools
      </Typography>
      <Grid container spacing={2.5}>
        {related.map((tool) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={tool.id}>
            <ToolCard tool={tool} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
