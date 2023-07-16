'use client'

import './globals.css'

import {
  Box,
  CssBaseline,
  styled,
  ThemeProvider,
  useMediaQuery,
} from '@mui/material'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'

import theme from './core/theme'
import { DrawerOrSidebarComponent } from './features/AppBar'
import { Provider } from './core'

const inter = Inter({ subsets: ['latin'] })

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <body className={inter.className}>
          <Provider>
            <Box
              sx={{
                display: 'flex',
                backgroundColor: (theme) => theme.palette.neutral.light,
              }}
            >
              <DrawerOrSidebarComponent />
              <Box
                component="main"
                sx={{ p: 2, ml: { md: 27, lg: 27 }, width: '100%' }}
              >
                <DrawerHeader />
                {children}
              </Box>
            </Box>
          </Provider>
        </body>
      </ThemeProvider>
    </html>
  )
}
