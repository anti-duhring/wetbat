import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ContactDTO } from './contact.dto';
import {
  EntityNotFoundException,
  InvalidDataException,
} from '../../common/exceptions';
import { ContactUpdateDTO } from './contact.types';
import { ContactErrorMessages } from '../../common/errorMessages';

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: ContactDTO) {
    const { email, phone } = data;

    await this.validateIfContactWithGivenEmailOrPhoneExists(email, phone);

    const contact = await this.prisma.contact.create({ data });
    return contact;
  }

  async findAll() {
    const contacts = await this.prisma.contact.findMany();
    return contacts;
  }

  async update(id: string, data: ContactUpdateDTO) {
    const { email, phone } = data;

    const contactExists = await this.prisma.contact.findUnique({
      where: { id },
    });

    if (!contactExists) {
      throw new EntityNotFoundException('Contact');
    }

    if (
      (contactExists.email !== email && email) ||
      (contactExists.phone !== phone && phone)
    ) {
      await this.validateIfContactWithGivenEmailOrPhoneExists(email, phone);
    }

    return await this.prisma.contact.update({
      data,
      where: { id },
    });
  }

  async delete(id: string) {
    const contactExists = await this.prisma.contact.findUnique({
      where: { id },
    });

    if (!contactExists) {
      throw new EntityNotFoundException('Contact');
    }

    await this.prisma.contact.delete({
      where: { id },
    });
  }

  async validateIfContactWithGivenEmailOrPhoneExists(
    email: string,
    phone: string,
  ) {
    const contactWithGivenEmail = await this.prisma.contact.findUnique({
      where: { email },
    });

    const contactWithGivenPhone = await this.prisma.contact.findUnique({
      where: { phone },
    });

    if (contactWithGivenEmail || contactWithGivenPhone) {
      throw new InvalidDataException(
        ContactErrorMessages.EMAIL_OR_PHONE_ALREADY_EXISTS,
      );
    }
  }
}
