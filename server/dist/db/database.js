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
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("../utils/logger"));
const MAX_RETRIES = 5;
const RETRY_DELAY = 5000;
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    let retries = MAX_RETRIES;
    while (retries > 0) {
        try {
            yield mongoose_1.default.connect(process.env.MONGODB_URI, {
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
            yield new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
        }
    }
});
exports.default = connectDB;
