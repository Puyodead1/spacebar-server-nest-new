import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from "express";
import { ApiException } from "./exceptions/api.exeption";
import { FieldException } from "./exceptions/field.exception";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception instanceof ApiException ? exception.httpStatus : exception.getStatus();
    const code = exception instanceof ApiException || exception instanceof FieldException ? exception.code : 0;
    const errors = exception instanceof FieldException ? exception.errors : undefined;

    response.status(status).json({
      message: exception.message,
      code,
      errors,
    });
  }
}
