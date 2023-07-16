'use client'

import FastForwardOutlinedIcon from '@mui/icons-material/FastForwardOutlined'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import { Box, CircularProgress, IconButton } from '@mui/material'
import { useEffect, useState } from 'react'

import NewLeads from './NewLeads'
import PendingQuotes from './PendingQuotes'
import QuickQuote from './QuickQuote'
import Widget from './Widget'

const QuoteWidgets = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        flexWrap: 'wrap',
        width: '100%',
      }}
    >
      <QuickQuote />
      <PendingQuotes />
      <NewLeads />
    </Box>
  )
}

export default QuoteWidgets
