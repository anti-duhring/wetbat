import { IconButton, Box } from '@mui/material'
import Widget from './Widget'
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions 
} from 'chart.js'
import { faker } from '@faker-js/faker'
import theme from '@/app/core/theme'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

export const options: ChartOptions  = {
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Revenue from this year',
    },
  },
  animation: false
}

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

const data = {
  labels,
  datasets: [
    {
      label: 'Foo',
      data: labels.map(() => faker.number.float({ min: 0, max: 20000 })),
      borderColor: theme.palette.primary.main,
      backgroundColor: theme.palette.common.white,
    },
    {
      label: 'Bar',
      data: labels.map(() => faker.number.float({ min: 0, max: 20000 })),
      borderColor: theme.palette.secondary.main,
      backgroundColor: theme.palette.common.white,
    },
  ],
}

const RevenueChart = () => {
  return (
    <Widget
      title="Revenue"
      Icon={SignalCellularAltIcon}
      actionButtons={
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      }
      sx={{ flex: 2 }}
      contentSx={{ display: 'flex', alignItems: 'center'  }}
    >
      <Box sx={{ width: '100%' }}>
        <Line options={options} data={data} updateMode='hide' />
      </Box>
    </Widget>
  )
}

export default RevenueChart
