import { HttpException, HttpStatus } from '@nestjs/common';

export class EntityNotFoundException extends HttpException {
  constructor(entityName: string) {
    super(`${entityName} not found`, HttpStatus.NOT_FOUND);
  }
}
