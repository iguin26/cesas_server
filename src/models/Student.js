import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { Status } from "./Status.js";

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
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  status: {
    type: DataTypes.INTEGER,
    references: {
      model: Status,
      key: "id",
    },
  },
});

export const syncStudent = () => {
  Student.sync({ alter: true }).then(() => {
    console.log("Tabela 'Student' atualizada com sucesso!");
  });
};

// syncStudent();
sequelize.sync();
