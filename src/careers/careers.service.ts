import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Career } from '../entities/careers.entity';
import { CreateCareerDto } from './dto/createCareer.dto';

@Injectable()
export class CareersService {
  constructor(
    @InjectRepository(Career)
    private careersRepository: Repository<Career>,
  ) {}

  async findAll(): Promise<Career[]> {
    const result: Career[] = await this.careersRepository.find();
    console.log(result);
    return result;
  }

  findOne(id: number): Promise<Career> {
    return this.careersRepository.findOne({
      where: { id },
    });
  }

  async create(career: CreateCareerDto) {
    await this.careersRepository.save(career);
  }

  async remove(id: number): Promise<void> {
    await this.careersRepository.delete(id);
  }

  async update(id, career: Career): Promise<Career | string> {
    const existCareer = await this.findOne(id);
    if (!existCareer) return '진행중인 채용 포지션이 없습니다.';

    for (let change in career)
      career[change] && (existCareer[change] = career[change]);

    await this.careersRepository
      .save(existCareer)
      .catch((err) => {
        console.log(err);
      })
      .then((result) => {
        console.log('[PATCH] result : ', result);
      });
  }
}
