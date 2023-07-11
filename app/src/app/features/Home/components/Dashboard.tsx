'use client'

import { Box } from '@mui/material'

import QuoteWidgets from './QuoteWidgets'
import Welcome from './Welcome'
import NewLeads from './NewLeads'
import PopularDestinations from './PopularDestinations'

const Dashboard = () => {
  return (
    <Box
      sx={{ display: 'flex', width: '100%', p: 2, flexWrap: 'wrap', gap: 2 }}
    >
      <Welcome />
      <QuoteWidgets />
      <PopularDestinations />
    </Box>
  )
}

export default Dashboard
