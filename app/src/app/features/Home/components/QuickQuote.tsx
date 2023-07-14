'use client'

import { useState } from 'react'
import {
  IconButton,
  Box,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import FastForwardOutlinedIcon from '@mui/icons-material/FastForwardOutlined'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateField } from '@mui/x-date-pickers'
import Widget from './Widget'

const QuoteForm = () => {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
    >
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField label="FROM" variant="filled" fullWidth />
        <TextField label="DESTINATION" variant="filled" fullWidth />
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <DateField label="DEPART DATE" variant="filled" fullWidth />
        <DateField label="RETURE DATE" variant="filled" fullWidth />
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField label="PEOPLE" variant="filled" fullWidth />
        <TextField label="TRANSPORTATION" variant="filled" fullWidth />
      </Box>
      <Box>
        <TextField label="EMAIL" fullWidth variant="filled" />
      </Box>
    </Box>
  )
}

const ContactForm = () => {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
    >
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField label="FIRST NAME" variant="filled" fullWidth />
        <TextField label="LAST NAME" variant="filled" fullWidth />
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <DateField label="DEPART DATE" variant="filled" fullWidth />
        <DateField label="RETURE DATE" variant="filled" fullWidth />
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField label="PHONE" variant="filled" fullWidth />
        <TextField label="EMAIL" variant="filled" fullWidth />
      </Box>
    </Box>
  )
}

const QuickQuote = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleDialogOpen = () => {
    setIsDialogOpen(true)
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
  }

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
        sx={{ flex: 1, flexShrink: 2 }}
      >
        <QuoteForm />
        <Button
          variant="contained"
          color="secondary"
          size="large"
          disableElevation
          sx={{
            color: (theme) => theme.palette.common.white,
            borderRadius: 20,
          }}
          onClick={handleDialogOpen}
        >
          Create a quote
        </Button>
      </Widget>
      <QuickContactDialog
        isOpen={isDialogOpen}
        handleClose={handleDialogClose}
      />
    </LocalizationProvider>
  )
}

type TQuickContactDialogProps = {
  isOpen: boolean
  handleClose: () => void
}

const QuickContactDialog = ({
  isOpen,
  handleClose,
}: TQuickContactDialogProps) => {
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Create a new contact</DialogTitle>
      <DialogContent>
        <DialogContentText>
          The email provided does not exist. Please register a new contact using
          this email address or provide a different email.
        </DialogContentText>
        <ContactForm />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Create</Button>
      </DialogActions>
    </Dialog>
  )
}

export default QuickQuote
