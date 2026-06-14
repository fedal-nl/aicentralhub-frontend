import { Box, Skeleton, Stack, Card, CardContent } from '@mui/material'

interface Props {
  count?: number
}

export default function FeaturedToolsSkeleton({ count = 6 }: Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2.5,
        overflowX: 'auto',
        pb: 2,
        pt: 1,
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
      }}>
      {Array.from({ length: count }).map((_, index) => (
        <Card
          key={index}
          sx={{
            minWidth: 260,
            maxWidth: 260,
            flexShrink: 0,
            background: (theme) => theme.customColors.lightBg,
            border: (theme) => `1px solid ${theme.customColors.lightBorder}`,
            borderRadius: '16px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          }}>
          <CardContent sx={{ p: 3 }}>
            <Stack spacing={2}>
              <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                <Skeleton variant="rounded" width={80} height={24} />
                <Skeleton variant="rounded" width={70} height={24} />
              </Stack>
              <Skeleton variant="text" width="60%" height={28} />
              <Stack spacing={0.5}>
                <Skeleton variant="text" width="100%" height={20} />
                <Skeleton variant="text" width="100%" height={20} />
                <Skeleton variant="text" width="60%" height={20} />
              </Stack>
              <Stack direction="row" spacing={1} sx={{ pt: 1 }}>
                <Skeleton variant="rounded" width="50%" height={36} />
                <Skeleton variant="rounded" width="50%" height={36} />
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}
