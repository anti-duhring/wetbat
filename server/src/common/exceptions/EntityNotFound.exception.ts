import { HttpException, HttpStatus } from '@nestjs/common';

export class EntityNotFoundException extends HttpException {
  /**
   * Exception to be thrown when an entity is not found for any reason.
   * @constructs EntityNotFoundException
   * @param entityName The name of the entity that was not found. Ex: "Contact" or "Quote"
   */
  constructor(entityName: string) {
    super(`${entityName} not found`, HttpStatus.NOT_FOUND);
  }
}
