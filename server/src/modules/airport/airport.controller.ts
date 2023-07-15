import { faker } from '@faker-js/faker';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AirportService } from './airport.service';
import { CreateAirportDTO, UpdateAirportDTO } from './airport.dto';


@ApiTags('Airport')
@Controller('airport')
export class AirportController {
  constructor(private readonly airportService: AirportService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new airport' })
  @ApiBody({ type: CreateAirportDTO })
  async createQuote(@Body() data: CreateAirportDTO) {
    try {
      return this.airportService.create(data);
    } catch (err) {
      console.error(err);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all airports' })
  async getQuotes() {
    try {
      return this.airportService.findAll();
    } catch (err) {
      console.error(err);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existent airport' })
  @ApiParam({ name: 'id', example: faker.number.int({ min: 1, max: 100 }), description: 'Airport ID' })
  @ApiBody({ type: UpdateAirportDTO  })
  async updateQuote(@Param('id') id: number, @Body() data: UpdateAirportDTO) {
    try {
      return this.airportService.update(id, data);
    } catch (err) {
      console.error(err);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an existent airport' })
  @ApiParam({ name: 'id', example: faker.number.int({ min: 1, max: 100 }), description: 'Airport ID' })
  async deleteQuote(@Param('id') id: number) {
    try {
      return this.airportService.delete(id);
    } catch (err) {
      console.error(err);
    }
  }

  @Get('popular-destinations/:amount')
  @ApiOperation({ summary: 'Get the most popular destination airports' })
  @ApiParam({ name: 'amount', example: 5, description: 'The amount of airpots to be returned', required: false })
  async findMostPopularDestinations(@Param('amount') amount?: number) {
    try {
      return this.airportService.findMostPopularDestinations(amount);
    } catch (err) {
      console.error(err);
    }
  }

  @Get('search/:text')
  @ApiOperation({ summary: 'Search for airports by a given text. Returns the airport if it contains the given text in country, state, city or name property.' })
  @ApiParam({ name: 'text', example: faker.location.city(), description: 'The text to be searched', required: true })
  async findByText(@Param('text') text: string) {
    try {
      return this.airportService.findByText(text);
    } catch (err) {
      console.error(err);
    }
  }
}
