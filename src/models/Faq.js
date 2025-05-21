import { sequelize } from "../config/db";
import { DataTypes } from "sequelize";

export const Faq = sequelize.define(
  "Faq",
  {
    pergunta: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resposta: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);
