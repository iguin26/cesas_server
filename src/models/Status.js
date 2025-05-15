import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Status = sequelize.define("Status", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

export const syncStatus = () => {
  Status.sync({ alter: true }).then(() => {
    console.log("Tabela 'Status' atualizada com sucesso!");
  });
};

// syncStatus();
