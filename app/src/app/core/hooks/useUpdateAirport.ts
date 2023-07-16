import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from '../axios'
import { AxiosError, AxiosResponse } from 'axios'

type TUseUpdateAirportParams = {
  onSuccess: (data: AxiosResponse) => void
  onError: (error: AxiosError) => void
  onSettled?: () => void
}

type TUpdateAirportParams = Omit<
  TAirport,
  'createdAt' | 'updatedAt' | 'quotesDestination' | 'quotesDeparture'
>

const updateAirport = async ({ id, ...data }: TUpdateAirportParams) => {
  const { data: response } = await axiosInstance.put(`/airport/${id}`, data)
  return response.data
}

export const useUpdateAirport = ({
  onSuccess,
  onError,
  onSettled,
}: TUseUpdateAirportParams) => {
  const { mutate, isLoading } = useMutation(updateAirport, {
    onSuccess: (data) => onSuccess(data),
    onError: (error) => onError(error as AxiosError),
    onSettled: () => (onSettled ? onSettled() : null),
  })

  return { update: mutate, isLoading }
}
