import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Card = sequelize.define("Card", {
  title: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
});

// await Card.drop();
await Card.sync({ alter: true });
