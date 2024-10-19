"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGeminiError = handleGeminiError;
const axios_1 = __importDefault(require("axios"));
const logger_1 = __importDefault(require("../utils/logger"));
const customErrors_1 = require("../utils/customErrors");
function handleGeminiError(error) {
    if (axios_1.default.isAxiosError(error)) {
        if (error.response) {
            if (error.response.status === 429) {
                const retryAfter = error.response.headers['retry-after'];
                logger_1.default.error('Gemini API rate limit reached');
                throw new customErrors_1.GeminiAPIError('Gemini API Rate Limit Exceeded', 429, { retryAfter });
            }
            logger_1.default.error('Gemini API error:', error.response.data);
            throw new customErrors_1.GeminiAPIError(`Gemini API Error ${error.response.status}`, error.response.status, error.response.data);
        }
        else if (error.request) {
            logger_1.default.error('Gemini API Request Error', 0, error.request);
            throw new customErrors_1.GeminiAPIError('Gemini API Request Error', 0, error.request);
        }
        else {
            logger_1.default.error('Gemini API Error', 0, error.message);
            throw new customErrors_1.GeminiAPIError('Gemini API Error', 0, error.message);
        }
    }
    logger_1.default.error('Unexpected error: Failed to generate response', error);
    throw new customErrors_1.GeminiAPIError('Error in Gemini API call', 500, error);
}
