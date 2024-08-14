import { HttpException } from "@nestjs/common";
import "missing-native-js-functions";

export class ApiException extends HttpException {
  constructor(
    public readonly message: string,
    public readonly code: number,
    public readonly httpStatus: number = 400,
    public readonly defaultParams?: string[],
  ) {
    super(
      {
        code,
        message: applyParamsToString(message, defaultParams),
      },
      httpStatus,
    );
  }
}

export function applyParamsToString(s: string, params: (string | number)[] = []): string {
  let newString = s;
  params.forEach((a) => {
    newString = newString.replace("{}", "" + a);
  });
  return newString;
}
