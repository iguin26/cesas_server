import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Staff = sequelize.define("Staff", {
  director: {
    type: DataTypes.STRING,
  },

  vicedirector: {
    type: DataTypes.STRING,
  },

  secretary: {
    type: DataTypes.STRING,
  },
  
});

await Staff.sync();
// await Card.drop();
