import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from '../axios'
import { AxiosError, AxiosResponse } from 'axios'

type TUseCreateContactParams = {
  onSuccess: (data: AxiosResponse) => void
  onError: (error: AxiosError) => void
  onSettled?: () => void
}

const createContact = async (data: TCreateContact) => {
  const { data: response } = await axiosInstance.post('/contact', data)
  return response.data
}

export const useCreateContact = ({
  onSuccess,
  onError,
  onSettled,
}: TUseCreateContactParams) => {
  const { mutate, isLoading } = useMutation(createContact, {
    onSuccess: (data) => onSuccess(data),
    onError: (error) => onError(error as AxiosError),
    onSettled: () => (onSettled ? onSettled() : null),
  })

  return { create: mutate, isLoading }
}
