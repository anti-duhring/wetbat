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
    contactId: faker.string.uuid(),
    departure_date: faker.date.soon(),
    departure_location: faker.location.city(),
    destination_date: faker.date.future(),
    destination_location: faker.location.city(),
    price: faker.number.int(),
    transportation: faker.vehicle.type(),
    travellers_amount: faker.number.int(),
    status: faker.helpers.arrayElement(Object.values(QuoteStatus)),
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

      const createSpy = jest.spyOn(prismaService.quote, 'create');
      const result = await quoteService.create(newQuoteData);

      expect(createSpy).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ ...newQuoteData, id: expect.any(String) });
      expect(result.status).toBe(QuoteStatus.PENDING);
    });
    it('Should throw an error if departure date is greater than destination date', async () => {
      const newQuoteData = quoteFactory.build({
        destination_date: faker.date.soon(),
        departure_date: faker.date.future(),
      });

      const createSpy = jest.spyOn(prismaService.quote, 'create');

      await expect(quoteService.create(newQuoteData)).rejects.toThrowError(
        InvalidDataException,
      );
      expect(createSpy).toBeCalledTimes(0);
    });
  });

  describe('Get All', () => {
    it('Should get all quotes', async () => {
      const getAllSpy = jest.spyOn(prismaService.quote, 'findMany');
      const result = await quoteService.findAll();

      expect(getAllSpy).toHaveBeenCalledTimes(1);
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

      const updateSpy = jest.spyOn(prismaService.quote, 'update');
      const result = await quoteService.update(existentQuote.id, newQuoteData);

      expect(updateSpy).toHaveBeenCalledTimes(1);
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

      const updateSpy = jest.spyOn(prismaService.quote, 'update');

      await expect(
        quoteService.update(existentQuote.id, newQuoteData),
      ).rejects.toThrowError(InvalidDataException);
      expect(updateSpy).toBeCalledTimes(0);
    });
    it('Should throw an error if quote does not exist', async () => {
      const newQuoteData = quoteFactory.build();

      prismaService.quote.findUnique = jest.fn().mockResolvedValue(null);

      const updateSpy = jest.spyOn(prismaService.quote, 'update');

      await expect(
        quoteService.update(faker.string.uuid(), newQuoteData),
      ).rejects.toThrowError(EntityNotFoundException);
      expect(updateSpy).toBeCalledTimes(0);
    });
  });
});
