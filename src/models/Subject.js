import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

export const Subject = sequelize.define("Subject", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});
