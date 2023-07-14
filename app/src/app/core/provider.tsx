'use client'

import { ReactNode, useState } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type Props = {
    children: ReactNode
}
const Provider = ({ children }: Props) => {
    const [queryClient] = useState(new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}

export default Provider