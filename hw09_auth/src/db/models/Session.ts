import { DataTypes } from "sequelize";

import sequelize from "../sequelize";

const Session = sequelize.define("session", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  },
  accessToken: {
    type: DataTypes.STRING,
  },
  accessTokenExpired: {
    type: DataTypes.DATE,
  },
  refreshToken: {
    type: DataTypes.STRING,
  },
  refreshTokenExpired: {
    type: DataTypes.DATE,
  },
});

export default Session;
