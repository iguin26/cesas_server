import { sequelize } from "../config/db";
import { DataTypes } from "sequelize";

export const Home = sequelize.define(
  "Home",
  {
    imagem: {
      type: DataTypes.STRING,
    },
    texto: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);
