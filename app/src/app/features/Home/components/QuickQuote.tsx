'use client'

import {
  IconButton,
  Card,
  CardHeader,
  Typography,
  CardContent,
  Box,
  TextField,
} from '@mui/material'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import FastForwardOutlinedIcon from '@mui/icons-material/FastForwardOutlined'

const QuickQuote = () => {
  return (
    <Card sx={{ minWidth: 300 }} elevation={1}>
      <CardHeader
        title={<Typography variant="h6">Quick Quote</Typography>}
        action={
          <IconButton>
            <FullscreenIcon />
          </IconButton>
        }
        avatar={
          <FastForwardOutlinedIcon
            sx={{ color: (theme) => theme.palette.secondary.main }}
          />
        }
      />
      <CardContent>
        <Box sx={{ display: 'flex', gap: 2}}>
            <TextField label="FROM" variant="filled" />
            <TextField label="DESTINATION" variant="filled" />
        </Box>
      </CardContent>
    </Card>
  )
}

export default QuickQuote
