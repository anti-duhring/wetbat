import {
  IsUUID,
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  IsEmail,
  IsDate,
} from 'class-validator';

export class ContactDTO {
  @IsUUID()
  id?: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsDate()
  createdAt?: Date;

  @IsDate()
  updatedAt?: Date;
}
