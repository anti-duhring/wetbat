'use client'

import { AutocompleteInputAirport } from '@/app/core/components'
import { QuoteFormMessage } from '@/app/core/enums'
import { Box, TextField } from '@mui/material'
import { DateField } from '@mui/x-date-pickers'
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from 'react-hook-form'

type TQuoteFormProps = {
  errors: FieldErrors<TCreateQuote>
  register: UseFormRegister<TCreateQuote>
  control: Control<any, any>
}

const QuoteForm = ({ register, control, errors }: TQuoteFormProps) => {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
    >
      <AutocompleteInputAirport
        inputProps={{
          label: QuoteFormMessage.DEPARTURE_LOCATION_LABEL,
          error: Boolean(errors.departureLocationName?.message),
          ...register('departureLocationName'),
        }}
      />
      <AutocompleteInputAirport
        inputProps={{
          label: QuoteFormMessage.DESTINATION_LOCATION_LABEL,
          error: Boolean(errors.destinationLocationName?.message),
          ...register('destinationLocationName'),
        }}
      />
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Controller
          name="departureDate"
          control={control}
          render={({ field: { onChange, value } }) => (
            <DateField
              label={QuoteFormMessage.DEPARTURE_DATE_LABEL}
              value={value}
              onChange={onChange}
              slotProps={{
                textField: {
                  error: Boolean(errors.departureDate?.message),
                },
              }}
            />
          )}
        />
        <Controller
          name="destinationDate"
          control={control}
          render={({ field: { onChange, value } }) => (
            <DateField
              label={QuoteFormMessage.DESTINATION_DATE_LABEL}
              value={value}
              onChange={onChange}
              slotProps={{
                textField: {
                  error: Boolean(errors.destinationDate?.message),
                },
              }}
            />
          )}
        />
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          {...register('travellersAmount')}
          label={QuoteFormMessage.TRAVELLERS_AMOUNT_LABEL}
          type="number"
          error={Boolean(errors.travellersAmount?.message)}
        />
        <TextField
          {...register('transportation')}
          label={QuoteFormMessage.TRANSPORTATION_TYPE_LABEL}
          error={Boolean(errors.transportation?.message)}
        />
      </Box>
      <TextField
        {...register('price')}
        label={QuoteFormMessage.PRICE_LABEL}
        type="number"
        error={Boolean(errors.price?.message)}
      />
      <TextField
        {...register('contactEmail')}
        label={QuoteFormMessage.CONTACT_LABEL}
        error={Boolean(errors.contactEmail?.message)}
      />
    </Box>
  )
}

export default QuoteForm
