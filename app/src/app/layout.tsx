'use client'

import './globals.css'

import { CssBaseline, ThemeProvider } from '@mui/material'
import { Inter } from 'next/font/google'

import Navbar from './features/AppBar/components/Navbar'
import theme from './core/theme'
import { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <body className={inter.className}>
          <Navbar />
          {children}
        </body>
      </ThemeProvider>
    </html>
  )
}
