import { Box, Card, CardContent, Skeleton, Stack } from '@mui/material'

export default function ToolCardSkeleton() {
  return (
    <Card
      sx={{
        height: '100%',
        background: (theme) => theme.customColors.lightBg,
        border: (theme) => `1px solid ${theme.customColors.lightBorder}`,
        borderRadius: '16px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}>
      <CardContent sx={{ p: 3 }}>
        <Stack spacing={2}>
          {/* Category + pricing chips */}
          <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
            <Skeleton variant="rounded" width={80} height={24} />
            <Skeleton variant="rounded" width={70} height={24} />
          </Stack>

          {/* Tool name */}
          <Skeleton variant="text" width="60%" height={28} />

          {/* Description */}
          <Stack spacing={0.5}>
            <Skeleton variant="text" width="100%" height={20} />
            <Skeleton variant="text" width="100%" height={20} />
            <Skeleton variant="text" width="70%" height={20} />
          </Stack>

          {/* Buttons */}
          <Stack direction="row" spacing={1} sx={{ pt: 1 }}>
            <Skeleton variant="rounded" width="50%" height={36} />
            <Skeleton variant="rounded" width="50%" height={36} />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}
