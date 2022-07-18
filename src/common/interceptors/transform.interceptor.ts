import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map((result) => {
        if (Array.isArray(result) || typeof result !== 'object') {
          return result;
        }

        if (result.isStatic) {
          return result;
        }

        const { data, status, meta, code = 200, message = 'success', type, count } = result;
        const response: any = {};

        if (status) {
          response.status = status;
        } else {
          response.status = {
            success: true,
            code,
            message,
          };
        }

        response.data = data || null;
        if (count || count === 0) response.count = count;
        if (meta) {
          response.meta = meta || null;
        }

        if (type) {
          const ctx = context.switchToHttp();
          const res = ctx.getResponse();
          res.set({
            'Content-Type': type,
          });
          return res.send(data);
        }

        return response;
      }),
    );
  }
}
