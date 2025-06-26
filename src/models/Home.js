import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

export const Home = sequelize.define(
  "Homes",
  {
    image: {
      type: DataTypes.STRING,
    },
    text: {
      type: DataTypes.TEXT,
    },
  },
);

await Home.sync();
