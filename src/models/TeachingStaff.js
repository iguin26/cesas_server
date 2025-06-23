import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const TeachingStaff = sequelize.define("TeachingStaff", {
  member: {
    type: DataTypes.STRING,
  },
});

await TeachingStaff.sync();

// await Card.drop();
// await Card.sync({ alter: true });
