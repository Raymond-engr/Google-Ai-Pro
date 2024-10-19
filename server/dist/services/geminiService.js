"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
function generateResponse(query) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        if (!GEMINI_API_KEY) {
            logger_1.default.error('GEMINI_API_KEY is not set');
            throw new customErrors_1.AppError('GEMINI_API_KEY is not set', 500);
        }
        try {
            const response = yield axios_1.default.post(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
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
            if ((_d = (_c = (_b = (_a = data.candidates[0]) === null || _a === void 0 ? void 0 : _a.content) === null || _b === void 0 ? void 0 : _b.parts) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.text) {
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
    });
}
