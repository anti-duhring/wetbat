'use client'

import { Box } from '@mui/material';

import Charts from './Charts';
import PopularDestinations from './PopularDestinations';
import QuoteWidgets from './QuoteWidgets';
import TeamChat from './TeamChat';
import Welcome from './Welcome';

const Dashboard = () => {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', width: '100%', p: 2, flexWrap: 'wrap', gap: 2 }}
    >
      <Welcome />
      <QuoteWidgets />
      <Box sx={{ display: 'flex', gap: 2, flex: 1, flexWrap: 'wrap',}}>
        <PopularDestinations />
        <TeamChat />
      </Box>
      <Charts />
    </Box>
  )

}

export default Dashboard
