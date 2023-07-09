'use client'

import './globals.css';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { Inter } from 'next/font/google';

import Navbar from './components/Navbar';
import theme from './utils/theme';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
