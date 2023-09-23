export enum ErrorCode {
  BAD_REQUEST = "bad_request",
  CONFLICT = "conflict",
  NOT_FOUND = "not_found",
  UNAUTHORIZED = "unauthorized",
}

export class HTTPError {
  private readonly status: number;
  private readonly message: string;
  private readonly code: ErrorCode;

  constructor(status: number, code: ErrorCode, message: string) {
    this.status = status;
    this.code = code;
    this.message = message;
  }

  getStatus() {
    return this.status;
  }

  getMessage() {
    return this.message;
  }

  getCode() {
    return this.code;
  }
}
