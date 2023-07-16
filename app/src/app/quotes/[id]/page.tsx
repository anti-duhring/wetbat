import { Tabs } from '@/app/features/QuoteDetails'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Quote Details | WetBat',
}

export default function Quote() {
  return <Tabs />
}
