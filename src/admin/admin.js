// src/config/admin.js
import AdminJS from "adminjs";
import * as AdminJSSequelize from "@adminjs/sequelize";
import { CourseResource } from "./resources/CourseResource.js";
import { SubjectResource } from "../admin/resources/SubjectResource.js";
// import { UserResource } from "../admin/resources/UserResource.js";

AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database,
});

export const admin = new AdminJS({
  resources: [CourseResource, SubjectResource],
  branding: {
    companyName: "Cesas",
  },
  locale: {
    language: "pt-BR",
    availableLanguages: ["pt-BR", "en"],
  },
});
admin.watch();
