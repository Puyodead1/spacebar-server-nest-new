import { HttpException } from "@nestjs/common";
import { FieldErrorMessages, FieldErrorTypes } from "../constants";

export function FieldErrors(fields: Record<string, { code?: string; message: string }> = {}) {
  return new FieldException(
    50035,
    FieldErrorMessages.BASE_TYPE_INVALID,
    Object.keys(fields).map((key) => {
      const { code, message } = fields[key];

      return {
        [key]: {
          _errors: [
            {
              message,
              code: code || FieldErrorTypes.BASE_TYPE_INVALID,
            },
          ],
        },
      };
    }),
  );
}

export class FieldException extends HttpException {
  constructor(
    public readonly code: number,
    public readonly message: string,
    public readonly errors?: object,
  ) {
    super(
      {
        code,
        message,
        errors,
      },
      400,
    );
  }
}
