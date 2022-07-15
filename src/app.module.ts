import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CareersModule } from './careers/careers.module';
import { Career } from './entities/careers.entity';
import { User } from './entities/user.entity';
import { UserModule } from './user/user.module';
import * as winston from 'winston';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'a12345678',
      database: 'SeedN',
      entities: [Career, User],
      synchronize: false,
      logging: ['query', 'error', 'info'],
    }),
    CareersModule,
    UserModule,
    WinstonModule.forRoot({
      // production 환경이면 info, level까지, 아니면 silly level까지 로그 출력
      transports: [
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike('Nest', {
              prettyPrint: true,
            }),
          ),
        }),
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
