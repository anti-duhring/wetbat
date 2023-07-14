import { Injectable } from '@nestjs/common';

import { QuoteErrorMessages } from '../../common/errorMessages';
import { EntityNotFoundException, InvalidDataException } from '../../common/exceptions';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuoteDTO, UpdateQuoteDTO } from './quote.dto';
import { QuoteStatus } from './quote.types';

@Injectable()
export class QuoteService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateQuoteDTO) {
    const { destinationDate, departureDate, contactEmail } = data;

    this.validateDestinationAndDepartureDate(destinationDate, departureDate);
    await this.validateIfContactExists(contactEmail);

    data.status = QuoteStatus.PENDING;
    const quote = await this.prisma.quote.create({ data });

    return quote;
  }

  async findAll() {
    const quotes = await this.prisma.quote.findMany({ include: { contact: true } });
    return quotes;
  }

  async update(id: string, data: UpdateQuoteDTO) {
    const { destinationDate, departureDate } = data;

    this.validateDestinationAndDepartureDate(destinationDate, departureDate);

    const quoteExists = await this.prisma.quote.findUnique({
      where: { id },
    });
    if (!quoteExists) {
      throw new EntityNotFoundException('Quote');
    }

    return await this.prisma.quote.update({
      data,
      where: { id },
    });
  }

  async delete(id: string) {
    const quoteExists = await this.prisma.quote.findUnique({
      where: { id },
    });
    if (!quoteExists) {
      throw new EntityNotFoundException('Quote');
    }
    await this.prisma.quote.delete({
      where: { id },
    });
  }

  async validateIfContactExists(contactEmail: string) {
    const contactExists = await this.prisma.contact.findUnique({
      where: { email: contactEmail },
    });

    if (!contactExists) {
      throw new EntityNotFoundException('Contact');
    }
  
  }

  validateDestinationAndDepartureDate(
    destinationDate: Date,
    departureDate: Date,
  ) {
    const now = new Date();

    if (destinationDate <= now || departureDate <= now) {
      throw new InvalidDataException(
        QuoteErrorMessages.DEPARTURE_AND_DESTINATION_DATE_HAS_ALREADY_PASSED,
      );
    }

    if (departureDate > destinationDate) {
      throw new InvalidDataException(
        QuoteErrorMessages.DEPARTURE_DATE_IS_GREATER_THAN_DESTINATION_DATE,
      );
    }
  }
}
