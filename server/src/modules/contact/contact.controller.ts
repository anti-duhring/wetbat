import {
  Controller,
  Post,
  Get,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactDTO } from './contact.dto';
import { ContactUpdateDTO } from './contact.types';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async create(@Body() data: ContactDTO) {
    try {
      return this.contactService.create(data);
    } catch (err) {
      console.error(err);
    }
  }

  @Get()
  async findAll() {
    try {
      return this.contactService.findAll();
    } catch (err) {
      console.error(err);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: ContactUpdateDTO) {
    try {
      return this.contactService.update(id, data);
    } catch (err) {
      console.error(err);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return this.contactService.delete(id);
    } catch (err) {
      console.error(err);
    }
  }
}
