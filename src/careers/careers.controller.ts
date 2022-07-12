import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Response,
  HttpException,
  HttpStatus,
  UseFilters,
  BadRequestException,
} from '@nestjs/common';
import { CareersService } from './careers.service';
import { Career } from 'src/entities/careers.entity';
import { HttpExceptionFilter } from 'src/exception-filter/http-exception.filter';
import { HttpBadRequestError } from 'src/errors/bad-request.error';
import * as TEXT from '../constants/text.constant';
import { CreateCareerDto } from './dto/createCareer.dto';

@Controller('careers')
@UseFilters(new HttpExceptionFilter())
export class CareersController {
  constructor(private careersService: CareersService) {}

  // @Get()
  // async getAllCareers(): Promise<Career[]> {
  //   return await this.careersService.findAll();
  // }

  @Get()
  async getAllCareers(@Response() res) {
    try {
      const careers: Career[] = await this.careersService.findAll();

      res.status(200).json({ data: careers });
    } catch (err) {
      console.error('[Error] ', err);
      const { status, error, message } = err.response;
      res.status(status).json({ error, message });
    }
  }

  @Get(':id')
  // @UseFilters(new HttpExceptionFilter())
  async getCareer(@Response() res, @Param('id') id: number) {
    const career: Career = await this.careersService.findOne(id);
    if (!career) {
      //throw new HttpBadRequestError('채용중인 포지션이 없습니다.');
      throw new HttpBadRequestError('채용중인 포지션이 없습니다.');
    }
    res.status(200).json({ data: career });
  }

  @Post()
  // @UseFilters(new HttpExceptionFilter())
  async create(@Response() res, @Body() career: CreateCareerDto) {
    await this.careersService
      .create(career)
      .catch((err) => {
        if (err.code == TEXT.HAVE_NO_VALUE)
          throw new HttpBadRequestError('입력되지 않은 값이 있습니다.');
      })
      .then(() => {
        res.status(200).json({ data: true });
      });

    // throw new HttpException(
    //   { status: HttpStatus.INTERNAL_SERVER_ERROR, error: 'Server Error' },
    //   HttpStatus.INTERNAL_SERVER_ERROR,
    // );
  }

  @Patch(':id')
  async update(
    @Response() res,
    @Body() career: Career,
    @Param('id') id: number,
  ) {
    try {
      await this.careersService.update(id, career);

      res.status(200).json({ data: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ err: 'Server Error', message: '서버 오류 발생' });
    }
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.careersService.remove(id);
  }
}
