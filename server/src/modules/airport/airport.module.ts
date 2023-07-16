import { Module } from '@nestjs/common';
import { AirportController } from './airport.controller';
import { AirportService } from './airport.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [AirportController],
  providers: [AirportService, PrismaService],
})
export class AirportModule {}
