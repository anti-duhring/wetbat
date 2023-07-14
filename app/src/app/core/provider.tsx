'use client'

import { ReactNode, useState } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

type Props = {
  children: ReactNode
}
const Provider = ({ children }: Props) => {
  const [queryClient] = useState(new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default Provider
