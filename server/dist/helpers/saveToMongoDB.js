"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveToMongoDB = void 0;
const searchModel_1 = __importDefault(require("../models/searchModel"));
const logger_1 = __importDefault(require("../utils/logger"));
const saveToMongoDB = async (data) => {
    try {
        const mongoResult = await searchModel_1.default.create(data);
        logger_1.default.info('Saved to MongoDB:', mongoResult);
        return mongoResult;
    }
    catch (error) {
        logger_1.default.error('Error saving to MongoDB:', error);
        throw new Error('Failed to save data to MongoDB');
    }
};
exports.saveToMongoDB = saveToMongoDB;
