import { Box, TextField } from '@mui/material'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

type TContactFormProps = {
  errors: FieldErrors<TCreateContact>
  register: UseFormRegister<TCreateContact>
}

const ContactForm = ({ errors, register }: TContactFormProps) => {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
    >
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          {...register('firstName', { required: true })}
          error={Boolean(errors?.firstName)}
          label="FIRST NAME"
          variant="filled"
          fullWidth
        />
        <TextField
          {...register('lastName', { required: true })}
          error={Boolean(errors?.lastName)}
          label="LAST NAME"
          variant="filled"
          fullWidth
        />
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          {...register('phone', { required: true })}
          error={Boolean(errors?.phone)}
          label="PHONE"
          variant="filled"
          fullWidth
        />
        <TextField
          {...register('email', { required: true })}
          error={Boolean(errors?.email)}
          label="EMAIL"
          variant="filled"
          fullWidth
        />
      </Box>
    </Box>
  )
}

export default ContactForm
