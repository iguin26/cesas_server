import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Supervision = sequelize.define("Supervision", {
  member: {
    type: DataTypes.STRING,
  },
});

await Supervision.sync();
