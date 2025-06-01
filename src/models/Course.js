import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";
import { Subject } from "./Subject.js";

export const Course = sequelize.define("Course", {
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
  subject: {
    type: DataTypes.INTEGER,
    allowNull: true,
    // references: {
    //   model: Subject,
    //   key: "id",
    // },
  },
  image: {
    type: DataTypes.STRING,
  },
  show: {
    type: DataTypes.BOOLEAN,
  },
});
// await Course.sync({ alter: true });
