export enum QuoteStatus {
  PENDING = 'PENDING', // When the quote is created but the trip does not happened yet
  INPROGRESS = 'INPROGRESS', // When the trip is happening
  COMPLETED = 'COMPLETED', // When the trip has been successfully completed
  CANCELLED = 'CANCELLED', // When the quote is no longer valid
}
