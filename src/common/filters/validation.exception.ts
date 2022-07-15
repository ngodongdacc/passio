import { BadRequestException, HttpException } from '@nestjs/common';
interface Error {
  error: string;
  message: string;
  code: number;
}
export class ValidationException extends BadRequestException {
  constructor(public validationErrors: Error[]) {
    super();
  }
}
