import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  Injectable,
} from '@nestjs/common';
import { Response } from 'express';

/**
 *? @Catch() 데코레이터는 처리되지 않은 모든 예외를 잡으려고 할 때 사용
 *? 대부분의 예외는 Nest에서 HttpException을 상속받는 클래스들로 제공
 *? HttpException이 아닌 예외는 알 수 없는 에러로써 InternalServerException로 처리되도록 함
 *? UseFilter() 데코레이터로 컨트롤러에 직접 적용하거나 전역으로 적용 할 수 있음
 *? 보통 예외 필터는 전역필터를 하나만 가지도록 하는것이 일반적
 */
@Catch()
@Injectable()
export class HttpExceptionFilter implements ExceptionFilter {
  // public catch(exception: HttpException, host: ArgumentsHost): void {
  //   const ctx = host.switchToHttp();
  //   const response = ctx.getResponse<Response>();
  //   const status = exception.getStatus();
  //   const error = exception.name;
  //   const message = exception.message;

  //   console.log(`[Exception Filter] `, exception);

  //   if (status == 500) console.error(exception);

  //   response.status(status).json({
  //     error,
  //     message,
  //   });
  // }

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    if (!(exception instanceof HttpException)) {
      exception = new InternalServerErrorException();
    }

    /*
    ? type assertion
    ? typescript보다 타입을 명확하게 알고 있을 경우 사용
    ? exception의 타입이 Error이지만 보다 명확한 HttpException 타입이 올것이라는 것을 알고 있기 때문에
    ? as 를 사용하여 타입 명시
    ? 코드의 런타임 동작에는 영향을 주지 않는다.
    */
    const response = (exception as HttpException).getResponse();

    console.log(`exception.name : ${exception.name}
    exception.message : ${exception.message}`);

    const log = {
      timestamp: new Date(),
      url: req.url,
      response,
      errorName: exception.name,
    };

    console.log('[log] ', log);

    res
      .status((exception as HttpException).getStatus())
      .json({ error: exception.name, message: response });
  }
}
