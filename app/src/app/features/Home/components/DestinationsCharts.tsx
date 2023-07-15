'use client'

import {
  Box,
  LinearProgress,
  linearProgressClasses,
  Typography,
} from '@mui/material'

type Props = {
  data?: TAirport[]
}
const DestinationsCharts = ({ data }: Props) => {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
      }}
    >
      {data?.map(({ quotesDestination, ...item }, index) => (
        <Box key={item.name}>
          <Typography component="div" variant="subtitle1">
            {item.name}
          </Typography>

          <LinearProgress
            variant="determinate"
            value={(quotesDestination?.length ?? 0) * 10}
            sx={{
              height: 10,
              borderRadius: 5,
              [`&.${linearProgressClasses.colorPrimary}`]: {
                backgroundColor: (theme) => theme.palette.grey[200],
              },
              [`& .${linearProgressClasses.bar}`]: {
                borderRadius: 5,
                backgroundColor: (theme) =>
                  theme.palette.progressbarColors[index],
              },
            }}
          />
        </Box>
      ))}
    </Box>
  )
}

export default DestinationsCharts
