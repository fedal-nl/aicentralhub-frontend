'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
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
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import DashboardIcon from '@mui/icons-material/Dashboard'
import LogoutIcon from '@mui/icons-material/Logout'

const navLinks = [
  { label: 'Featured Tools', href: '/featured-tools' },
  { label: 'AI Tools', href: '/ai-tools' },
  { label: 'Categories', href: '/categories' },
  { label: 'AI News', href: '/news' },
  { label: 'Submit a Tool', href: '/submit-tool' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null)
  const trigger = useScrollTrigger({ threshold: 20 })
  const pathname = usePathname()
  const { data: session, status } = useSession()

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  const handleUserMenuOpen = (e: React.MouseEvent<HTMLElement>) =>
    setUserMenuAnchor(e.currentTarget)
  const handleUserMenuClose = () => setUserMenuAnchor(null)

  const renderDesktopAuth = () => {
    if (status === 'loading') {
      return <Box sx={{ width: 120, height: 36 }} />
    }

    if (status === 'authenticated' && session?.user) {
      return (
        <>
          <IconButton onClick={handleUserMenuOpen} size="small">
            <Avatar
              src={
                session.backendProfile?.avatar_url ??
                session.user.image ??
                undefined
              }
              alt={session.user.name ?? 'User'}
              sx={{
                width: 36,
                height: 36,
                border: (theme) => `2px solid ${theme.palette.primary.main}66`,
              }}
            />
          </IconButton>
          <Menu
            anchorEl={userMenuAnchor}
            open={Boolean(userMenuAnchor)}
            onClose={handleUserMenuClose}
            slotProps={{
              paper: {
                sx: {
                  background: '#111827',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '12px',
                  minWidth: 200,
                  mt: 1,
                },
              },
            }}>
            <Box sx={{ px: 2, py: 1.5 }}>
              <Box
                sx={{
                  color: 'text.primary',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                }}>
                {session.user.name}
              </Box>
              <Box sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                {session.user.email}
              </Box>
            </Box>
            <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />
            <MenuItem
              component={Link}
              href="/dashboard"
              onClick={handleUserMenuClose}
              sx={{
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' },
              }}>
              <DashboardIcon fontSize="small" sx={{ mr: 1.5 }} />
              Dashboard
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleUserMenuClose()
                signOut({ callbackUrl: '/' })
              }}
              sx={{ color: 'text.secondary', '&:hover': { color: '#FF6B6B' } }}>
              <LogoutIcon fontSize="small" sx={{ mr: 1.5 }} />
              Sign Out
            </MenuItem>
          </Menu>
        </>
      )
    }

    return (
      <>
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
      </>
    )
  }

  const renderMobileAuth = () => {
    if (status === 'loading') return null

    if (status === 'authenticated') {
      return (
        <>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              href="/dashboard"
              onClick={() => setMobileOpen(false)}>
              <DashboardIcon
                fontSize="small"
                sx={{ mr: 1.5, color: 'text.secondary' }}
              />
              <ListItemText
                primary="Dashboard"
                slotProps={{ primary: { sx: { color: 'text.secondary' } } }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                setMobileOpen(false)
                signOut({ callbackUrl: '/' })
              }}>
              <LogoutIcon
                fontSize="small"
                sx={{ mr: 1.5, color: 'text.secondary' }}
              />
              <ListItemText
                primary="Sign Out"
                slotProps={{ primary: { sx: { color: 'text.secondary' } } }}
              />
            </ListItemButton>
          </ListItem>
        </>
      )
    }

    return (
      <>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            href="/login"
            onClick={() => setMobileOpen(false)}>
            <ListItemText
              primary="Login"
              slotProps={{ primary: { sx: { color: 'text.secondary' } } }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            href="/signup"
            onClick={() => setMobileOpen(false)}>
            <ListItemText
              primary="Sign Up"
              slotProps={{
                primary: { sx: { color: 'primary.main', fontWeight: 700 } },
              }}
            />
          </ListItemButton>
        </ListItem>
      </>
    )
  }

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

              {/* Desktop Auth */}
              <Box
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  gap: 1.5,
                  alignItems: 'center',
                }}>
                {renderDesktopAuth()}
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

        {status === 'authenticated' && session?.user && (
          <>
            <Box
              sx={{
                px: 3,
                py: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
              }}>
              <Avatar
                src={
                  session.backendProfile?.avatar_url ??
                  session.user.image ??
                  undefined
                }
                alt={session.user.name ?? 'User'}
                sx={{ width: 40, height: 40 }}
              />
              <Box>
                <Box
                  sx={{
                    color: 'text.primary',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                  }}>
                  {session.user.name}
                </Box>
                <Box sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                  {session.user.email}
                </Box>
              </Box>
            </Box>
            <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />
          </>
        )}

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

          <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', my: 1 }} />

          {renderMobileAuth()}
        </List>
      </Drawer>

      {/* Toolbar spacer */}
      <Toolbar sx={{ height: 90 }} />
    </>
  )
}
