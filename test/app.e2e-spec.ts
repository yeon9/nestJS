import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { careerDetailDto } from './../src/careers/dto/careerDetail.dto';
import { Career } from './../src/entities/careers.entity';

describe('[e2e Testing] Careers', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET /', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('GET /careers', () => {
    return request(app.getHttpServer()).get('/careers').expect(200);
  });

  it('GET /careers/:id', () => {
    return request(app.getHttpServer()).get('/careers/1').expect(200);
  });

  it('POST /careers', () => {
    const careerTest = {
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

    return request(app.getHttpServer())
      .post('/careers/1')
      .send(careerTest)
      .expect(200);
  });
});
