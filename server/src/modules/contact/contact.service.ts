import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactDTO, UpdateContactDTO } from './contact.dto';
import {
  EntityNotFoundException,
  InvalidDataException,
} from '../../common/exceptions';
import { ContactErrorMessages } from '../../common/errorMessages';

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateContactDTO) {
    const { email, phone } = data;

    await this.validateIfContactWithGivenUniqueDataExists(email, phone);

    const contact = await this.prisma.contact.create({ data });
    return contact;
  }

  async findAll() {
    const contacts = await this.prisma.contact.findMany();
    return contacts;
  }

  async update(id: string, data: UpdateContactDTO) {
    const { email, phone } = data;

    const contactExists = await this.prisma.contact.findUnique({
      where: { id },
    });

    if (!contactExists) {
      throw new EntityNotFoundException('Contact');
    }

    if (contactExists.email !== email && email) {
      await this.validateIfContactWithGivenEmailExists(email);
    }
    if (contactExists.phone !== phone && phone) {
      await this.validateIfContactWithGivenPhoneExists(phone);
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

  async validateIfContactWithGivenUniqueDataExists(
    email: string,
    phone: string,
  ) {
    await this.validateIfContactWithGivenEmailExists(email);
    await this.validateIfContactWithGivenPhoneExists(phone);
  }

  async validateIfContactWithGivenEmailExists(email: string) {
    const contactWithGivenEmail = await this.prisma.contact.findUnique({
      where: { email },
    });

    if (contactWithGivenEmail) {
      throw new InvalidDataException(
        ContactErrorMessages.EMAIL_OR_PHONE_ALREADY_EXISTS,
      );
    }
  }

  async validateIfContactWithGivenPhoneExists(phone: string) {
    const contactWithGivenPhone = await this.prisma.contact.findUnique({
      where: { phone },
    });

    if (contactWithGivenPhone) {
      throw new InvalidDataException(
        ContactErrorMessages.EMAIL_OR_PHONE_ALREADY_EXISTS,
      );
    }
  }
}
