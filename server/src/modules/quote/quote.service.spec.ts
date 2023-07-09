import { Test } from '@nestjs/testing';
import { QuoteService } from './quote.service';
import { PrismaService } from '../prisma/prisma.service';
import { QuoteDTO } from './quote.dto';
import { QuoteStatus } from './quote.types';
import * as Factory from 'factory.ts';
import { faker } from '@faker-js/faker';
import {
  EntityNotFoundException,
  InvalidDataException,
} from '../../common/exceptions';

describe('Quotes Service', () => {
  let quoteService: QuoteService;
  let prismaService: PrismaService;

  const quoteFactory = Factory.Sync.makeFactory<QuoteDTO>({
    contactId: Factory.each(() => faker.string.uuid()),
    departure_date: Factory.each(() => faker.date.soon()),
    departure_location: Factory.each(() => faker.location.city()),
    destination_date: Factory.each(() => faker.date.future()),
    destination_location: Factory.each(() => faker.location.city()),
    price: Factory.each(() => faker.number.int()),
    transportation: Factory.each(() => faker.vehicle.type()),
    travellers_amount: Factory.each(() => faker.number.int({ min: 1 })),
    status: Factory.each(() =>
      faker.helpers.arrayElement(Object.values(QuoteStatus)),
    ),
  });

  beforeEach(async () => {
    const prismaServiceMocked = {
      provide: PrismaService,
      useValue: {
        quote: {
          create: jest
            .fn()
            .mockImplementation(async ({ data }) =>
              Promise.resolve({ ...data, id: faker.string.uuid() }),
            ),
          update: jest
            .fn()
            .mockImplementation(async ({ data, where }) =>
              Promise.resolve({ ...data, id: where.id }),
            ),
          delete: jest.fn().mockResolvedValue(true),
          findMany: jest
            .fn()
            .mockResolvedValue(
              new Array(5).fill(
                quoteFactory.build({ id: faker.string.uuid() }),
              ),
            ),
          findUnique: jest.fn(),
        },
      },
    };
    const moduleRef = await Test.createTestingModule({
      providers: [QuoteService, prismaServiceMocked],
    }).compile();

    quoteService = moduleRef.get<QuoteService>(QuoteService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  describe('Create', () => {
    it('Should create a quote', async () => {
      const newQuoteData = quoteFactory.build();

      const result = await quoteService.create(newQuoteData);

      expect(prismaService.quote.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ ...newQuoteData, id: expect.any(String) });
      expect(result.status).toBe(QuoteStatus.PENDING);
    });
    it('Should throw an error if departure date is greater than destination date', async () => {
      const newQuoteData = quoteFactory.build({
        destination_date: faker.date.soon(),
        departure_date: faker.date.future(),
      });

      await expect(quoteService.create(newQuoteData)).rejects.toThrowError(
        InvalidDataException,
      );
      expect(prismaService.quote.create).toBeCalledTimes(0);
    });
    it('Should throw an error if departure date has already passed', async () => {
      const newQuoteData = quoteFactory.build({
        departure_date: faker.date.past(),
      });

      await expect(quoteService.create(newQuoteData)).rejects.toThrowError(
        InvalidDataException,
      );
      expect(prismaService.quote.create).toBeCalledTimes(0);
    });
    it('Should throw an error if destination date has already passed', async () => {
      const newQuoteData = quoteFactory.build({
        destination_date: faker.date.past(),
      });

      await expect(quoteService.create(newQuoteData)).rejects.toThrowError(
        InvalidDataException,
      );
      expect(prismaService.quote.create).toBeCalledTimes(0);
    });
  });

  describe('Find All', () => {
    it('Should get all quotes', async () => {
      const result = await quoteService.findAll();

      expect(prismaService.quote.findMany).toHaveBeenCalledTimes(1);
      expect(result).toHaveLength(5);
    });
  });

  describe('Update', () => {
    it('Should update a quote', async () => {
      const existentQuote = quoteFactory.build({ id: faker.string.uuid() });
      const newQuoteData = quoteFactory.build();

      prismaService.quote.findUnique = jest
        .fn()
        .mockResolvedValue(existentQuote);

      const result = await quoteService.update(existentQuote.id, newQuoteData);

      expect(prismaService.quote.update).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ ...newQuoteData, id: existentQuote.id });
    });
    it('Should throw an error if departure date is greater than destination date', async () => {
      const existentQuote = quoteFactory.build({ id: faker.string.uuid() });
      const newQuoteData = quoteFactory.build({
        destination_date: faker.date.soon(),
        departure_date: faker.date.future(),
      });

      prismaService.quote.findUnique = jest
        .fn()
        .mockResolvedValue(existentQuote);

      await expect(
        quoteService.update(existentQuote.id, newQuoteData),
      ).rejects.toThrowError(InvalidDataException);
      expect(prismaService.quote.update).toBeCalledTimes(0);
    });
    it('Should throw an error if departure date has already passed', async () => {
      const existentQuote = quoteFactory.build({ id: faker.string.uuid() });
      const newQuoteData = quoteFactory.build({
        departure_date: faker.date.past(),
      });

      prismaService.quote.findUnique = jest
        .fn()
        .mockResolvedValue(existentQuote);

      await expect(
        quoteService.update(existentQuote.id, newQuoteData),
      ).rejects.toThrowError(InvalidDataException);
      expect(prismaService.quote.update).toBeCalledTimes(0);
    });
    it('Should throw an error if destination date has already passed', async () => {
      const existentQuote = quoteFactory.build({ id: faker.string.uuid() });
      const newQuoteData = quoteFactory.build({
        destination_date: faker.date.past(),
      });

      prismaService.quote.findUnique = jest
        .fn()
        .mockResolvedValue(existentQuote);

      await expect(
        quoteService.update(existentQuote.id, newQuoteData),
      ).rejects.toThrowError(InvalidDataException);
      expect(prismaService.quote.update).toBeCalledTimes(0);
    });
    it('Should throw an error if quote does not exist', async () => {
      const newQuoteData = quoteFactory.build();

      prismaService.quote.findUnique = jest.fn().mockResolvedValue(null);

      await expect(
        quoteService.update(faker.string.uuid(), newQuoteData),
      ).rejects.toThrowError(EntityNotFoundException);
      expect(prismaService.quote.update).toBeCalledTimes(0);
    });
  });
  describe('Delete', () => {
    it('Should delete a quote', async () => {
      const existentQuote = quoteFactory.build({ id: faker.string.uuid() });

      prismaService.quote.findUnique = jest
        .fn()
        .mockResolvedValue(existentQuote);

      await quoteService.delete(existentQuote.id);

      expect(prismaService.quote.delete).toHaveBeenCalledTimes(1);
    });
    it('Should throw an error if quote does not exist', async () => {
      prismaService.quote.findUnique = jest.fn().mockResolvedValue(null);

      await expect(
        quoteService.delete(faker.string.uuid()),
      ).rejects.toThrowError(EntityNotFoundException);
      expect(prismaService.quote.delete).toBeCalledTimes(0);
    });
  });
});
