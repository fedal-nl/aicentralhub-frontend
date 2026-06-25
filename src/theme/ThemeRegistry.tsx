'use client'

import { ReactNode } from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { SessionProvider } from 'next-auth/react'
import theme from './theme'

export default function ThemeRegistry({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </AppRouterCacheProvider>
    </SessionProvider>
  )
}
