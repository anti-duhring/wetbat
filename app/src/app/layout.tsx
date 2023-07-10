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
          <Box
            sx={{
              display: 'flex',
            }}
          >
            <DrawerOrSidebarComponent />
            <Box component="main">
              <DrawerHeader />
              {children}
            </Box>
          </Box>
        </body>
      </ThemeProvider>
    </html>
  )
}
