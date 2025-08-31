import { DataTypes } from "sequelize";

import sequelize from "../sequelize.js";

const Product = sequelize.define(
    "product",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false
        }
    }
);

// Product.sync({ alter: true });

export default Product;