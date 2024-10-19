"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFound = (req, res, next) => {
    const error = new Error(`Resource Not Found - ${req.originalUrl}`);
    error.statusCode = 404;
    error.isOperational = true;
    next(error);
};
exports.default = notFound;
