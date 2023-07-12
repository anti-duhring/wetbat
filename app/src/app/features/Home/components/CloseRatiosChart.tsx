import Widget from './Widget'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, ChartData } from 'chart.js'
import { IconButton, Box } from '@mui/material'
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert'
import theme from '@/app/core/theme'

ChartJS.register(ArcElement)

const data: ChartData<"doughnut", number[], string> = {
  labels: ['Closed', 'Lost'],
  datasets: [
    {
      label: 'Closed deals',
      data: [70, 30],
      backgroundColor: [
        theme.palette.secondary.main,
        theme.palette.error.main
      ],
      borderColor: theme.palette.common.white,
      borderWidth: 5,
    },
  ],
}

const CloseRatiosChart = () => {
  return (
    <Widget
      title="Close ratios"
      Icon={HandshakeOutlinedIcon}
      actionButtons={
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      }

      sx={{ flex: 1 }}
      contentSx={{ display: 'flex', alignItems: 'center',  }}
    >
      <Box >
        <Doughnut data={data} options={{ animation: false }} />
      </Box>
    </Widget>
  )
}

export default CloseRatiosChart
