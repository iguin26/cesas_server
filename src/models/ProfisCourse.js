import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

export const ProfisCourse = sequelize.define("ProfisCourses", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATEONLY,
  },
  end_date: {
    type: DataTypes.DATEONLY,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
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
// await ProfisCourse.sync({alter: true});
