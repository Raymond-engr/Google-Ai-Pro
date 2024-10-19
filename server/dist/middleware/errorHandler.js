"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../utils/logger"));
const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.statusCode >= 400 && err.statusCode < 500 ? 'fail' : 'error';
    logger_1.default.error('Error', err);
    if (process.env.NODE_ENV === 'development') {
        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        });
    }
    else if (process.env.NODE_ENV === 'production') {
        const error = Object.assign({}, err);
        error.message = err.message;
        if (error.isOperational) {
            res.status(err.statusCode).json({
                status: err.status,
                message: err.message
            });
        }
        else {
            res.status(500).json({
                status: 'error',
                message: 'Server Error!, Something went wrong!'
            });
        }
    }
};
exports.default = errorHandler;
