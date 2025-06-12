import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const profisSubmitFormTitle = sequelize.define("profisSubmitFormTitle", {
  name: {
    type: DataTypes.STRING,
  },
});
await profisSubmitFormTitle.sync();
