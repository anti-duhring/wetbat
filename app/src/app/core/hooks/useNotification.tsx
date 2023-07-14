import { Snackbar, Alert } from '@mui/material'
import { useState } from 'react'

export const useNotification = () => {
  const [notification, setNotification] = useState<{
    open: boolean
    message: string
    severity: 'success' | 'error' | 'warning' | 'info'
  }>({ open: false, message: '', severity: 'success' })

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) =>
    reason !== 'clickaway' ? setNotification({ ...notification, open: false }) : null

  const NotificationComponent = () => (
    <Snackbar
      open={notification.open}
      autoHideDuration={6000}
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

  const openNotification = (message: string, severity: 'success' | 'error' | 'warning' | 'info') => {
    setNotification({ open: true, message, severity })
  }

  const closeNotification = () => {
    setNotification({ ...notification, open: false })
  }

  return {
    NotificationComponent,
    openNotification,
    closeNotification
  }
}
