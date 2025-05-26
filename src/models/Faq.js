import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

export const Faq = sequelize.define(
  "Faq",
  {
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    show: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    freezeTableName: true,
  }
);
// await Faq.sync({ alter: true });
