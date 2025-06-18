import { ErrorSeverity, ErrorType } from 'src/common/libs/Constants';
import { BaseCustomError } from '../base/base-custom.error';

export class BusinessRuleError extends BaseCustomError {
  constructor(
    code: string,
    message: string,
    details?: any,
    severity?: ErrorSeverity,
  ) {
    super(ErrorType.BUSINESS_RULE, code, message, details, severity);
  }
}
