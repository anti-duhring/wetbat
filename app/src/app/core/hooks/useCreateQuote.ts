import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from '../axios'
import { AxiosError, AxiosResponse } from 'axios'

type TUseQuotesParams = {
  onSuccess: (data: AxiosResponse) => void
  onError: (error: AxiosError) => void
  onSettled?: () => void
}

const createQuote = async (data: TQuote) => {
  const { data: response } = await axiosInstance.post('/quote', data)
  return response.data
}

export const useCreateQuote = ({
  onSuccess,
  onError,
  onSettled,
}: TUseQuotesParams) => {
  const { mutate, isLoading } = useMutation(createQuote, {
    onSuccess: (data) => onSuccess(data),
    onError: (error) => onError(error as AxiosError),
    onSettled: () => (onSettled ? onSettled() : null),
  })

  return { mutate, isLoading }
}
