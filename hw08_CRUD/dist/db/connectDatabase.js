"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("./sequelize"));
const connectDatabase = async () => {
    try {
        await sequelize_1.default.authenticate();
        console.log("--- Connection to the database has been established successfully. ---");
    }
    catch (error) {
        console.log(`Unable to connect to the database: ${error}`);
    }
};
exports.default = connectDatabase;
