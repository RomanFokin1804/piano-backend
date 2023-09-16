import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor() {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const { httpStatus, responseBody, errorStack, errorMessage } = (() => {
      console.log(exception);
      if (exception instanceof Prisma.PrismaClientKnownRequestError) {
        return {
          httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
          responseBody: {
            error: exception?.meta?.cause || exception,
          },
          errorStack: exception.stack,
          errorMessage: exception.message,
        };
      } else if (exception instanceof HttpException) {
        const responseBody = exception.getResponse();
        const httpStatus = exception.getStatus();
        const errorStack = exception.stack;
        const errorMessage = responseBody['message'] || 'Error';

        if (httpStatus === HttpStatus.UNPROCESSABLE_ENTITY) {
          const errors = responseBody['errors'];

          return {
            httpStatus,
            responseBody: {
              message: 'Unprocessable Entity',
              errors,
            },
            errorStack,
            errorMessage,
          };
        } else {
          const message = responseBody['message'] || 'Error';
          const error = responseBody.hasOwnProperty('error')
            ? responseBody['error']
            : message;
          const data = responseBody.hasOwnProperty('data')
            ? responseBody['data']
            : undefined;

          return {
            httpStatus,
            responseBody: {
              message,
              error,
              data,
            },
            errorStack,
            errorMessage,
          };
        }
      } else {
        return {
          httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
          responseBody: { result: false },
          errorStack: '',
          errorMessage: '',
        };
      }
      // else if (exception instanceof Error) {
      //   const responseBody = {
      //     message: 'Internal Server Error',
      //     error: exception.message,
      //   };
      //   const errorStack = exception.stack;
      //   const errorMessage = exception.message;
      //
      //   return {
      //     httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      //     responseBody,
      //     errorStack,
      //     errorMessage,
      //   };
      // } else {
      //   const responseBody = {
      //     message: 'Internal Server Error',
      //     error: 'Something wrong!',
      //   };
      //   const errorMessage = 'Something wrong!';
      //
      //   return {
      //     httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      //     responseBody,
      //     errorStack: exception,
      //     errorMessage,
      //   };
      // }
    })();

    return response.status(httpStatus).json(responseBody);
  }
}
