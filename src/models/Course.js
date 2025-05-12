import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

export const Course = sequelize.define("Course", {
  name: {
    type: DataTypes.CHAR(),
    allowNull: false,
  },
});

export const syncCourse = () => {
  Course.sync({ alter: true }).then(() => {
    console.log("Tabela 'Course' atualizada com sucesso!");
  });
};
