import { ICustomError } from 'src/common/interfaces/commons.interface';
import { ErrorSeverity, ErrorType } from 'src/common/libs/Constants';

export abstract class BaseCustomError extends Error implements ICustomError {
  public readonly type: ErrorType;
  public readonly code: string;
  public readonly details?: any;
  public readonly severity: ErrorSeverity;
  public readonly timestamp: Date;
  public readonly stackTrace?: string;

  constructor(
    type: ErrorType,
    code: string,
    message: string,
    details?: any,
    severity: ErrorSeverity = ErrorSeverity.MEDIUM,
  ) {
    super(message);

    this.type = type;
    this.code = code;
    this.details = details;
    this.severity = severity;
    this.timestamp = new Date();
    this.stackTrace = this.stack;
    this.name = this.constructor.name;
  }
}
