'use client'

import './globals.css'

import { CssBaseline, ThemeProvider } from '@mui/material'
import { Inter } from 'next/font/google'

import Navbar from './features/AppBar/components/Navbar'
import theme from './core/theme'
import { ReactNode } from 'react'
import Sidebar from './features/AppBar/components/Sidebar'
import { Box, styled } from '@mui/material'

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
              height: '100vh',
            }}
          >
            <Navbar />
            <Box component="main">
              <DrawerHeader />
              <Sidebar />
            </Box>
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
