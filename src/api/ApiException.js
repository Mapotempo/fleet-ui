export class BaseApiException extends Error {
  constructor(message, status) {
    super(message, status);
    this.name = "BaseApiException";
    this.status = status;
  }
}

export class CancelApiException extends BaseApiException {
  constructor() {
    super("Fetch cancel", -1);
    this.name = "CancelApiException";
  }
}

export class AuthApiException extends BaseApiException {
  constructor(message, status) {
    super(message, status);
    this.name = "AuthApiException";
  }
}

export class IgnoredApiException extends BaseApiException {
  constructor(message) {
    super(message, status);
    this.name = "IgnoredApiException";
  }
}
