import { ErrorSeverity, ErrorType } from 'src/common/libs/Constants';
import { BaseCustomError } from '../base/base-custom.error';

export class DatabaseError extends BaseCustomError {
  constructor(
    code: string,
    message: string,
    details?: any,
    severity?: ErrorSeverity,
  ) {
    super(ErrorType.DATABASE, code, message, details, severity);
  }
}
