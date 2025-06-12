import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const File = sequelize.define("File", {
  filename: DataTypes.STRING,
  path: DataTypes.STRING,
});

await File.sync();
