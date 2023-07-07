import { QuoteDTO } from './quote.dto';

export type QuoteUpdateDTO = Partial<Omit<QuoteDTO, 'id'>>;
