"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimitError = exports.GeminiAPIError = exports.UnauthorizedError = exports.NotFoundError = exports.BadRequestError = exports.AppError = void 0;
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = statusCode.toString().startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
class BadRequestError extends AppError {
    constructor(message) {
        super(message, 400);
    }
}
exports.BadRequestError = BadRequestError;
class NotFoundError extends AppError {
    constructor(message) {
        super(message, 404);
    }
}
exports.NotFoundError = NotFoundError;
class UnauthorizedError extends AppError {
    constructor(message) {
        super(message, 401);
    }
}
exports.UnauthorizedError = UnauthorizedError;
class GeminiAPIError extends AppError {
    constructor(message, statusCode, details) {
        super(message, statusCode);
        this.details = details;
    }
}
exports.GeminiAPIError = GeminiAPIError;
class RateLimitError extends AppError {
    constructor(message, retryAfter) {
        super(message, 429);
        this.retryAfter = retryAfter;
    }
}
exports.RateLimitError = RateLimitError;
