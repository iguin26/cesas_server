import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

export const EjaFaq = sequelize.define(
  "EjaFaq",
  {
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
  }
);
await EjaFaq.sync({ alter: true });
