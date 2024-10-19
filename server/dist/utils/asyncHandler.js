"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler = (execution) => {
    return (req, res, next) => {
        execution(req, res, next).catch(next);
    };
};
exports.default = asyncHandler;
