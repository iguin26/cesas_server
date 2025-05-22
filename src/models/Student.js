import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { Course } from "./Course.js";

export const Student = sequelize.define("Student", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  course: {
    type: DataTypes.INTEGER,
    references: {
      model: Course,
      key: "id",
    },
  },
  shift: {
    type: DataTypes.STRING,
  },
  were_student: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  health_issues: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },

  social_name: {
    type: DataTypes.STRING,
  },

  birthday: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nationality: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rg_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rg_date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rg_photo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  race: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cep: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cep_photo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telephone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  parent_name: {
    type: DataTypes.STRING,
  },
  parent_cpf: {
    type: DataTypes.STRING,
  },
  transcript: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  medical_report: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.INTEGER,
    references: {
      model: Status,
      key: "id",
    },
  },
});
