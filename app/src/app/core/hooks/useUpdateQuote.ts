import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from '../axios'
import { AxiosError, AxiosResponse } from 'axios'

type TUseUpdateQuoteParams = {
  onSuccess: (data: AxiosResponse) => void
  onError: (error: AxiosError) => void
  onSettled?: () => void
}

type TUseUpdateQuoteData = TCreateQuote & Pick<TQuote, 'id'>

const updateQuote = async ({ id, ...data }: TUseUpdateQuoteData) => {
  const { data: response } = await axiosInstance.put(`/quote/${id}`, data)
  return response.data
}

export const useUpdateQuote = ({
  onSuccess,
  onError,
  onSettled,
}: TUseUpdateQuoteParams) => {
  const { mutate, isLoading } = useMutation(updateQuote, {
    onSuccess: (data) => onSuccess(data),
    onError: (error) => onError(error as AxiosError),
    onSettled: () => (onSettled ? onSettled() : null),
  })

  return { update: mutate, isLoading }
}
