import { Sequelize } from "sequelize-typescript";

import configData from "./config/config.ts";

const env = process.env.NODE_ENV || "development";
const config = configData[env];

const sequelize = new Sequelize({ ...config });

export default sequelize;
