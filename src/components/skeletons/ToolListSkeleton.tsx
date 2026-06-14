import { Box, Skeleton, Stack, Divider } from '@mui/material'

interface Props {
  count?: number
}

export default function ToolListSkeleton({ count = 8 }: Props) {
  return (
    <Box
      sx={{
        background: (theme) => theme.customColors.lightBg,
        border: (theme) => `1px solid ${theme.customColors.lightBorder}`,
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}>
      {Array.from({ length: count }).map((_, index) => (
        <Box key={index}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            sx={{
              alignItems: { xs: 'flex-start', sm: 'center' },
              justifyContent: 'space-between',
              p: 3,
              gap: 2,
            }}>
            <Box sx={{ flex: 1 }}>
              {/* Name + chips */}
              <Stack
                direction="row"
                spacing={1}
                sx={{ alignItems: 'center', mb: 1, flexWrap: 'wrap' }}>
                <Skeleton variant="text" width={120} height={28} />
                <Skeleton variant="rounded" width={80} height={24} />
                <Skeleton variant="rounded" width={70} height={24} />
              </Stack>
              {/* Description */}
              <Stack spacing={0.5}>
                <Skeleton variant="text" width="80%" height={20} />
                <Skeleton variant="text" width="60%" height={20} />
              </Stack>
            </Box>
            {/* Buttons */}
            <Stack direction="row" spacing={1} sx={{ flexShrink: 0 }}>
              <Skeleton variant="rounded" width={80} height={36} />
              <Skeleton variant="rounded" width={80} height={36} />
            </Stack>
          </Stack>
          {index < count - 1 && (
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
