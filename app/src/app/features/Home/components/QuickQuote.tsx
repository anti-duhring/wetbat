'use client'

import { IconButton, Box, TextField, Button } from '@mui/material'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import FastForwardOutlinedIcon from '@mui/icons-material/FastForwardOutlined'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateField } from '@mui/x-date-pickers'
import Widget from './Widget'

const QuickQuote = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Widget
        title="Quick quote"
        Icon={FastForwardOutlinedIcon}
        actionButtons={
          <IconButton>
            <FullscreenIcon />
          </IconButton>
        }
      >
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField label="FROM" variant="filled" />
          <TextField label="DESTINATION" variant="filled" />
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <DateField label="DEPART DATE" variant="filled" />
          <DateField label="RETURE DATE" variant="filled" />
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField label="PEOPLE" variant="filled" />
          <TextField label="TRANSPORTATION" variant="filled" />
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField label="NAME" variant="filled" />
          <Button
            variant="contained"
            color="secondary"
            size="large"
            disableElevation
            sx={{
              color: (theme) => theme.palette.common.white,
              borderRadius: 20,
            }}
          >
            Create a quote
          </Button>
        </Box>
      </Widget>
    </LocalizationProvider>
  )
}

export default QuickQuote
