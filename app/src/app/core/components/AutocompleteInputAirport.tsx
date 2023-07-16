import { useEffect } from 'react'
import { useAutocompleteAirports } from '../hooks'
import AutocompleteInput from './AutocompleteInput'
import { TextFieldProps } from '@mui/material'

type Props = {
  inputProps: TextFieldProps
  defaultValue?: string
}

const AutocompleteInputAirport = ({ inputProps, defaultValue }: Props) => {
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

  useEffect(() => {
    if (defaultValue) {
      setSearchTerm(defaultValue)
    }
  }, [defaultValue, setSearchTerm])

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

export default AutocompleteInputAirport
