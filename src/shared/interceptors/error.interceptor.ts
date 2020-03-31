import { CallHandler, ExecutionContext, Injectable, NestInterceptor, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ArgumentError } from '../errors/argument.error';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        if (error instanceof ArgumentError) {
          throw new BadRequestException(error.message);
        } else {
          throw new InternalServerErrorException(error.message);
        }
      }));

  }
}
