import React from 'react'
import {
  Autocomplete,
  AutocompleteProps,
  TextField,
  TextFieldProps,
} from '@mui/material'

type Props = {
  options: any[] | undefined
  isLoading: boolean
  value: string
  inputProps?: TextFieldProps
} & Pick<
  AutocompleteProps<any, any, any, any>,
  'onChange' | 'onInputChange' | 'isOptionEqualToValue' | 'getOptionLabel'
>

const AutocompleteInput = ({
  options,
  isLoading,
  value,
  inputProps,
  onChange,
  onInputChange,
  isOptionEqualToValue,
}: Props) => {
  return (
    <Autocomplete
      fullWidth
      options={options ?? []}
      loading={isLoading}
      autoComplete
      filterOptions={(x) => x}
      isOptionEqualToValue={isOptionEqualToValue}
      value={value}
      getOptionLabel={(option: any) =>
        typeof option === 'string' ? option : option.name
      }
      onInputChange={onInputChange}
      onChange={onChange}
      renderInput={(params) => <TextField {...params} {...inputProps} />}
    />
  )
}

export default AutocompleteInput
