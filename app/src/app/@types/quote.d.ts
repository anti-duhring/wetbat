type TQuote = {
  id: string
  departureLocation: TAirport
  destinationLocation: TAirport
  departureDate: Date
  destinationDate: Date
  travellersAmount: number
  transportation: string
  price: number
  status: QuoteStatus
  contactEmail: string
  contact?: TContact
}

type TCreateQuote = {
  departureLocationName: string
  destinationLocationName: string
} & Pick<
  TQuote,
  | 'departureDate'
  | 'destinationDate'
  | 'travellersAmount'
  | 'transportation'
  | 'price'
  | 'contactEmail'
>

enum QuoteStatus {
  PENDING = 'PENDING', // When the quote is created but the trip does not happened yet
  INPROGRESS = 'INPROGRESS', // When the trip is happening
  COMPLETED = 'COMPLETED', // When the trip has been successfully completed
  CANCELLED = 'CANCELLED', // When the quote is no longer valid
}
