"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const path_1 = __importDefault(require("path"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const routes_1 = __importDefault(require("./routes"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const notFound_1 = __importDefault(require("./middleware/notFound"));
const securityConfig_1 = require("./utils/securityConfig");
const logger_1 = __importDefault(require("./utils/logger"));
const swaggerConfig_1 = __importDefault(require("./utils/swaggerConfig"));
const app = (0, express_1.default)();
app.use((0, helmet_1.default)(securityConfig_1.helmetOptions));
app.use((0, cors_1.default)(securityConfig_1.corsOptions));
app.use((0, express_rate_limit_1.default)(securityConfig_1.rateLimitOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((req, res, next) => {
    logger_1.default.info(`${req.method} ${req.url}`);
    next();
});
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerConfig_1.default));
app.use('/api/v1', routes_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, '../../client/dist')));
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../client/dist/index.html'));
});
app.use(notFound_1.default);
app.use(errorHandler_1.default);
exports.default = app;
