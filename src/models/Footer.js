import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

export const Footer = sequelize.define(
  "Footer",
  {
    siteLink: {
      type: DataTypes.STRING,
    },
    youtubeLink: {
      type: DataTypes.STRING,
    },
    instagramLink: {
      type: DataTypes.STRING,
    },
    facebookLink: {
      type: DataTypes.STRING,
    },
    whatsappLink: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

await Footer.sync();
