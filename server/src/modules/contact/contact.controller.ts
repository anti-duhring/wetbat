import { faker } from '@faker-js/faker';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import { CreateContactDTO, UpdateContactDTO } from './contact.dto';
import { ContactService } from './contact.service';

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new contact' })
  @ApiBody({ type: CreateContactDTO })
  async create(@Body() data: CreateContactDTO) {
    try {
      return this.contactService.create(data);
    } catch (err) {
      console.error(err);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all contacts' })
  async findAll() {
    try {
      return this.contactService.findAll();
    } catch (err) {
      console.error(err);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existent contact' })
  @ApiParam({ name: 'id', example: faker.string.uuid(), description: 'Contact ID' })
  @ApiBody({ type: UpdateContactDTO  })
  async update(@Param('id') id: string, @Body() data: UpdateContactDTO) {
    try {
      return this.contactService.update(id, data);
    } catch (err) {
      console.error(err);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an existent contact' })
  @ApiParam({ name: 'id', example: faker.string.uuid(), description: 'Contact ID'  })
  async delete(@Param('id') id: string) {
    try {
      return this.contactService.delete(id);
    } catch (err) {
      console.error(err);
    }
  }
}
