'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useScrollTrigger,
  Slide,
  Container,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'

const navLinks = [
  { label: 'Featured Tools', href: '/featured-tools' },
  { label: 'AI Tools', href: '/ai-tools' },
  { label: 'Categories', href: '/categories' },
  { label: 'Submit a Tool', href: '/submit-tool' },
  { label: 'Contact', href: '/contact' },
]
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const trigger = useScrollTrigger({ threshold: 20 })
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <>
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            background: '#0a111f',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            transition: 'all 0.3s ease',
          }}>
          <Container maxWidth="xl">
            <Toolbar
              disableGutters
              sx={{ height: 90, justifyContent: 'space-between' }}>
              {/* Logo */}
              <Link href="/">
                <Image
                  src="/assets/ai-centralhub-logo-dark-version.png"
                  alt="AI CentralHub"
                  width={330}
                  height={90}
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </Link>

              {/* Desktop Nav Links */}
              <Box
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  gap: 1,
                  alignItems: 'center',
                }}>
                {navLinks.map((link) => (
                  <Button
                    key={link.href}
                    component={Link}
                    href={link.href}
                    sx={{
                      fontWeight: isActive(link.href) ? 700 : 500,
                      fontSize: '0.95rem',
                      color: isActive(link.href)
                        ? 'primary.main'
                        : 'text.secondary',
                      borderBottom: isActive(link.href)
                        ? (theme) => `2px solid ${theme.palette.primary.main}`
                        : '2px solid transparent',
                      borderRadius: 0,
                      px: 1.5,
                      pb: 0.5,
                      transition: 'all 0.2s',
                      '&:hover': {
                        color: 'primary.main',
                        background: 'transparent',
                        borderBottom: (theme) =>
                          `2px solid ${theme.palette.primary.main}66`,
                      },
                    }}>
                    {link.label}
                  </Button>
                ))}
              </Box>

              {/* Auth Buttons — hidden for now, change display to 'flex' when ready */}
              <Box sx={{ display: 'none', gap: 1.5, alignItems: 'center' }}>
                <Button
                  component={Link}
                  href="/login"
                  variant="text"
                  sx={{
                    color: 'text.secondary',

                    '&:hover': { color: 'primary.main' },
                  }}>
                  Login
                </Button>
                <Button
                  component={Link}
                  href="/signup"
                  variant="contained"
                  sx={{
                    background: (theme) =>
                      `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    color: '#fff',

                    '&:hover': {
                      background: (theme) =>
                        `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                    },
                  }}>
                  Sign Up
                </Button>
              </Box>

              {/* Mobile Menu Icon */}
              <IconButton
                sx={{ display: { md: 'none' }, color: 'text.primary' }}
                onClick={() => setMobileOpen(true)}>
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
      </Slide>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: 260,
              background: (theme) => theme.palette.background.paper,
              borderLeft: '1px solid rgba(255,255,255,0.06)',
            },
          },
        }}>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton
            onClick={() => setMobileOpen(false)}
            sx={{ color: 'text.primary' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {navLinks.map((link) => (
            <ListItem key={link.href} disablePadding>
              <ListItemButton
                component={Link}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                sx={{
                  px: 3,
                  borderLeft: isActive(link.href)
                    ? (theme) => `3px solid ${theme.palette.primary.main}`
                    : '3px solid transparent',
                  background: isActive(link.href)
                    ? (theme) => `${theme.palette.primary.main}11`
                    : 'transparent',
                  '&:hover': { color: 'primary.main' },
                }}>
                <ListItemText
                  primary={link.label}
                  slotProps={{
                    primary: {
                      sx: {
                        fontWeight: isActive(link.href) ? 700 : 500,
                        color: isActive(link.href)
                          ? 'primary.main'
                          : 'text.secondary',
                      },
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Toolbar spacer */}
      <Toolbar sx={{ height: 70 }} />
    </>
  )
}
