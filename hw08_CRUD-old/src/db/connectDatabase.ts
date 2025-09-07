import sequelize from "./sequelize.ts";

export async function connectDatabase(): Promise<void> {
  try {
    await sequelize.authenticate();
    console.log(
      "--- Connection to the database has been established successfully. ---"
    );
  } catch (error) {
    console.log("Unable to connect to the database:", error);
  }
}
