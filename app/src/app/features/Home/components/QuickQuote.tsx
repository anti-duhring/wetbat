'use client'

import FastForwardOutlinedIcon from '@mui/icons-material/FastForwardOutlined'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import QuoteForm from './QuoteForm'
import Widget from './Widget'
import { contactSchema, quoteSchema } from '../utils/formValidations'
import {
  NotificationSeverity,
  useCreateQuote,
  useNotification,
} from '@/app/core'
import ContactForm from './ContactForm'
import { ContactMessage, QuoteMessage } from '../utils/enums'
import { useCreateContact } from '@/app/core/hooks/useCreateContact'

const QuickQuote = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { NotificationComponent, openNotification, closeNotification } =
    useNotification()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(quoteSchema) })
  const { create, isLoading } = useCreateQuote({
    onSuccess,
    onError,
  })

  function onSuccess() {
    openNotification(
      QuoteMessage.QUOTE_CREATED_SUCCESSFULLY,
      NotificationSeverity.SUCCESS,
    )
  }

  function onError(error: any) {
    const message = error.response?.data.message
    if (message === ContactMessage.NOT_FOUND) {
      setIsDialogOpen(true)
      return
    }

    openNotification(error.response?.data.message, NotificationSeverity.ERROR)
  }

  const onSubmit = () => {
    if (Object.keys(errors).length) {
      openNotification(
        (errors as any)[Object.keys(errors)[0]]?.message,
        NotificationSeverity.ERROR,
      )
      return
    }

    closeNotification()
    handleSubmit((data: TCreateQuote) => {
      console.log(Object.keys(errors))
      create(data)
    })()
  }

  const handleDialogClose = () => setIsDialogOpen(false)

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
        <QuoteForm errors={errors} register={register} control={control} />
        <Button
          variant="contained"
          color="secondary"
          size="large"
          type="submit"
          disableElevation
          sx={{
            color: (theme) => theme.palette.common.white,
            borderRadius: 20,
          }}
          disabled={isLoading}
          onClick={onSubmit}
        >
          Create a quote
        </Button>
      </Widget>
      <QuickContactDialog
        isOpen={isDialogOpen}
        handleClose={handleDialogClose}
      />
      <NotificationComponent />
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
  const { NotificationComponent, openNotification, closeNotification } =
    useNotification()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(contactSchema) })
  const { create, isLoading } = useCreateContact({
    onSuccess,
    onError,
  })

  function onSuccess() {
    openNotification(
      ContactMessage.CONTACT_CREATED_SUCCESSFULLY,
      NotificationSeverity.SUCCESS,
    )
  }

  function onError(error: any) {
    const message = error.response?.data.message

    openNotification(message, NotificationSeverity.ERROR)
  }

  const onSubmit = () => {
    if (Object.keys(errors).length) {
      openNotification(
        (errors as any)[Object.keys(errors)[0]]?.message,
        NotificationSeverity.ERROR,
      )
      return
    }

    closeNotification()
    handleSubmit((data: TCreateContact) => {
      create(data)
    })()
  }

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>{ContactMessage.QUICK_CONTACT_DIALOG_TITLE}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {ContactMessage.QUICK_CONTACT_DIALOG_DESCRIPTION}
        </DialogContentText>
        <ContactForm errors={errors} register={register} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onSubmit} disabled={isLoading}>
          Create
        </Button>
      </DialogActions>
      <NotificationComponent />
    </Dialog>
  )
}

export default QuickQuote
