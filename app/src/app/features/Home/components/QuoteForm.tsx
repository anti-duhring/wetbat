import { Box, TextField } from '@mui/material'
import { DateField } from '@mui/x-date-pickers'
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from 'react-hook-form'

type TQuoteFormProps = {
  errors: FieldErrors<any>
  register: UseFormRegister<any>
  control: Control<any, any>
}

const QuoteForm = ({ register, control, errors }: TQuoteFormProps) => {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
    >
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          {...register('departureLocationName')}
          label="FROM"
          variant="filled"
          error={Boolean(errors.departureLocationName?.message)}
          fullWidth
        />
        <TextField
          {...register('destinationLocationName')}
          label="DESTINATION"
          variant="filled"
          error={Boolean(errors.destinationLocationName?.message)}
          fullWidth
        />
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Controller
          name="departureDate"
          control={control}
          render={({ field: { onChange, value } }) => (
            <DateField
              label="DEPART DATE"
              value={value}
              onChange={onChange}
              variant="filled"
              slotProps={{
                textField: {
                  error: Boolean(errors.departureDate?.message),
                },
              }}
              fullWidth
            />
          )}
        />
        <Controller
          name="destinationDate"
          control={control}
          render={({ field: { onChange, value } }) => (
            <DateField
              label="RETURN DATE"
              value={value}
              onChange={onChange}
              variant="filled"
              slotProps={{
                textField: {
                  error: Boolean(errors.destinationDate?.message),
                },
              }}
              fullWidth
            />
          )}
        />
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          {...register('travellersAmount')}
          label="PEOPLE"
          variant="filled"
          type="number"
          error={Boolean(errors.travellersAmount?.message)}
          fullWidth
        />
        <TextField
          {...register('transportation')}
          label="TRANSPORTATION"
          variant="filled"
          error={Boolean(errors.transportation?.message)}
          fullWidth
        />
      </Box>
      <Box>
        <TextField
          {...register('price')}
          label="PRICE $"
          fullWidth
          variant="filled"
          type="number"
          error={Boolean(errors.price?.message)}
        />
      </Box>
      <Box>
        <TextField
          {...register('contactEmail')}
          label="EMAIL"
          fullWidth
          variant="filled"
          error={Boolean(errors.contactEmail?.message)}
        />
      </Box>
    </Box>
  )
}

export default QuoteForm
