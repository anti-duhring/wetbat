'use client'

import QuickQuote from './QuickQuote'
import Welcome from './Welcome'
import { Box } from '@mui/material'

const Dashboard = () => {
  return (
    <Box
      sx={{ display: 'flex', width: '100%', p: 2, flexWrap: 'wrap', gap: 2 }}
    >
      <Welcome />
      <QuickQuote />
    </Box>
  )
}

export default Dashboard
