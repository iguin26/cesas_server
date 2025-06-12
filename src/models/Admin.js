import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
// import { Role } from "./Role.js";

export const Admin = sequelize.define("Admin", {
  name: {
    type: DataTypes.STRING,
  },
  login: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  freezeTableName: true,  // 👈 impede pluralização
  tableName: 'admin'
  // role: {
  //   type: DataTypes.INTEGER,
  //   references: {
  //     model: Role,
  //     key: "id",
  //   },
  // },
});

const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
  return hashedPassword;
};

export const create = async (login, password) => {
  const hashedPassword = await hashPassword(password);
  console.log(password);
  await Admin.create({
    name: "admin",
    login: login,
    password: hashedPassword,
  });
};

await sequelize.sync(); // cria as tabelas que não existem


export default Admin
