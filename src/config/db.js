import { Sequelize } from "sequelize";
import "dotenv/config";

export const sequelize = new Sequelize(process.env.DB, {
  dialect: "postgres",
  logging: false,
  // dialectOptions: {
  //   ssl: {
  //     require: true,
  //     rejectUnauthorized: false // <<<<<<< YOU NEED THIS
  //   }
  // },
});

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
