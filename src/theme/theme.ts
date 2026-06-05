import { createTheme } from '@mui/material/styles'

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
      default: '#0A0E1A',
      paper: '#111827',
    },
    text: {
      primary: '#F1F5F9',
      secondary: '#94A3B8',
    },
  },
  typography: {
    fontFamily: '"Syne", sans-serif',
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
