import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { axiosInstance } from '../axios'

const fetchQuotes: (id?: string) => Promise<TQuote[] | TQuote> = async (id) => {
  if (id) {
    const { data } = await axiosInstance.get(`/quote/${id}`)
    return data
  }

  const { data } = await axiosInstance.get('/quote')
  return data
}

type TUseQuotesParams = {
  quoteId?: string
}

type TUseQuery<T> = UseQueryResult<Required<T>>

export function useQuotes(params: { quoteId?: string }): TUseQuery<TQuote>
export function useQuotes(params: { quoteId?: undefined }): TUseQuery<TQuote[]>
export function useQuotes(): TUseQuery<TQuote[]>
export function useQuotes(params: TUseQuotesParams = {}) {
  const { quoteId } = params

  const key = quoteId ? ['quote', quoteId] : ['quotes']

  return useQuery({
    queryKey: key,
    queryFn: () => fetchQuotes(quoteId),
  })
}
