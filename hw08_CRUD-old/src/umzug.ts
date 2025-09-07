import { Umzug, SequelizeStorage } from "umzug";
import { Sequelize, Options } from "sequelize";
// import config from "./config"

import sequelize from "./db/sequelize";

export const migrator = new Umzug({
  migrations: {
    glob: ["data/migrations/*.ts", { cwd: __dirname }],
  },
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize,
    tableName: "migrations",
  }),
  logger: console,
});

export type Migration = typeof migrator._types.migration;
