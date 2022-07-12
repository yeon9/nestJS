import { HttpException, HttpStatus } from '@nestjs/common';
import * as TEXT from '../constants/text.constant';

export class HttpBadRequestError extends HttpException {
  constructor(error?: any) {
    // error.message = message;
    super(error || TEXT.HTTP_BAD_REQUEST_TEXT_DEFAULT, HttpStatus.BAD_REQUEST);
  }
}
