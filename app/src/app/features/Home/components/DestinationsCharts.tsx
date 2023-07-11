import {
  Box,
  LinearProgress,
  linearProgressClasses,
  Typography,
} from '@mui/material'

const charts = [
  {
    destine: 'New York',
    value: 100,
  },
  {
    destine: 'London',
    value: 50,
  },
  {
    destine: 'Peru',
    value: 50,
  },
  {
    destine: 'Tokyo',
    value: 100,
  },
  {
    destine: 'Sydney',
    value: 60,
  },
  {
    destine: 'Hong Kong',
    value: 80,
  },
]

const DestinationsCharts = () => {
  return (
    <Box sx={{ flex: 1 }}>
      {charts.map((item, index) => {
        return (
          <Box key={item.destine}>
            <Typography component="div" variant="subtitle1">
              {item.destine}
            </Typography>

            <LinearProgress
              variant="determinate"
              value={item.value}
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
        )
      })}
    </Box>
  )
}

export default DestinationsCharts
