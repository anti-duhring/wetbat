'use client'

import { Box, Typography } from '@mui/material'

type Props = {
  number: string | number
  legend: string
}

const StatisticsWelcome = ({ number, legend }: Props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: '900',
          color: (theme) => theme.palette.darkOrange,
          textShadow: (theme) => `0 0 3px ${theme.palette.grey[800]}`,
        }}
      >
        {number}
      </Typography>
      <Typography
        variant="h6"
        component="p"
        sx={{ width: 100, wordSpacing: 100, lineHeight: 1 }}
      >
        {legend}
      </Typography>
    </Box>
  )
}

export default StatisticsWelcome
