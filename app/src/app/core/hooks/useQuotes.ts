import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../axios"
import { AxiosResponse } from "axios" 


const fetchQuotes: () => Promise<TQuote[]> = async() => {
    const { data } = await axiosInstance.get('/quote')
    return data
}

export const useQuotes = () => {
    return useQuery({
        queryKey: ['quotes'],
        queryFn: fetchQuotes
    })
    
}
