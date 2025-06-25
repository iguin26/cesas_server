import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

export const ejaCourse = sequelize.define("ejaCourses", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING(1024),
  },
  morningShiftAvailable: {
    type: DataTypes.BOOLEAN,
  },
  afternoonShiftAvailable: {
    type: DataTypes.BOOLEAN,
  },
  nightShiftAvailable: {
    type: DataTypes.BOOLEAN,
  },
});
await ejaCourse.sync({alter: true});
