import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsNumber,
  Min,
  IsPositive,
  IsUUID,
  IsEmail
} from 'class-validator';
import { QuoteStatus } from './quote.types';

export class QuoteDTO {
  @IsUUID()
  id?: string;

  @IsString()
  @IsNotEmpty()
  departureLocation: string;

  @IsString()
  @IsNotEmpty()
  destinationLocation: string;

  @IsDate()
  @IsNotEmpty()
  departureDate: Date;

  @IsDate()
  @IsNotEmpty()
  destinationDate: Date;

  @IsNumber()
  @Min(1)
  travellersAmount: number;

  @IsString()
  @IsNotEmpty()
  transportation: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsString()
  @IsNotEmpty()
  status: QuoteStatus;

  @IsEmail()
  @IsNotEmpty()
  contactEmail: string;

  @IsDate()
  createdAt?: Date;

  @IsDate()
  updatedAt?: Date;
}
