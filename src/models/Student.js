import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Student = sequelize.define("Student", {
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },

  cep: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING,
  },
});

export const syncStudent = () => {
  Student.sync({ alter: true }).then(() => {
    console.log("Tabela 'Student' atualizada com sucesso!");
  });
};

// syncStudent();
