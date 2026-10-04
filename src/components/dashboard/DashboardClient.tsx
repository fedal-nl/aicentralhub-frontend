'use client'

import { useState } from 'react'
import { Box, Container, Typography, Grid, Tabs, Tab } from '@mui/material'
import type { Session } from 'next-auth'
import ProfileCard from './ProfileCard'
import FavoritesList from './FavoritesList'
import MySubmissionsList from './MySubmissionsList'
import { BackendProfile } from '@/types/auth'

interface Props {
  profile: BackendProfile
  user: Session['user']
}

export default function DashboardClient({ profile, user }: Props) {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <Box
      sx={{
        background: (theme) => theme.customColors.lightBgAlt,
        minHeight: '100vh',
      }}>
      <Box
        sx={{
          background: (theme) => theme.customColors.lightBg,
          borderBottom: (theme) =>
            `1px solid ${theme.customColors.lightBorderSubtle}`,
          py: 6,
        }}>
        <Container maxWidth="xl">
          <Typography
            variant="overline"
            sx={{
              color: 'primary.main',
              fontWeight: 700,
              letterSpacing: '0.15em',
            }}>
            Account
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: (theme) => theme.customColors.lightText,
              mt: 0.5,
            }}>
            Dashboard
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: (theme) => theme.customColors.lightTextSecondary,
              mt: 1,
            }}>
            Manage your profile, favorite AI tools, and submissions.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <ProfileCard profile={profile} email={user?.email} />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <Tabs
              value={activeTab}
              onChange={(_, value) => setActiveTab(value)}
              sx={{
                mb: 3,
                minHeight: 0,
                borderBottom: (theme) =>
                  `1px solid ${theme.customColors.lightBorderSubtle}`,
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 600,
                  minHeight: 0,
                  py: 1.5,
                },
              }}>
              <Tab label="Favorites" />
              <Tab label="My Submissions" />
            </Tabs>
            {activeTab === 1 ? <MySubmissionsList /> : <FavoritesList />}
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
