import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

export const Subject = sequelize.define("Subject", {
  name: {
    type: DataTypes.STRING,
    unique: true,
  },
});
// await Subject.sync({ alter: true });
