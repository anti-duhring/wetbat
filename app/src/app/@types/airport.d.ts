type TAirport = {
  id: number
  lat: string
  lon: string
  name: string
  city: string
  state: string
  country: string
  quotesDestination?: TQuote[]
  quotesDeparture?: TQuote[]
  tz: string
  createdAt: Date
  updatedAt: Date
}
