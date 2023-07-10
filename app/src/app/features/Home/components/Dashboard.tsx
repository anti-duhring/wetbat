'use client'

import Welcome from './Welcome'
import { Box } from '@mui/material'

const Dashboard = () => {
  return (
    <Box sx={{ display: 'flex', width: '100%', p: 2 }}>
      <Welcome />
    </Box>
  )
}

export default Dashboard
