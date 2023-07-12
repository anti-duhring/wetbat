import theme from '@/app/core/theme'
import DestinationTicket from './DestinationTicket'
import DestinationsCharts from './DestinationsCharts'
import DestinationsMap from './DestinationsMap'
import Widget from './Widget'
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel'
import { Divider, useMediaQuery, IconButton } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'

const PopularDestinations = () => {
  const isMediaQueryAboveSm = useMediaQuery(theme.breakpoints.up('sm'))

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
      <DestinationsCharts />
      <Divider orientation="vertical" flexItem />
      {isMediaQueryAboveSm && <DestinationsMap />}
      <DestinationTicket />
    </Widget>
  )
}

export default PopularDestinations
