"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const database_1 = __importDefault(require("./db/database"));
const logger_1 = __importDefault(require("./utils/logger"));
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
(0, validateEnv_1.default)();
const PORT = parseInt(process.env.PORT || '3000', 10);
const startServer = async () => {
    try {
        await (0, database_1.default)();
        const server = app_1.default.listen(PORT, () => {
            const { port } = server.address();
            logger_1.default.info(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
        });
    }
    catch (error) {
        logger_1.default.error('Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
