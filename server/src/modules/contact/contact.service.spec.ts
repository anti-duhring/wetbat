import { faker } from '@faker-js/faker';
import { Test } from '@nestjs/testing';
import * as Factory from 'factory.ts';

import {
  EntityNotFoundException,
  InvalidDataException,
} from '../../common/exceptions';
import { PrismaService } from '../prisma/prisma.service';
import { ContactDTO } from './contact.dto';
import { ContactService } from './contact.service';

describe('Contact Service', () => {
  let contactService: ContactService;
  let prismaService: PrismaService;

  const contactFactory = Factory.Sync.makeFactory<ContactDTO>({
    email: Factory.each(() => faker.internet.email()),
    first_name: Factory.each(() => faker.person.firstName()),
    last_name: Factory.each(() => faker.person.lastName()),
    phone: Factory.each(() => faker.phone.number()),
  });

  beforeEach(async () => {
    const prismaServiceMocked = {
      provide: PrismaService,
      useValue: {
        contact: {
          create: jest
            .fn()
            .mockImplementation(({ data }) =>
              Promise.resolve({ ...data, id: faker.string.uuid() }),
            ),
          update: jest
            .fn()
            .mockImplementation(({ where, data }) =>
              Promise.resolve({ ...data, id: where.id }),
            ),
          delete: jest.fn().mockResolvedValue(true),
          findUnique: jest.fn(),
          findMany: jest
            .fn()
            .mockResolvedValue(
              new Array(5).fill(
                contactFactory.build({ id: faker.string.uuid() }),
              ),
            ),
        },
      },
    };
    const moduleRef = await Test.createTestingModule({
      providers: [ContactService, prismaServiceMocked],
    }).compile();

    contactService = moduleRef.get<ContactService>(ContactService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  describe('Create', () => {
    it('Should create a new contact', async () => {
      const newContact = contactFactory.build();

      prismaService.contact.findUnique = jest.fn().mockResolvedValue(null);

      const result = await contactService.create(newContact);

      expect(prismaService.contact.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ ...newContact, id: expect.any(String) });
    });
    it('Should throw an error if contact with same email already exists', async () => {
      const email = faker.internet.email();
      const newContact = contactFactory.build({ email });

      prismaService.contact.findUnique = jest
        .fn()
        .mockResolvedValue(contactFactory.build({ email }));

      await expect(contactService.create(newContact)).rejects.toThrow(
        InvalidDataException,
      );
      expect(prismaService.contact.create).toHaveBeenCalledTimes(0);
    });
    it('Should throw an error if contact with same phone already exists', async () => {
      const phone = faker.phone.number();
      const newContact = contactFactory.build({ phone });

      prismaService.contact.findUnique = jest
        .fn()
        .mockResolvedValue(contactFactory.build({ phone }));

      await expect(contactService.create(newContact)).rejects.toThrow(
        InvalidDataException,
      );
      expect(prismaService.contact.create).toHaveBeenCalledTimes(0);
    });
  });

  describe('Find all', () => {
    it('Should get all contacts', async () => {
      const result = await contactService.findAll();

      expect(prismaService.contact.findMany).toHaveBeenCalledTimes(1);
      expect(result.length).toEqual(5);
    });
  });

  describe('Update', () => {
    it('Should update a contact', async () => {
      const id = faker.string.uuid();
      const existentContact = contactFactory.build({ id });
      const updatedContact = contactFactory.build();

      prismaService.contact.findUnique = jest
        .fn()
        .mockImplementation(({ where }) =>
          Promise.resolve(where.id === id ? existentContact : null),
        );

      const result = await contactService.update(id, updatedContact);

      expect(prismaService.contact.update).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ ...updatedContact, id });
    });
    it('Should throw an error if contact does not exist', async () => {
      const id = faker.string.uuid();
      const updatedContact = contactFactory.build();

      prismaService.contact.findUnique = jest.fn().mockResolvedValue(null);

      await expect(contactService.update(id, updatedContact)).rejects.toThrow(
        EntityNotFoundException,
      );
      expect(prismaService.contact.update).toHaveBeenCalledTimes(0);
    });
    it('Should throw an error if contact with same email already exists', async () => {
      const id = faker.string.uuid();
      const email = faker.internet.email();

      const existentContact = contactFactory.build({ id });
      const updatedContact = contactFactory.build({ email });
      const contactWithSameEmail = contactFactory.build({ email });

      prismaService.contact.findUnique = jest
        .fn()
        .mockImplementation(({ where }) =>
          Promise.resolve(
            where.id === id ? existentContact : contactWithSameEmail,
          ),
        );

      await expect(contactService.update(id, updatedContact)).rejects.toThrow(
        InvalidDataException,
      );
      expect(prismaService.contact.update).toHaveBeenCalledTimes(0);
    });
    it('Should throw an error if contact with same phone already exists', async () => {
      const id = faker.string.uuid();
      const phone = faker.phone.number();

      const existentContact = contactFactory.build({ id });
      const updatedContact = contactFactory.build({ phone });
      const contactWithSamePhone = contactFactory.build({ phone });

      prismaService.contact.findUnique = jest
        .fn()
        .mockImplementation(({ where }) =>
          Promise.resolve(
            where.id === id ? existentContact : contactWithSamePhone,
          ),
        );

      await expect(contactService.update(id, updatedContact)).rejects.toThrow(
        InvalidDataException,
      );
      expect(prismaService.contact.update).toHaveBeenCalledTimes(0);
    });
  });

  describe('Delete', () => {
    it('Should delete a contact', async () => {
      const id = faker.string.uuid();
      const existentContact = contactFactory.build({ id });

      prismaService.contact.findUnique = jest
        .fn()
        .mockResolvedValue(existentContact);

      await contactService.delete(id);

      expect(prismaService.contact.delete).toHaveBeenCalledTimes(1);
    });
    it('Should throw an error if contact does not exist', async () => {
      const id = faker.string.uuid();

      prismaService.contact.findUnique = jest.fn().mockResolvedValue(null);

      await expect(contactService.delete(id)).rejects.toThrow(
        EntityNotFoundException,
      );
      expect(prismaService.contact.delete).toHaveBeenCalledTimes(0);
    });
  });
});
