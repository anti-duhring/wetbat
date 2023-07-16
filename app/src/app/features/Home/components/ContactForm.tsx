'use client'

import { ContactFormMessage } from '@/app/core/enums'
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
          label={ContactFormMessage.FIRST_NAME_LABEL}
        />
        <TextField
          {...register('lastName', { required: true })}
          error={Boolean(errors?.lastName)}
          label={ContactFormMessage.LAST_NAME_LABEL}
        />
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          {...register('phone', { required: true })}
          error={Boolean(errors?.phone)}
          label={ContactFormMessage.PHONE_NUMBER_LABEL}
        />
        <TextField
          {...register('email', { required: true })}
          error={Boolean(errors?.email)}
          label={ContactFormMessage.EMAIL_LABEL}
        />
      </Box>
    </Box>
  )
}

export default ContactForm
