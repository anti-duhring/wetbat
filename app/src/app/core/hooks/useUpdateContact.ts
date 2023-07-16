import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from '../axios'
import { AxiosError, AxiosResponse } from 'axios'

type TUseUpdateContactParams = {
  onSuccess: (data: AxiosResponse) => void
  onError: (error: AxiosError) => void
  onSettled?: () => void
}

type TUpdateContactParams = TCreateContact & Pick<TContact, 'id'>

const updateContact = async ({ id, ...data }: TUpdateContactParams) => {
  const { data: response } = await axiosInstance.put(`/contact/${id}`, data)
  return response.data
}

export const useUpdateContact = ({
  onSuccess,
  onError,
  onSettled,
}: TUseUpdateContactParams) => {
  const { mutate, isLoading } = useMutation(updateContact, {
    onSuccess: (data) => onSuccess(data),
    onError: (error) => onError(error as AxiosError),
    onSettled: () => (onSettled ? onSettled() : null),
  })

  return { update: mutate, isLoading }
}
