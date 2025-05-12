import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Card = sequelize.define("Card", {
  name: DataTypes.STRING,
  image: DataTypes.STRING,
  text: DataTypes.STRING,
});

export const syncCards = () => {
  Card.sync({ alter: true }).then(() => {
    console.log("Tabela 'Cards' atualizada com sucesso!");
  });
};

// syncCards();
