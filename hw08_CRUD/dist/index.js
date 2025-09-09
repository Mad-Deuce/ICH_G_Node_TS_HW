"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const connectDatabase_1 = __importDefault(require("./db/connectDatabase"));
const server_1 = __importDefault(require("./server"));
const bootstrap = async () => {
    await (0, connectDatabase_1.default)();
    (0, server_1.default)();
};
bootstrap();
