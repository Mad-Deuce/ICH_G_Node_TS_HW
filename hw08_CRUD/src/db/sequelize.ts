import { Sequelize } from "sequelize";


const sequelize = new Sequelize({
  dialect: "mysql",
  port: Number(process.env.DATABASE_PORT),
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});



export default sequelize;
