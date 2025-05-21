import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Card = sequelize.define("Card", {
  name: {
    type: DataTypes.STRING,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
