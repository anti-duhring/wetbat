import { Injectable } from '@nestjs/common';
import { QuoteDTO } from './quote.dto';
import { PrismaService } from '../prisma/prisma.service';
import { QuoteStatus, QuoteUpdateDTO } from './quote.types';
import {
  EntityNotFoundException,
  InvalidDataException,
} from '../../common/exceptions';
import { QuoteErrorMessages } from '../../common/errorMessages';

@Injectable()
export class QuoteService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: QuoteDTO) {
    const { destinationDate, departureDate } = data;

    this.validateDestinationAndDepartureDate(destinationDate, departureDate);

    data.status = QuoteStatus.PENDING;
    const quote = await this.prisma.quote.create({ data });

    return quote;
  }

  async findAll() {
    const quotes = await this.prisma.quote.findMany();
    return quotes;
  }

  async update(id: string, data: QuoteUpdateDTO) {
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
    return await this.prisma.quote.delete({
      where: { id },
    });
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
