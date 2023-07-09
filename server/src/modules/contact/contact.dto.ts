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
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsDate()
  created_at?: Date;

  @IsDate()
  updated_at?: Date;
}
