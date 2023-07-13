'use client'

import { Box, Typography, Paper } from '@mui/material'
import CoWorking from '@/assets/hero_dashboard.svg'
import Image from 'next/image'
import StatisticsWelcome from './StatisticsWelcome'

const HERO_IMAGE = {
  width: 250,
  height: 250,
}

const Welcome = () => {
  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        flexWrap: 'wrap',
        background: (theme) =>
          `linear-gradient(to right, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
        color: (theme) => theme.palette.primary.contrastText,
        p: 2,
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography variant="h3">Welcome to your dashboard</Typography>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut
          dolor a arcu semper consequat sit amet eu felis. Aliquam blandit
          euismod urna vel pulvinar. Cras purus enim, fermentum sit amet sem ut,
          egestas cursus magna. Quisque laoreet, leo vel dapibus gravida, augue
          turpis rutrum risus, sit amet mollis quam massa vel ipsum. Suspendisse
          in cursus arcu. Ut ac accumsan ex. Ut volutpat, sapien ac tempus
          vulputate, enim sem maximus massa, ac mattis eros sem sed odio. Nunc
          nisi nibh, ultricies in elit in, consectetur placerat nisi. Aenean
          quis libero arcu. Morbi ut feugiat dolor. Donec accumsan turpis at
          elementum sollicitudin. Integer vel massa ac neque consequat pulvinar.
          Quisque in enim est. Ut ut metus nibh. Nam ex lectus, porta et velit
          ac, convallis condimentum nisl. Proin a malesuada velit.
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <Box>
          <Image
            src={CoWorking}
            width={HERO_IMAGE.width}
            height={HERO_IMAGE.height}
            alt="Co-working"
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <StatisticsWelcome number={101} legend="NEW LEADS" />
          <StatisticsWelcome number={35} legend="QUOTES CREATED" />
          <StatisticsWelcome number={40} legend="PENDING ORDERS" />
        </Box>
      </Box>
    </Paper>
  )
}

export default Welcome
