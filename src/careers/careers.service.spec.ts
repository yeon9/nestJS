import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Career } from '../entities/careers.entity';
import { CareersService } from './careers.service';

const mockCareerRepository = () => {
  save: jest.fn();
  find: jest.fn();
  findOne: jest.fn();
};

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('CareersService', () => {
  let service: CareersService;
  let careerRepository: MockRepository<Career>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        //  CareersService,
        {
          provide: CareersService,
          useValue: {},
        },
        {
          provide: getRepositoryToken(Career),
          useValue: mockCareerRepository(),
        },
      ],
    }).compile();

    service = module.get<CareersService>(CareersService);
    careerRepository = module.get<MockRepository<Career>>(
      getRepositoryToken(Career),
    );
  });

  it('should be equal', async () => {
    // Given
    //     const newCareer: CreateCareerDto = {
    //       position: 'DBA',
    //       stack: '데이터, MySQL, Shell',
    //       contract: '정규직',
    //       group: 'DB',
    //       content: `이런 분과 함께하고 싶어요

    // DBA로서 5년 이상의 경험을 가지고 계시며, 특히 MySQL DB(MariaDB) 3년 이상의 경험이 있으신 분이 필요해요.
    // 대용량 DB 운영 경험과 함께 SQL 튜닝이 가능하신 분이 필요해요.
    // MongoDB 운영 경험이 있으면 좋아요.
    // Python으로 운영 자동화 스크립트 개발 경험이 있으면 좋아요.
    // AWS RDS 운영 경험이 있으면 좋아요.`,
    //     };

    const career = {
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

    // When
    //await service.findAll();
    //const compareCareer = await service.findOne(career.id);
    //console.log(`career : ${career}`);
    // Then
    careerRepository.save.mockResolvedValue(career);
    const result = await service.create(career);

    expect(careerRepository.save).toHaveBeenCalledTimes(1);
    expect(careerRepository.save).toHaveBeenCalledWith(career);
  });
});
