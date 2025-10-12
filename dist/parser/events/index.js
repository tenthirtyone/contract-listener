"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CTFExchange_1 = __importDefault(require("./CTFExchange"));
const ConditionalTokenFramework_1 = __importDefault(require("./ConditionalTokenFramework"));
exports.default = {
    parsers: [CTFExchange_1.default, ConditionalTokenFramework_1.default],
};
