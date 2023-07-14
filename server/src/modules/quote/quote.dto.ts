import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsNumber,
  Min,
  IsPositive,
  IsUUID,
  IsEmail,
  IsDateString
} from 'class-validator';
import { QuoteStatus } from './quote.types';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';

export class QuoteDTO {
  @ApiProperty({
    description: 'Unique identifier for the quote. This field is filled automatically by the database.',
    example: faker.string.uuid(),
    readOnly: true,
    uniqueItems: true,
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Departure location of the trip',
    example: faker.location.city(),
  })
  @IsString()
  @IsNotEmpty()
  departureLocation: string;

  @ApiProperty({
    description: 'Destination location of the trip',
    example: faker.location.city(),
  })
  @IsString()
  @IsNotEmpty()
  destinationLocation: string;

  @ApiProperty({
    description: 'Departure date of the trip',
    example: faker.date.soon(),
  })
  @IsDateString()
  @IsNotEmpty()
  departureDate: Date;

  @ApiProperty({
    description: 'Destination date of the trip',
    example: faker.date.future(),
  })
  @IsDateString()
  @IsNotEmpty()
  destinationDate: Date;

  @ApiProperty({
    description: 'Amount of travellers in the trip',
    example: faker.number.int({ min: 1, max: 10 }),
  })
  @IsNumber()
  @Min(1)
  travellersAmount: number;

  @ApiProperty({
    description: 'The type of transportation used for the trip',
    example: faker.vehicle.type(),
  })
  @IsString()
  @IsNotEmpty()
  transportation: string;


  @ApiProperty({
    description: 'The price of the trip',
    example: faker.commerce.price(),
  })
  @IsNumber()
  @IsPositive()
  price: number;


  @ApiProperty({
    description: 'The status of the quote',
    example: QuoteStatus.PENDING,
    enum: QuoteStatus,
  })
  @IsString()
  @IsNotEmpty()
  status: QuoteStatus;

  @ApiProperty({
    description: 'Email of the contact',
    example: faker.internet.email(),
  })
  @IsEmail()
  @IsNotEmpty()
  contactEmail: string;

  @ApiProperty({
    description: 'Date of creation of this entity. This field is filled automatically by the database.',
    example: faker.date.past(),
    default: new Date(),
    readOnly: true
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: 'Date of the last update of this entity. This field is filled automatically by the database.',
    example: faker.date.past(),
    default: new Date(),
    readOnly: true
  })
  @IsDate()
  updatedAt: Date;
}

export class CreateQuoteDTO extends OmitType(QuoteDTO, ['id', 'createdAt', 'updatedAt'])  {
}

export class UpdateQuoteDTO extends PartialType(OmitType(QuoteDTO, ['id', 'status', 'createdAt', 'updatedAt']))  {
}