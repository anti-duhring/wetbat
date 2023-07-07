import { Injectable } from '@nestjs/common';
import { QuoteDTO } from './quote.dto';
import { PrismaService } from '../prisma/prisma.service';
import { QuoteUpdateDTO } from './quote.types';
import { EntityNotFoundException } from 'src/common/exceptions/EntityNotFound.exception';

@Injectable()
export class QuoteService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: QuoteDTO) {
    const quote = await this.prisma.quote.create({ data });

    return quote;
  }

  async findAll() {
    const quotes = await this.prisma.quote.findMany();
    return quotes;
  }

  async update(id: string, data: QuoteUpdateDTO) {
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
}
