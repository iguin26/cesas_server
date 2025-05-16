import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";
import { Subject } from "./Subject.js";

export const Course = sequelize.define("Course", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATEONLY,
  },
  end_date: {
    type: DataTypes.DATEONLY,
  },
  subject: {
    type: DataTypes.INTEGER,
    references: {
      model: Subject,
      key: "id",
    },
  },
  image: {
    type: DataTypes.STRING,
  },

  profilePhotoLocation: {
    type: DataTypes.STRING,
  },
});

export const syncCourse = () => {
  Course.sync({ alter: true }).then(() => {
    console.log("Tabela 'Course' atualizada com sucesso!");
  });
};

// syncCourse();
