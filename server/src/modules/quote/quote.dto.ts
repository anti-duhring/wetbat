import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsNumber,
  Min,
  IsPositive,
  IsUUID,
} from 'class-validator';
import { QuoteStatus } from './quote.types';

export class QuoteDTO {
  @IsUUID()
  id?: string;

  @IsString()
  @IsNotEmpty()
  departure_location: string;

  @IsString()
  @IsNotEmpty()
  destination_location: string;

  @IsDate()
  @IsNotEmpty()
  departure_date: Date;

  @IsDate()
  @IsNotEmpty()
  destination_date: Date;

  @IsNumber()
  @Min(1)
  travellers_amount: number;

  @IsString()
  @IsNotEmpty()
  transportation: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsString()
  @IsNotEmpty()
  status: QuoteStatus;

  @IsUUID()
  @IsNotEmpty()
  contactId: string;

  @IsDate()
  created_at?: Date;

  @IsDate()
  updated_at?: Date;
}
