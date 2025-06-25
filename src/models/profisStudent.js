import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
// import { Course } from "./ProfisCourse.js";

export const profisStudent = sequelize.define("profisStudent", {
  name: {
    type: DataTypes.STRING,
  },
  applyCourse: {
    type: DataTypes.STRING,
  },
  // applyCourseName: {
  //   type: DataTypes.STRING,
  // },
  applyShift: {
    type: DataTypes.STRING,
  },
  disabledStudent: {
    type: DataTypes.BOOLEAN,
  },
  levelOfEducation: {
    type: DataTypes.STRING,
  },
  specialNecessity: {
    type: DataTypes.STRING,
  },
  birthDate: {
    type: DataTypes.DATEONLY,
  },
  cpf: {
    type: DataTypes.STRING,
  },
  nationality: {
    type: DataTypes.STRING,
  },
  naturality: {
    type: DataTypes.STRING,
  },
  cep: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.TEXT,
  },
  phone: {
    type: DataTypes.STRING,
  },
  mothersName: {
    type: DataTypes.STRING,
  },
  fathersName: {
    type: DataTypes.STRING,
  },
  gender: {
    type: DataTypes.STRING,
  },
  studentMedicalReport: {
    type: DataTypes.STRING, // ------------------------------
  },
});
// await profisStudent.sync({alter: true});
