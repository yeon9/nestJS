import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CareersController } from './careers.controller';
import { CareersService } from './careers.service';
import { Career } from '../entities/careers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Career])],
  exports: [TypeOrmModule],
  controllers: [CareersController],
  providers: [CareersService],
})
export class CareersModule {}
