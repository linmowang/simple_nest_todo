import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { ReportLogger } from './ReportLogger';
import { tap } from 'rxjs';

export class LogInterCeptor implements NestInterceptor {
  constructor(private reportLogger: ReportLogger) {
    this.reportLogger.setContext('LogInterCeptor');
  }
  intercept(context: ExecutionContext, next: CallHandler) {
    const http = context.switchToHttp();
    const request = http.getRequest();
    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        this.reportLogger.log(
          `${request.method} ${request.url} ${Date.now() - now}ms`,
        );
      }),
    );
  }
}
