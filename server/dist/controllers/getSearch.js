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
exports.getSearch = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const geminiService_1 = require("../services/geminiService");
const saveToMongoDB_1 = require("../helpers/saveToMongoDB");
const logger_1 = __importDefault(require("../utils/logger"));
const customErrors_1 = require("../utils/customErrors");
const searchModel_1 = __importDefault(require("../models/searchModel"));
exports.getSearch = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { q } = req.validatedQuery;
    logger_1.default.info(`Received search query: ${q}`);
    const query = q;
    const existingSearch = yield searchModel_1.default.findOne({ title: query });
    if (existingSearch) {
        logger_1.default.info(`Cache hit for query: ${query}`);
        return res.status(200).json({ success: true, data: [existingSearch], cached: true });
    }
    try {
        logger_1.default.info(`Making request to Gemini API for query: ${query}`);
        const aiResponse = yield (0, geminiService_1.generateResponse)(query);
        const dataToSave = {
            title: query,
            content: aiResponse,
            score: 1,
            createdAt: new Date()
        };
        logger_1.default.info(`Saving search result to database for query: ${query}`);
        const savedSearch = yield (0, saveToMongoDB_1.saveToMongoDB)(dataToSave);
        res.status(200).json({ success: true, data: [savedSearch], cached: false });
    }
    catch (error) {
        if (error instanceof customErrors_1.GeminiAPIError && error.statusCode === 429) {
            logger_1.default.error(`Rate limit exceeded for query: ${query}`);
            if ((_a = error.details) === null || _a === void 0 ? void 0 : _a.retryAfter) {
                throw new customErrors_1.RateLimitError('Gemini API rate limit exceeded', error.details.retryAfter);
            }
            else {
                throw new customErrors_1.RateLimitError('Gemini API rate limit exceeded');
            }
        }
        else if (error instanceof customErrors_1.GeminiAPIError) {
            logger_1.default.error(`Gemini API Error for query: ${query} - Status: ${error.statusCode}`);
            throw new customErrors_1.GeminiAPIError('Gemini API Error', error.statusCode, error.details);
        }
        else {
            logger_1.default.error(`Failed to process search query: ${error.message}`);
            throw new Error(`Failed to process search query: ${error.message}`);
        }
    }
}));
