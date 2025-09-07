// import "ts-node/register";
//  require('ts-node/register');

import { IConfigData } from "./IConfigData";

let configData: IConfigData = {
  development: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
  test: {
    username: "root",
    password: undefined,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
    port: Number(process.env.DATABASE_PORT),
  },
  production: {
    username: "root",
    password: undefined,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
    port: Number(process.env.DATABASE_PORT),
  },
};

export default configData;
