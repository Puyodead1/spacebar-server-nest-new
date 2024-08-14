import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { classToPlain } from "class-transformer";
import { map, Observable } from "rxjs";

// the purpose of this interceptor is to strip @Excluded decorated properties from the response

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => classToPlain(data)));
  }
}
