'use client'

import { Box } from '@mui/material'
import QuickQuote from './QuickQuote'
import PendingQuotes from './PendingQuotes'
import NewLeads from './NewLeads'
import { useEffect, useState } from 'react'
import Widget from './Widget'
import { SvgIconTypeMap, IconButton, CircularProgress } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import FastForwardOutlinedIcon from '@mui/icons-material/FastForwardOutlined'
import FullscreenIcon from '@mui/icons-material/Fullscreen'

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
      {isClient ? (
        <QuickQuote />
      ) : (
        <LoadingWidget Icon={FastForwardOutlinedIcon} title="Quick quote" />
      )}
      <PendingQuotes />
      <NewLeads />
    </Box>
  )
}

type TLoadingWidgetProps = {
  title: string
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string
  }
}
const LoadingWidget = ({ title, Icon }: TLoadingWidgetProps) => {
  return (
    <Widget
      title={title}
      Icon={Icon}
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
