"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const logger_1 = __importDefault(require("../utils/logger"));
const customErrors_1 = require("../utils/customErrors");
const searchSchema = joi_1.default.object({
    q: joi_1.default.string().min(1).max(100).required(),
});
const validateSearchQuery = (req, res, next) => {
    const { error, value } = searchSchema.validate(req.query);
    if (error) {
        logger_1.default.warn(`Invalid search query: ${error.details[0].message}`);
        return next(new customErrors_1.BadRequestError(error.details[0].message));
    }
    req.validatedQuery = value;
    next();
};
exports.default = validateSearchQuery;
