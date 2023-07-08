import { QuoteStatus } from './quote.types';

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
  contactId: string;
};
