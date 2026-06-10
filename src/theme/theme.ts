import { createTheme } from '@mui/material/styles'

// Type augmentation — must be before createTheme
declare module '@mui/material/styles' {
  interface Theme {
    customColors: {
      lightBg: string
      lightBgAlt: string
      lightText: string
      lightTextSecondary: string
      lightBorder: string
      lightBorderSubtle: string
      lightChipBg: string
    }
  }
  interface ThemeOptions {
    customColors?: {
      lightBg?: string
      lightBgAlt?: string
      lightText?: string
      lightTextSecondary?: string
      lightBorder?: string
      lightBorderSubtle?: string
      lightChipBg?: string
    }
  }
}

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00D4FF',
      dark: '#00bfe8',
    },
    secondary: {
      main: '#7B2FFF',
      dark: '#6a1fe0',
    },
    background: {
      default: '#0a111f',
      paper: '#111827',
    },
    text: {
      primary: '#F1F5F9',
      secondary: '#94A3B8',
    },
  },
  // Custom design tokens
  customColors: {
    // Light sections
    lightBg: '#FFFFFF',
    lightBgAlt: '#F8F9FA',
    lightText: '#0a111f',
    lightTextSecondary: '#64748B',
    lightBorder: 'rgba(0,0,0,0.08)',
    lightBorderSubtle: 'rgba(0,0,0,0.06)',
    lightChipBg: 'rgba(0,0,0,0.05)',
  },
  typography: {
    fontFamily: '"Space Grotesk", sans-serif',
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '8px 20px',
        },
      },
    },
  },
})

export default theme
