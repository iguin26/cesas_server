import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const ejaSubmitFormTitle = sequelize.define("ejaSubmitFormTitle", {
  name: {
    type: DataTypes.STRING,
  },
});

await ejaSubmitFormTitle.sync();
