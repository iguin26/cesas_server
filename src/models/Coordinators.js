import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Coordinators = sequelize.define("Coordinators", {
  member: {
    type: DataTypes.STRING,
  },
});

await Coordinators.sync();


