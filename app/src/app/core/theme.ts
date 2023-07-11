import { Roboto } from 'next/font/google'
import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
})

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#5F6CAF',
    },
    secondary: {
      main: '#5BBFBA',
    },
    error: {
      main: red.A400,
    },
    neutral: {
      main: '#e6e6e6',
      light: '#edf0f9',
    },
    darkOrange: '#F0CF85',
    darkGrey: '#7e7e7e',
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
})

/**
 * Module augmentation to add custom properties to the theme.
 * Reference: https://mui.com/material-ui/customization/palette/#typescript
 */
declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary']
    darkGrey: string
    darkOrange: string
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral?: PaletteOptions['primary']
    darkGrey?: string
    darkOrange?: string
  }
}

export default theme
