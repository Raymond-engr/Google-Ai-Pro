"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimitOptions = exports.helmetOptions = exports.corsOptions = void 0;
exports.corsOptions = {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST'],
    optionsSuccessStatus: 200
};
exports.helmetOptions = {
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ['\'self\''],
            scriptSrc: ['\'self\'', '\'unsafe-inline\''],
            styleSrc: ['\'self\'', '\'unsafe-inline\''],
            imgSrc: ['\'self\'', 'data:', 'https:'],
            connectSrc: ['\'self\'', 'https://generativelanguage.googleapis.com'],
            upgradeInsecureRequests: [],
        },
    },
    referrerPolicy: {
        policy: 'strict-origin-when-cross-origin',
    },
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
    },
    noSniff: true,
    xssFilter: true,
    hidePoweredBy: true,
    frameguard: {
        action: 'deny',
    },
};
exports.rateLimitOptions = {
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests from this IP, please try again later.',
    statusCode: 429,
    skipFailedRequests: false,
    skipSuccessfulRequests: false,
    limit: 100,
    requestPropertyName: 'rateLimit',
};
