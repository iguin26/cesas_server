import { sequelize } from "../config/db";
import { DataTypes } from "sequelize";

export const Role = sequelize.define("Role", {
  name: {
    type: DataTypes.STRING,
  },
});
await Role.sync();
