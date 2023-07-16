import { contactSchema } from '@/app/core'
import { ContactFormMessage, ContactMessage } from '@/app/core/enums'
import {
  NotificationSeverity,
  useNotification,
  useUpdateContact,
} from '@/app/core/hooks'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import SaveIcon from '@mui/icons-material/Save'

type Props = {
  contact: TContact
}
const ContactForm = ({ contact }: Props) => {
  const { NotificationComponent, openNotification, closeNotification } =
    useNotification()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(contactSchema), defaultValues: contact })
  const { update, isLoading } = useUpdateContact({
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
    handleSubmit((data) => update({ id: contact.id, ...data }))()
  }

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
    >
      <TextField
        label={ContactFormMessage.ID_LABEL}
        value={contact.id}
        disabled
      />
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          {...register('firstName', { required: true })}
          error={Boolean(errors?.firstName)}
          label={ContactFormMessage.FIRST_NAME_LABEL}
          helperText={ContactFormMessage.FIRST_NAME_HELPER_TEXT}
        />
        <TextField
          {...register('lastName', { required: true })}
          error={Boolean(errors?.lastName)}
          label={ContactFormMessage.LAST_NAME_LABEL}
          helperText={ContactFormMessage.LAST_NAME_HELPER_TEXT}
        />
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          {...register('phone', { required: true })}
          error={Boolean(errors?.phone)}
          label={ContactFormMessage.PHONE_NUMBER_LABEL}
          helperText={ContactFormMessage.PHONE_NUMBER_HELPER_TEXT}
        />
        <TextField
          {...register('email', { required: true })}
          error={Boolean(errors?.email)}
          label={ContactFormMessage.EMAIL_LABEL}
          helperText={ContactFormMessage.EMAIL_HELPER_TEXT}
        />
      </Box>
      <Box>
        <Button endIcon={<SaveIcon />} onClick={onSubmit} disabled={isLoading}>
          Update contact
        </Button>
      </Box>
      <NotificationComponent />
    </Box>
  )
}

export default ContactForm
