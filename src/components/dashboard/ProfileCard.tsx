'use client'

import { Box, Typography, Avatar, Stack, Chip, Divider } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import GitHubIcon from '@mui/icons-material/GitHub'

interface BackendProfile {
  id: number
  username: string
  social_provider: string
  social_uid: string
  display_name: string
  avatar_url: string
  subscribed_at: string
  updated_at: string
}

interface Props {
  profile: BackendProfile
  email?: string | null
}

const providerIcons: Record<string, React.ReactNode> = {
  google: <GoogleIcon fontSize="small" />,
  github: <GitHubIcon fontSize="small" />,
}

export default function ProfileCard({ profile, email }: Props) {
  const memberSince = new Date(profile.subscribed_at).toLocaleDateString(
    'en-GB',
    {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    },
  )

  return (
    <Box
      sx={{
        background: (theme) => theme.customColors.lightBg,
        border: (theme) => `1px solid ${theme.customColors.lightBorder}`,
        borderRadius: '16px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        p: 4,
        textAlign: 'center',
      }}>
      <Avatar
        src={profile.avatar_url}
        alt={profile.display_name}
        sx={{
          width: 88,
          height: 88,
          mx: 'auto',
          mb: 2,
          border: (theme) => `3px solid ${theme.palette.primary.main}33`,
        }}
      />
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          color: (theme) => theme.customColors.lightText,
        }}>
        {profile.display_name || profile.username}
      </Typography>
      {email && (
        <Typography
          variant="body2"
          sx={{
            color: (theme) => theme.customColors.lightTextSecondary,
            mb: 2,
          }}>
          {email}
        </Typography>
      )}

      <Stack
        direction="row"
        spacing={1}
        sx={{ justifyContent: 'center', mb: 3 }}>
        <Chip
          icon={providerIcons[profile.social_provider] as React.ReactElement}
          label={
            profile.social_provider.charAt(0).toUpperCase() +
            profile.social_provider.slice(1)
          }
          size="small"
          sx={{
            background: (theme) => theme.customColors.lightChipBg,
            border: (theme) => `1px solid ${theme.customColors.lightBorder}`,
            color: (theme) => theme.customColors.lightTextSecondary,
          }}
        />
      </Stack>

      <Divider
        sx={{
          borderColor: (theme) => theme.customColors.lightBorderSubtle,
          mb: 3,
        }}
      />

      <Stack spacing={1.5}>
        <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="caption"
            sx={{ color: (theme) => theme.customColors.lightTextSecondary }}>
            Username
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: (theme) => theme.customColors.lightText,
              fontWeight: 600,
            }}>
            {profile.username}
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="caption"
            sx={{ color: (theme) => theme.customColors.lightTextSecondary }}>
            Member since
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: (theme) => theme.customColors.lightText,
              fontWeight: 600,
            }}>
            {memberSince}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  )
}
