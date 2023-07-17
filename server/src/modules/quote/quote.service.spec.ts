import { Test } from '@nestjs/testing';
import { QuoteService } from './quote.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuoteDTO, QuoteDTO } from './quote.dto';
import { QuoteStatus } from './quote.types';
import * as Factory from 'factory.ts';
import { faker } from '@faker-js/faker';
import {
  EntityNotFoundException,
  InvalidDataException,
} from '../../common/exceptions';
import { ContactDTO } from '../contact/contact.dto';
import { AirportDTO } from '../airport/airport.dto';

describe('Quotes Service', () => {
  let quoteService: QuoteService;
  let prismaService: PrismaService;

  const quoteFactory = Factory.Sync.makeFactory<Partial<QuoteDTO>>({
    contactEmail: Factory.each(() => faker.internet.email()),
    departureDate: Factory.each(() => faker.date.soon()),
    departureLocationName: Factory.each(() => faker.location.city()),
    destinationDate: Factory.each(() => faker.date.future()),
    destinationLocationName: Factory.each(() => faker.location.city()),
    price: Factory.each(() => faker.number.int()),
    transportation: Factory.each(() => faker.vehicle.type()),
    travellersAmount: Factory.each(() => faker.number.int({ min: 1 })),
    status: Factory.each(() =>
      faker.helpers.arrayElement(Object.values(QuoteStatus)),
    ),
  });

  const contactFactory = Factory.Sync.makeFactory<Partial<ContactDTO>>({
    email: Factory.each(() => faker.internet.email()),
    firstName: Factory.each(() => faker.person.firstName()),
    lastName: Factory.each(() => faker.person.lastName()),
    phone: Factory.each(() => faker.phone.number()),
  });

  const airportFactory = Factory.Sync.makeFactory<Partial<AirportDTO>>({
    city: Factory.each(() => faker.location.city()),
    country: Factory.each(() => faker.location.country()),
    lat: Factory.each(() => faker.location.latitude() as any),
    lon: Factory.each(() => faker.location.longitude() as any),
    name: Factory.each(() => `Airport of ${faker.location.city()}`),
    state: Factory.each(() => faker.location.state()),
    tz: Factory.each(() => faker.location.timeZone()),
  })

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
          findUnique: jest.fn().mockResolvedValue(null),
        },
        contact: {
          findUnique: jest.fn().mockResolvedValue(null),
        },
        airport: {
          findUnique: jest.fn().mockResolvedValue(null),
        }
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
      const newQuoteData = quoteFactory.build() as CreateQuoteDTO;
      const contact = contactFactory.build({ email: newQuoteData.contactEmail }); 

      prismaService.contact.findUnique = jest
      .fn()
      .mockResolvedValue(contact);

      prismaService.airport.findUnique = jest.fn().mockImplementation(name => Promise.resolve(airportFactory.build({ name })))

      const result = await quoteService.create(newQuoteData);

      expect(prismaService.quote.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ ...newQuoteData, id: expect.any(String) });
      expect(result.status).toBe(QuoteStatus.PENDING);
    });
    it('Should throw an error if departure date is greater than destination date', async () => {
      const newQuoteData = quoteFactory.build({
        destinationDate: faker.date.soon(),
        departureDate: faker.date.future(),
      }) as CreateQuoteDTO;

      await expect(quoteService.create(newQuoteData)).rejects.toThrowError(
        InvalidDataException,
      );
      expect(prismaService.quote.create).toBeCalledTimes(0);
    });
    it('Should throw an error if departure date has already passed', async () => {
      const newQuoteData = quoteFactory.build({
        departureDate: faker.date.past(),
      }) as CreateQuoteDTO;

      await expect(quoteService.create(newQuoteData)).rejects.toThrowError(
        InvalidDataException,
      );
      expect(prismaService.quote.create).toBeCalledTimes(0);
    });
    it('Should throw an error if destination date has already passed', async () => {
      const newQuoteData = quoteFactory.build({
        destinationDate: faker.date.past(),
      }) as CreateQuoteDTO;

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
        destinationDate: faker.date.soon(),
        departureDate: faker.date.future(),
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
        departureDate: faker.date.past(),
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
        destinationDate: faker.date.past(),
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
