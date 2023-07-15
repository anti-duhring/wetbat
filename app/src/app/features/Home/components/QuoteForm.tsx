'use client'

import { useAutocompleteAirports } from '@/app/core'
import { AutocompleteInput } from '@/app/core/components'
import { Box, TextField, TextFieldProps } from '@mui/material'
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
          label: 'FROM',
          variant: 'filled',
          error: Boolean(errors.departureLocationName?.message),
          ...register('departureLocationName'),
        }}
      />
      <AutocompleteInputAirport
        inputProps={{
          label: 'DESTINATION',
          variant: 'filled',
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
      <TextField
        {...register('price')}
        label="PRICE $"
        fullWidth
        variant="filled"
        type="number"
        error={Boolean(errors.price?.message)}
      />
      <TextField
        {...register('contactEmail')}
        label="EMAIL"
        fullWidth
        variant="filled"
        error={Boolean(errors.contactEmail?.message)}
      />
    </Box>
  )
}

type TAutocompleteInputProps = {
  inputProps: TextFieldProps
}

const AutocompleteInputAirport = ({ inputProps }: TAutocompleteInputProps) => {
  const { airports, isLoading, searchTerm, setSearchTerm } =
    useAutocompleteAirports()

  const onChange = (_: any, newValue: TAirport) => {
    if (!newValue) {
      setSearchTerm('')
      return
    }

    setSearchTerm(newValue.name)
  }
  const onInputChange = (_: any, value: string) => {
    setSearchTerm(value)
  }

  return (
    <AutocompleteInput
      inputProps={inputProps}
      isLoading={isLoading}
      options={airports}
      value={searchTerm}
      onChange={onChange}
      onInputChange={onInputChange}
      isOptionEqualToValue={(option: TAirport, value: string) =>
        option.name.toLowerCase().includes(value.toLowerCase()) ||
        option.city.toLowerCase().includes(value.toLowerCase()) ||
        option.state.toLowerCase().includes(value.toLowerCase()) ||
        option.country.toLowerCase().includes(value.toLowerCase())
      }
      getOptionLabel={(option: any) =>
        typeof option === 'string' ? option : option.name
      }
    />
  )
}

export default QuoteForm
