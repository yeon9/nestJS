import { Response } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { response } from 'express';
import { Career } from 'src/entities/careers.entity';
import { UsersService } from 'src/user/user.service';
import { CareersController } from './careers.controller';
import { CareersService } from './careers.service';
import { careerDetailDto } from './dto/careerDetail.dto';

describe('CareersController', () => {
  let controller: CareersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      //   controllers: [CareersController],
      providers: [
        CareersService,
        {
          provide: getRepositoryToken(Career),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<CareersController>(CareersController);
  });

  it('should be defined', () => {
    const career: careerDetailDto = {
      id: 5,
      position: '기업 정보 보호 담당자',
      contract: '정규직',
      group: '보안',
      stack: 'ISMS • ISMS-P • CISSP',
      content:
        '• 개인정보보호법, 정보통신망법, 의료법에 대한 이해를 기초로 법령을 준수하고 컴플라언스 가이드를 비즈니스 팀에게 제공합니다.\n' +
        '• 개인정보보호 정책과 프로세스를 수립하고 관리합니다.\n' +
        '• 사내 개인정보 안전성 확보를 위한 조치를 검토하고 점검합니다.\n' +
        '• 사내 개인정보보호 인식 제고를 위한 교육과 캠페인을 계획하고 주도적으로 운영합니다.',
    };
    jest.spyOn(Career, 'findOne').mockRejectedValue(undefined);
    expect(controller.getAllCareers()).toBeDefined();
  });
});
