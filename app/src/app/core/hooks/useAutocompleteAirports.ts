import { useEffect, useState } from 'react'
import { axiosInstance } from '../axios'
import { useQuery } from '@tanstack/react-query'
import { debounce } from 'lodash'

const searchAirports: (searchTerm: string) => Promise<TAirport[]> = async (
  searchTerm,
) => {
  if (searchTerm === '' || !searchTerm) return []

  const { data } = await axiosInstance.get(`/airport/search/${searchTerm}`)
  return data
}

type TUseAutocompleteAirportsParams = {
  debounceTime?: number
}

export const useAutocompleteAirports = (
  { debounceTime }: TUseAutocompleteAirportsParams = { debounceTime: 300 },
) => {
  const [value, setValue] = useState('')
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['search-airpots', value],
    queryFn: () => searchAirports(value),
    keepPreviousData: true,
  })

  const debouncedFetchAirports = debounce(refetch, debounceTime)

  useEffect(() => {
    debouncedFetchAirports()
  }, [value, debouncedFetchAirports])

  return {
    airports: data,
    isLoading,
    searchTerm: value,
    setSearchTerm: setValue,
  }
}
