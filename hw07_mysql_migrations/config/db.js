import { Sequelize } from "sequelize";
import configData from "./config";

const env = process.env.NODE_ENV || "development";
const config = configData[env];

const sequelize = new Sequelize({
    dialect: config.dialect,
    database: config.database,
    username: config.username,
    password: config.password,
    host: config.host,
    port: config.port,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        },
    }
});

export default sequelize;