import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

export const ProfisFaq = sequelize.define(
  "ProfisFaq",
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
await ProfisFaq.sync({ alter: true });
