import { DataTypes } from "sequelize";

import sequelize from "../config/db.js";

const App = sequelize.define(
    "app",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        size: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
    },
    { timestamps: false }
);


export default App;
