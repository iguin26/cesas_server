import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

export const Subject = sequelize.define("Subject", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  secret_key: {
    type: DataTypes.STRING,
  },
});

export const syncSubject = () => {
  Subject.sync({ alter: true }).then(() => {
    console.log("Tabela 'Subject' atualizada com sucesso!");
  });
};

// syncSubject();
