import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Card = sequelize.define("Card", {
  name: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
  },
  text: {
    type: DataTypes.STRING,
  },
  show: {
    type: DataTypes.BOOLEAN,
  },
});

export const syncCards = () => {
  Card.sync({ alter: true }).then(() => {
    console.log("Tabela 'Cards' atualizada com sucesso!");
  });
};

// syncCards();
