import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ContactDTO } from './contact.dto';
import { EntityNotFoundException } from 'src/common/exceptions/EntityNotFound.exception';
import { ContactUpdateDTO } from './contact.types';

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: ContactDTO) {
    const contact = await this.prisma.contact.create({ data });
    return contact;
  }

  async findAll() {
    const contacts = await this.prisma.contact.findMany();
    return contacts;
  }

  async update(id: string, data: ContactUpdateDTO) {
    const contactExists = await this.prisma.contact.findUnique({
      where: { id },
    });

    if (!contactExists) {
      throw new EntityNotFoundException('Contact');
    }

    await this.prisma.contact.update({
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
}
