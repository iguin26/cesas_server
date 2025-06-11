import { options } from "pdfkit";
import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";
const bcrypt = require('bcrypt')
// import { Role } from "./Role.js";

const Admin = sequelize.define("Admin", {
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
  // role: {
  //   type: DataTypes.INTEGER,
  //   references: {
  //     model: Role,
  //     key: "id",
  //   },
  // },
});

Admin.beforeCreate(async(admin, options) => {
  if(admin.password){
    admin.password = await bcrypt.hash(admin.password, 10);
  }
});

module.exports = Admin;

