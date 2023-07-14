import theme from '@/app/core/theme'
import DestinationTicket from './DestinationTicket'
import DestinationsCharts from './DestinationsCharts'
import DestinationsMap from './DestinationsMap'
import Widget from './Widget'
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel'
import { Divider, useMediaQuery, IconButton } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { popularDestinations } from '../utils/destinationsMap'
import { usePopularDestinations } from '@/app/core/hooks/usePopularDestinations'

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
