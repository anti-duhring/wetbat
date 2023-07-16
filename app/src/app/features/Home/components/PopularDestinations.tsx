'use client'

import { usePopularDestinations } from '@/app/core/hooks/usePopularDestinations'
import theme from '@/app/core/theme'
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Divider, IconButton, useMediaQuery } from '@mui/material'

import DestinationsCharts from './DestinationsCharts'
import DestinationsMap from './DestinationsMap'
import Widget from './Widget'
import Loading from './Loading'

const PopularDestinations = () => {
  const { data, isLoading } = usePopularDestinations()
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
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <DestinationsCharts data={data} />
          <Divider orientation="vertical" flexItem />
          <DestinationsMap data={data} />
        </>
      )}
    </Widget>
  )
}

export default PopularDestinations
