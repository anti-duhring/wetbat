import { faker } from '@faker-js/faker';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import { CreateQuoteDTO, UpdateQuoteDTO } from './quote.dto';
import { QuoteService } from './quote.service';

@ApiTags('Quote')
@Controller('quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new quote' })
  @ApiBody({ type: CreateQuoteDTO })
  async createQuote(@Body() data: CreateQuoteDTO) {
    try {
      return this.quoteService.create(data);
    } catch (err) {
      console.error(err);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all quotes' })
  async getQuotes() {
    try {
      return this.quoteService.findAll();
    } catch (err) {
      console.error(err);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existent quote' })
  @ApiParam({ name: 'id', example: faker.string.uuid(), description: 'Quote ID' })
  @ApiBody({ type: UpdateQuoteDTO  })
  async updateQuote(@Param('id') id: string, @Body() data: UpdateQuoteDTO) {
    try {
      return this.quoteService.update(id, data);
    } catch (err) {
      console.error(err);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an existent quote' })
  @ApiParam({ name: 'id', example: faker.string.uuid(), description: 'Quote ID'  })
  async deleteQuote(@Param('id') id: string) {
    try {
      return this.quoteService.delete(id);
    } catch (err) {
      console.error(err);
    }
  }
}
