import { faker } from '@faker-js/faker';
// import { PartialType, OmitType } from '@nestjs/mapped-types';
import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';
import {
  IsUUID,
  IsString,
  IsNotEmpty,
  IsEmail,
  IsDate
} from 'class-validator';

export class ContactDTO {
  @ApiProperty({
    description: 'Unique identifier for the contact. This field is filled automatically by the database.',
    example: faker.string.uuid(),
    required: false,
    readOnly: true,
    uniqueItems: true,
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'First name of the contact',
    example: faker.person.firstName(),
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'Last name of the contact',
    example: faker.person.lastName(),
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'Phone number of the contact',
    example: faker.phone.number(),
    uniqueItems: true,
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    description: 'Email of the contact',
    example: faker.internet.email(),
    uniqueItems: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Date of the creation of the contact. This field is filled automatically by the database.',
    example: faker.date.past(),
    default: new Date(),
    required: false,
    readOnly: true
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: 'Date of the last update of this contact. This field is filled automatically by the database.',
    example: faker.date.past(),
    default: new Date(),
    required: false,
    readOnly: true
  })
  @IsDate()
  updatedAt: Date;
}

export class CreateContactDTO extends OmitType(ContactDTO, ['id', 'createdAt', 'updatedAt'])  {
}

export class UpdateContactDTO extends PartialType(CreateContactDTO)  {
}