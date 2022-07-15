import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Response,
  UseFilters,
  UseGuards,
  /* Logger,
  Injectable,*/
} from '@nestjs/common';
import { AuthGuard } from '../guard/auth.guard';
import { UsersService } from './user.service';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { HttpExceptionFilter } from '../exception-filter/http-exception.filter';
import { Logger as WinstonLogger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@UseGuards(AuthGuard)
@UseFilters(new HttpExceptionFilter())
@Controller('user')
export class UsersController {
  constructor(
    private usersService: UsersService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
  ) {}

  @Get()
  async test(@Response() res) {
    this.logger.error('level : error');
    this.logger.warn('level : warn');
    this.logger.info('level : info');
    this.logger.http('level : http');
    this.logger.verbose('level : verbose');
    this.logger.debug('level : debug');
    this.logger.silly('level : silly');

    throw new HttpException('Error!!', HttpStatus.BAD_REQUEST);

    res.status(200).json({ data: true });
  }

  // @UseGuards(AuthGuard)
  @UseFilters(new HttpExceptionFilter())
  @Post()
  async login(@Response() res, @Body() input: User) {
    console.log('POST /auth');

    const user = await this.usersService.getUser(input);

    if (!user)
      throw new HttpException(
        {
          status: 'Invalid User',
          error: 'Invalid User',
        },
        HttpStatus.BAD_REQUEST,
      );

    const result = await bcrypt.compare(input.password, user.password);
    if (!result)
      throw new HttpException(
        { message: 'Wrong Password', error: 'wrong pwd!!!' },
        HttpStatus.BAD_REQUEST,
      );

    res.status(200).json({ userId: user.userId });
  }
}
