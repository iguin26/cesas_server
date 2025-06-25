import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
// import { Course } from "./ProfisCourse.js";

export const ejaStudent = sequelize.define("ejaStudent", {
  name: {
    type: DataTypes.STRING,
  },
  applyType: {
    type: DataTypes.STRING,
  },
  applyTypeName: {
    type: DataTypes.STRING,
  },
  studentPhoto: {
    type: DataTypes.STRING,
  },
  shift: {
    type: DataTypes.STRING,
  },
  legacyStudent: {
    type: DataTypes.BOOLEAN,
  },
  disabledStudent: {
    type: DataTypes.BOOLEAN,
  },
  recordlessStudent: {
    type: DataTypes.BOOLEAN,
  },

  socialName: {
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
  state: {
    type: DataTypes.STRING,
  },
  idNumber: {
    type: DataTypes.STRING,
  },
  idExpDate: {
    type: DataTypes.STRING,
  },
  idIssuingBody: {
    type: DataTypes.STRING,
  },
  studentId: {
    type: DataTypes.STRING,
  },
  ethnicity: {
    type: DataTypes.STRING,
  },
  cep: {
    type: DataTypes.STRING,
  },
  studentProofOfResidence: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.TEXT,
  },
  cellphoneNumber: {
    type: DataTypes.STRING,
  },
  landlinePhone: {
    type: DataTypes.STRING,
  },
  emergencyPhone: {
    type: DataTypes.STRING,
  },
  responsibleName: {
    type: DataTypes.STRING,
  },
  responsibleId: {
    type: DataTypes.STRING,
  },
  gender: {
    type: DataTypes.STRING,
  },
  studentMedicalReport: {
    type: DataTypes.STRING, // ------------------------------
  },
  studentAcademicRecord: {
    type: DataTypes.STRING,
  },
});
await ejaStudent.sync({alter: true});
