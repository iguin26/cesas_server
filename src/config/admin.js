// src/config/admin.js

import AdminJS from "adminjs";
import { Student } from "../models/Student.js";
import { Course } from "../models/Course.js";
import { File } from "../models/File.js";
import { Card } from "../models/Cards.js";
import * as AdminJSSequelize from "@adminjs/sequelize";
import { translations } from "./translate.js";

AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database,
});

export const admin = new AdminJS({
  resources: [Student, Course, File, Card],
  branding: {
    companyName: "Cesas",
  },
  locale: translations,
});
