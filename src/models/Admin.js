import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";
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
  // role: {
  //   type: DataTypes.INTEGER,
  //   references: {
  //     model: Role,
  //     key: "id",
  //   },
  // },
});
await Admin.sync();
