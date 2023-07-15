import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateAirportDTO, UpdateAirportDTO } from './airport.dto';
import { EntityNotFoundException } from '../../common/exceptions';


@Injectable()
export class AirportService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAirportDTO) {
    return this.prisma.airport.create({ data });
  }
  
  async findAll() {
    const airports = await this.prisma.airport.findMany()
    return airports;
  }

  
  async update(id: number, data: UpdateAirportDTO) {
    const airportExists = await this.prisma.airport.findUnique({
      where: { id },
    });
    if (!airportExists) {
      throw new EntityNotFoundException('Airport');
    }

    return await this.prisma.airport.update({
      data,
      where: { id },
    });
  }

  async delete(id: number) {
    const airportExists = await this.prisma.airport.findUnique({
        where: { id },
    });

    if (!airportExists) {
        throw new EntityNotFoundException('Airport');
    }

    await this.prisma.airport.delete({
      where: { id },
    });
  }

  async findMostPopularDestinations(total: number = 5) {
    const airportsThatAppearsMostOnDestinations = await this.prisma.airport.findMany({
      orderBy: {
        quotesDestination: {
          _count: 'desc'
        }
      },
      take: 5,
      include: {
        quotesDestination: true
      }
    
    });

    return airportsThatAppearsMostOnDestinations
  }

  async findByText(text: string, total: number = 5) {
    const airports = await this.prisma.airport.findMany({
      where: {
        OR: [
          { name: { contains: text } },
          { city: { contains: text } },
          { state: { contains: text } },
          { country: { contains: text } },
        ],
      },
      take: total
    })

    return airports;
  
  }
}
