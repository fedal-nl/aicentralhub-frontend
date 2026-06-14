import { Grid } from '@mui/material'
import ToolCardSkeleton from './ToolCardSkeleton'

interface Props {
  count?: number
}

export default function ToolGridSkeleton({ count = 8 }: Props) {
  return (
    <Grid container spacing={2.5}>
      {Array.from({ length: count }).map((_, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
          <ToolCardSkeleton />
        </Grid>
      ))}
    </Grid>
  )
}
