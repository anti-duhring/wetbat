import { Snackbar, Alert } from '@mui/material'
import { useState } from 'react'

export enum NotificationSeverity {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

export const useNotification = () => {
  const [notification, setNotification] = useState<{
    open: boolean
    message: string
    severity: NotificationSeverity
  }>({ open: false, message: '', severity: NotificationSeverity.SUCCESS })

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) =>
    reason !== 'clickaway'
      ? setNotification({ ...notification, open: false })
      : null

  const NotificationComponent = () => (
    <Snackbar
      open={notification.open}
      autoHideDuration={4000}
      onClose={handleSnackbarClose}
    >
      <Alert
        onClose={handleSnackbarClose}
        severity={notification.severity}
        sx={{ width: '100%' }}
      >
        {notification.message}
      </Alert>
    </Snackbar>
  )

  const openNotification = (
    message: string,
    severity: NotificationSeverity,
  ) => {
    if (
      notification.open &&
      notification.message === message &&
      notification.severity === severity
    ) {
      return
    }

    setNotification({ open: true, message, severity })
  }

  const closeNotification = () => {
    setNotification({ ...notification, open: false })
  }

  return {
    NotificationComponent,
    openNotification,
    closeNotification,
  }
}
