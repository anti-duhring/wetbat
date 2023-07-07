export type QuoteDTO = {
  id?: string;
  departure_location: string;
  destination_location: string;
  departure_date: Date;
  destination_date: Date;
  travellers_amount: number;
  transportation: string;
  price: number;
  status: QuoteStatus;
  contact: string;
};

enum QuoteStatus {
  PENDING = 'PENDING', // When the quote is created but the trip does not happened yet
  INPROGRESS = 'INPROGRESS', // When the trip is happening
  COMPLETED = 'COMPLETED', // When the trip has been successfully completed
  CANCELLED = 'CANCELLED', // When the quote is no longer valid
}
