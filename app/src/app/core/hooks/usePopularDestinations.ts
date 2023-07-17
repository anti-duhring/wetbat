import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '../axios'

const fetchPopularAirports: (amount?: number) => Promise<TAirport[]> = async (amount = 5) => {
  const { data } = await axiosInstance.get(
    `/airport/popular-destinations/${amount}`,
  )
  return data
}

export const usePopularDestinations = () => {
  return useQuery({
    queryKey: ['popular-airports'],
    queryFn: () => fetchPopularAirports(),
  })
}
