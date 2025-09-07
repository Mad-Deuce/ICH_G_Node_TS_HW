import { DataTypes } from "sequelize";

import sequelize from "../sequelize";

const Book = sequelize.define(
  "Book",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: true, paranoid: true }
);

// Book.sync({ force: true });

export default Book;
