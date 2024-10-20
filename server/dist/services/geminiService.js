"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateResponse = generateResponse;
const axios_1 = __importDefault(require("axios"));
const logger_1 = __importDefault(require("../utils/logger"));
const customErrors_1 = require("../utils/customErrors");
const handleGeminiErrors_1 = require("../helpers/handleGeminiErrors");
const generatePrompt_1 = require("../helpers/generatePrompt");
const validateEnv_1 = __importDefault(require("../utils/validateEnv"));
(0, validateEnv_1.default)();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
async function generateResponse(query) {
    if (!GEMINI_API_KEY) {
        logger_1.default.error('GEMINI_API_KEY is not set');
        throw new customErrors_1.AppError('GEMINI_API_KEY is not set', 500);
    }
    try {
        const response = await axios_1.default.post(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            contents: [{
                    parts: [{
                            text: (0, generatePrompt_1.generatePrompt)(query)
                        }]
                }]
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
            timeout: 30000
        });
        const { data } = response;
        logger_1.default.info('API Response:', data);
        if (data.candidates[0].finishReason === 'SAFETY') {
            throw new customErrors_1.AppError('The query was flagged for safety reasons', 400);
        }
        if (data.candidates[0]?.content?.parts?.[0]?.text) {
            return data.candidates[0].content.parts[0].text;
        }
        else {
            logger_1.default.error('Unexpected response structure from Gemini API:', response.data);
            throw new customErrors_1.AppError('Unexpected response structure from Gemini API', 500);
        }
    }
    catch (error) {
        (0, handleGeminiErrors_1.handleGeminiError)(error);
    }
}
