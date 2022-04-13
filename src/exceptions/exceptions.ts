export class BaseHTTPException extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = "BaseHttpException";
    this.statusCode = 500;
  }
}

export class BadRequestException extends BaseHTTPException {
  constructor(message: string) {
    super(message);
    this.name = "BadRequestException";
    this.statusCode = 400;
  }
}

export class UnauthorizedException extends BaseHTTPException {
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedException";
    this.statusCode = 401;
  }
}

export class ServerErrorException extends BaseHTTPException {
  constructor(message: string) {
    super(message);
    this.name = "ServerErrorException";
  }
}
