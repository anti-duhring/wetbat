import DestinationsCharts from './DestinationsCharts'
import DestinationsMap from './DestinationsMap'
import Widget from './Widget'
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel'
import { Divider } from '@mui/material' 

const PopularDestinations = () => {
  return (
    <Widget
      title="Popular destinations & packages"
      Icon={ModeOfTravelIcon}
      contentSx={{ display: 'flex', flexDirection: 'row' }}
      sx={{ width: '100%' }}
    >
      <DestinationsCharts />
      <Divider orientation="vertical" flexItem  />
      <DestinationsMap />
    </Widget>
  )
}

export default PopularDestinations
