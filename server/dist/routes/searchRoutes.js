"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getSearch_1 = require("../controllers/getSearch");
const searchValidator_1 = __importDefault(require("../middleware/searchValidator"));
const router = (0, express_1.Router)();
router.route('/')
    .get(searchValidator_1.default, getSearch_1.getSearch);
exports.default = router;
