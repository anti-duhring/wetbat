import { Injectable } from '@nestjs/common';
import { QuoteDTO } from './quote.dto';
import { PrismaService } from '../prisma/prisma.service';
import { QuoteStatus, QuoteUpdateDTO } from './quote.types';
import {
  EntityNotFoundException,
  InvalidDataException,
} from '../../common/exceptions';

@Injectable()
export class QuoteService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: QuoteDTO) {
    const { destination_date, departure_date } = data;
    data.status = QuoteStatus.PENDING;

    if (
      !this.isDestinationDateGreaterThanDepartureDate(
        destination_date,
        departure_date,
      )
    ) {
      throw new InvalidDataException(
        'Destination date must be greater than departure date',
      );
    }

    const quote = await this.prisma.quote.create({ data });

    return quote;
  }

  async findAll() {
    const quotes = await this.prisma.quote.findMany();
    return quotes;
  }

  async update(id: string, data: QuoteUpdateDTO) {
    const { destination_date, departure_date } = data;
    const quoteExists = await this.prisma.quote.findUnique({
      where: { id },
    });
    if (!quoteExists) {
      throw new EntityNotFoundException('Quote');
    }

    if (
      !this.isDestinationDateGreaterThanDepartureDate(
        destination_date,
        departure_date,
      )
    ) {
      throw new InvalidDataException(
        'Destination date must be greater than departure date',
      );
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

  isDestinationDateGreaterThanDepartureDate(
    destinationDate: Date,
    departureDate: Date,
  ) {
    return destinationDate > departureDate;
  }
}
