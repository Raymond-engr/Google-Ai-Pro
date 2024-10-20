"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("../utils/logger"));
const MAX_RETRIES = 5;
const RETRY_DELAY = 5000;
const connectDB = async () => {
    let retries = MAX_RETRIES;
    while (retries > 0) {
        try {
            await mongoose_1.default.connect(process.env.MONGODB_URI, {
                serverSelectionTimeoutMS: 5000,
            });
            logger_1.default.info(`MongoDB Connected: ${mongoose_1.default.connection.host}`);
            return;
        }
        catch (error) {
            logger_1.default.error(`MongoDB connection failed. Retries left: ${retries - 1}. Error: ${error.message}`);
            retries -= 1;
            if (retries === 0) {
                logger_1.default.error('All retries exhausted. Exiting...');
                process.exit(1);
            }
            logger_1.default.info(`Retrying in ${RETRY_DELAY / 1000} seconds...`);
            await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
        }
    }
};
exports.default = connectDB;
