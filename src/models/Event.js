import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

export const Event = sequelize.define(
  "Event",
  {
    text: {
      type: DataTypes.TEXT,
    },
  },
);

await Event.sync();
