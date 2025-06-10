import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Card = sequelize.define("Card", {
  name: {
    type: DataTypes.STRING,
  },
  title: {
    type: DataTypes.STRING,
  },
  text: {
    type: DataTypes.TEXT,
  },
  show: {
    type: DataTypes.BOOLEAN,
  },
});

// await Card.drop();
await Card.sync({ alter: true });
