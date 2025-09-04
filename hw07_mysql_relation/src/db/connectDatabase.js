import sequelize from "./sequelize.js";

export const connectDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log("--- Database connection successfully ---");
    } catch (error) {
        console.log(`Database connection failed ${error}`);
    }
}