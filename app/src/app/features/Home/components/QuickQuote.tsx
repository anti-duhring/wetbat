'use client'

import {
  IconButton,
  Card,
  CardHeader,
  Typography,
  CardContent,
  Box,
  TextField,
  Select,
  MenuItem
} from '@mui/material'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import FastForwardOutlinedIcon from '@mui/icons-material/FastForwardOutlined'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateField } from '@mui/x-date-pickers'

const QuickQuote = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
          {/* <Box sx={{ display: 'flex', gap: 2}}>
            <DateField label="DEPART DATE" variant='filled' />
            <DateField label="RETURE DATE" variant='filled' />
          </Box> */}
        </CardContent>
      </Card>
    </LocalizationProvider>
  )
}

export default QuickQuote
