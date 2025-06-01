import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

export const Home = sequelize.define(
  "Home",
  {
    image: {
      type: DataTypes.STRING,
    },
    text: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);
// await Home.sync({ alter: true });
