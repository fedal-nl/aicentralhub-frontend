'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
} from '@mui/material'
import CelebrationIcon from '@mui/icons-material/Celebration'

const SEEN_KEY_PREFIX = 'aich_welcome_seen_'

export default function WelcomeNewUserDialog() {
  const { data: session, status } = useSession()
  const [dismissed, setDismissed] = useState(false)

  const userId = session?.user?.id ?? session?.user?.email
  const seenKey = userId ? `${SEEN_KEY_PREFIX}${userId}` : null

  // Safe on the server: typeof window is 'undefined' during SSR, so this
  // just evaluates to null there — no crash, no effect needed.
  const alreadySeen =
    typeof window !== 'undefined' && seenKey
      ? window.localStorage.getItem(seenKey)
      : null

  // Derived directly from render — status starts as 'loading' on both
  // server and initial client render (useSession fetches async), so this
  // is false on first paint either way. No hydration mismatch.
  const shouldShow =
    status === 'authenticated' &&
    Boolean(session?.isNewUser) &&
    !alreadySeen &&
    !dismissed

  const handleClose = () => {
    if (seenKey) {
      window.localStorage.setItem(seenKey, 'true')
    }
    setDismissed(true)
  }

  return (
    <Dialog open={shouldShow} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogContent sx={{ textAlign: 'center', py: 5 }}>
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: (theme) => `${theme.palette.primary.main}22`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 2,
            color: 'primary.main',
          }}>
          <CelebrationIcon fontSize="large" />
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
          Welcome to AI CentralHub!
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Your account is all set up. Browse tools, save favorites, and leave
          reviews on the ones you&apos;ve used.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
        <Button
          variant="contained"
          onClick={handleClose}
          sx={{ fontWeight: 700, borderRadius: '10px', px: 4 }}>
          Get Started
        </Button>
      </DialogActions>
    </Dialog>
  )
}
