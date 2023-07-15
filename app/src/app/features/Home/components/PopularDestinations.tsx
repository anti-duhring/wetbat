'use client'

import { usePopularDestinations } from '@/app/core/hooks/usePopularDestinations'
import theme from '@/app/core/theme'
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Divider, IconButton, useMediaQuery } from '@mui/material'

import DestinationsCharts from './DestinationsCharts'
import DestinationsMap from './DestinationsMap'
import DestinationTicket from './DestinationTicket'
import Widget from './Widget'

const PopularDestinations = () => {
  const { data, isLoading, isFetching, refetch } = usePopularDestinations()
  const isMediaQueryAboveSm = useMediaQuery(theme.breakpoints.up('sm'), {
    defaultMatches: true,
  })

  return (
    <Widget
      title="Popular destinations & packages"
      Icon={ModeOfTravelIcon}
      actionButtons={
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      }
      contentSx={{
        display: 'flex',
        flexDirection: isMediaQueryAboveSm ? 'row' : 'column',
      }}
      sx={{ flex: 3 }}
    >
      <DestinationsCharts data={data} />
      <Divider orientation="vertical" flexItem />
      {isMediaQueryAboveSm && <DestinationsMap data={data} />}
      <DestinationTicket />
    </Widget>
  )
}

export default PopularDestinations
