import { Box, Container, Grid, Skeleton, Stack } from '@mui/material'

export default function ToolDetailSkeleton() {
  return (
    <Box
      sx={{
        background: (theme) => theme.customColors.lightBgAlt,
        minHeight: '100vh',
      }}>
      {/* Hero skeleton */}
      <Box
        sx={{
          background: (theme) => theme.customColors.lightBg,
          borderBottom: (theme) =>
            `1px solid ${theme.customColors.lightBorderSubtle}`,
          py: 6,
        }}>
        <Container maxWidth="xl">
          {/* Breadcrumb */}
          <Stack direction="row" spacing={1} sx={{ mb: 4 }}>
            <Skeleton variant="text" width={60} height={20} />
            <Skeleton variant="text" width={20} height={20} />
            <Skeleton variant="text" width={80} height={20} />
            <Skeleton variant="text" width={20} height={20} />
            <Skeleton variant="text" width={100} height={20} />
          </Stack>

          <Stack
            direction={{ xs: 'column', md: 'row' }}
            sx={{
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', md: 'center' },
              gap: 4,
            }}>
            <Box sx={{ flex: 1 }}>
              {/* Chips */}
              <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                <Skeleton variant="rounded" width={90} height={24} />
                <Skeleton variant="rounded" width={80} height={24} />
                <Skeleton variant="rounded" width={70} height={24} />
              </Stack>

              {/* Title */}
              <Skeleton variant="text" width="50%" height={56} sx={{ mb: 1 }} />

              {/* Description */}
              <Stack spacing={0.5} sx={{ mb: 3 }}>
                <Skeleton variant="text" width="100%" height={20} />
                <Skeleton variant="text" width="90%" height={20} />
                <Skeleton variant="text" width="70%" height={20} />
              </Stack>

              {/* Rating */}
              <Stack
                direction="row"
                spacing={1}
                sx={{ mb: 3, alignItems: 'center' }}>
                <Skeleton variant="rounded" width={120} height={24} />
                <Skeleton variant="text" width={30} height={24} />
                <Skeleton variant="text" width={80} height={24} />
              </Stack>

              {/* Button */}
              <Skeleton variant="rounded" width={180} height={48} />
            </Box>

            {/* Logo placeholder */}
            <Skeleton
              variant="rounded"
              sx={{
                width: { xs: 100, md: 160 },
                height: { xs: 100, md: 160 },
                borderRadius: '24px',
                flexShrink: 0,
              }}
            />
          </Stack>
        </Container>
      </Box>

      {/* Content skeleton */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Stack spacing={3}>
              <Skeleton variant="text" width="40%" height={32} />
              <Stack spacing={1}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    variant="text"
                    width={i % 3 === 2 ? '70%' : '100%'}
                    height={20}
                  />
                ))}
              </Stack>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Skeleton
              variant="rounded"
              height={320}
              sx={{ borderRadius: '16px' }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
