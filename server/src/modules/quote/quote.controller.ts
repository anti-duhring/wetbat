import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { QuoteService } from './quote.service';
import { QuoteDTO } from './quote.dto';
import { QuoteUpdateDTO } from './quote.types';

@Controller('quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Post()
  async createQuote(@Body() data: QuoteDTO) {
    try {
      return this.quoteService.create(data);
    } catch (err) {
      console.error(err);
    }
  }

  @Get()
  async getQuotes() {
    try {
      return this.quoteService.findAll();
    } catch (err) {
      console.error(err);
    }
  }

  @Put(':id')
  async updateQuote(@Param('id') id: string, @Body() data: QuoteUpdateDTO) {
    try {
      return this.quoteService.update(id, data);
    } catch (err) {
      console.error(err);
    }
  }

  @Delete(':id')
  async deleteQuote(@Param('id') id: string) {
    try {
      return this.quoteService.delete(id);
    } catch (err) {
      console.error(err);
    }
  }
}
