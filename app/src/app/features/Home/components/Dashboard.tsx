'use client'

import { Box } from '@mui/material'

import QuoteWidget from './QuoteWidgets'
import Welcome from './Welcome'

const Dashboard = () => {
  return (
    <Box
      sx={{ display: 'flex', width: '100%', p: 2, flexWrap: 'wrap', gap: 2 }}
    >
      <Welcome />
      <QuoteWidget />
    </Box>
  )
}

export default Dashboard
