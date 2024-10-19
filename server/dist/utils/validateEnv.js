"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const envalid_1 = require("envalid");
dotenv_1.default.config();
const validateEnv = () => {
    (0, envalid_1.cleanEnv)(process.env, {
        NODE_ENV: (0, envalid_1.str)({ choices: ['development', 'test', 'production'] }),
        PORT: (0, envalid_1.port)(),
        MONGODB_URI: (0, envalid_1.url)(),
        GEMINI_API_KEY: (0, envalid_1.str)(),
        FRONTEND_URL: (0, envalid_1.url)(),
        LOG_LEVEL: (0, envalid_1.str)({ choices: ['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly'] }),
    });
};
exports.default = validateEnv;
