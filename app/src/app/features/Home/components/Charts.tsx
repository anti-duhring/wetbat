import { useMediaQuery, Box } from '@mui/material'
import RevenueChart from './RevenueChart'
import theme from '@/app/core/theme'
import CloseRatiosChart from './CloseRatiosChart'

const Charts = () => {
  const isMediaQueryAboveSm = useMediaQuery(theme.breakpoints.up('sm'))
  return (
    <Box sx={{ display: 'flex', flex: 1 , gap: 2}}>
        {isMediaQueryAboveSm && <RevenueChart />}
        <CloseRatiosChart />
    </Box>
  )
}

export default Charts
