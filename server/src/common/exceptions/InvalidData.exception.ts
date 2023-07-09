import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidDataException extends HttpException {
  /**
   * Exception to be thrown when the data provided has the right type and the syntax is correct, but it is not valid by a business logic.
   * Reference: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/422
   * @constructs InvalidDataException
   * @param message The error message to be displayed that indicates why the data is invalid
   */
  constructor(message: string) {
    super(message, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
