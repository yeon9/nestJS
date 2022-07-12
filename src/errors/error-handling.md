Standard Exception

```
throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
```

Custom Exception

```
throw new HttpException({
    status: HttpStatus.FORBIDDEN,
    error : 'THIS IS CUSTOM FORBIDDEN ERROR'
}, HttpStatus.FORBIDDEN)
```

HttpException(response: string | Record<string, any>, status: number)

.

Mostly, we do not need to write custom exceptions. Basically, we can use the built-in HttpException.

.

However, if you need to write your own exception, it is better to create an exception hierarchy. In other words, the custom exception should inherit from the standard HttpException class. By doing so, NestJS will automatically recognize our custom exceptions as well and build appropriate response objects.

```
export class BadRequestException extends HttpException{
    constructor(
        objectOrError?: string | object | any,
        desciption = 'Bad Request'
    ) {
        super(
            HttpException.createBody(
                objectOrError,
                description,
                HttpStatus.BAD_REQUEST
            ),
        HttpStatus.BAD_REQUEST
        )
    }
}
```

```
throw new BadRequestException('id는 0보다 큰 정수여야 합니다', 'id format exception');
```
