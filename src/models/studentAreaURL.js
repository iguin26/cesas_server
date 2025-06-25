import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const studentAreaURL = sequelize.define("studentAreaURL", {
  URL: {
    type: DataTypes.STRING,
  },
});

await studentAreaURL.sync();
