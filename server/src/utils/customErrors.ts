class AppError extends Error {
  statusCode: number;
  status: 'fail' | 'error';
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode.toString().startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

class BadRequestError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404);
  }
}

class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(message, 401);
  }
}

class GeminiAPIError extends AppError {
  constructor(message: string, statusCode: number, details?: any) {
    super(message, statusCode);
    this.details = details;
  }
  details?: any;
}

class RateLimitError extends AppError {
  constructor(message: string, retryAfter?: number) {
    super(message, 429);
    this.retryAfter = retryAfter;
  }
  retryAfter?: number;
}

export { AppError, BadRequestError, NotFoundError, UnauthorizedError, GeminiAPIError, RateLimitError };