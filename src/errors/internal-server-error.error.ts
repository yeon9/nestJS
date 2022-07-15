import { HttpException, HttpStatus } from '@nestjs/common';
import { HTTP_INTERNAL_SERVER_ERROR_TEXT_DEFAULT } from 'src/constants/text.constant';

export class InternalServerError extends HttpException {
  constructor(error?: any, message = 'Internal Server Error') {
    super(
      HttpException.createBody(
        error,
        message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      ),
      //   error || HTTP_INTERNAL_SERVER_ERROR_TEXT_DEFAULT,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
