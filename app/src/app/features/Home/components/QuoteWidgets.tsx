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
  const [isClient, setIsClient] = useState(false)

  // Reference: https://nextjs.org/docs/messages/react-hydration-error
  useEffect(() => {
    setIsClient(true)
  }, [])

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
      {isClient ? <QuickQuote /> : <LoadingQuickQuoteWidget />}
      <PendingQuotes />
      <NewLeads />
    </Box>
  )
}

const LoadingQuickQuoteWidget = () => {
  return (
    <Widget
      title="Quick quote"
      Icon={FastForwardOutlinedIcon}
      actionButtons={
        <IconButton>
          <FullscreenIcon />
        </IconButton>
      }
      sx={{ flex: 1, flexShrink: 2 }}
      contentSx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <CircularProgress size={70} color="secondary" />
    </Widget>
  )
}

export default QuoteWidgets
