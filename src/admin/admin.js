// src/config/admin.js
import AdminJS from "adminjs";
import * as AdminJSSequelize from "@adminjs/sequelize";
import { CourseResource } from "./resources/CourseResource.js";
import { SubjectResource } from "../admin/resources/SubjectResource.js";
import { CardResource } from "./resources/CardResource.js";
import { FaqResource } from "./resources/FaqResource.js";
import { FooterResource } from "./resources/FooterResource.js";
import { HomeResource } from "./resources/HomeResource.js";
import { StudentResource } from "./resources/StudentResource.js";
import { translations } from "./translate.js";
import { componentLoader, Components } from "./components/components.js";

AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database,
});

export const admin = new AdminJS({
  resources: [
    CardResource,
    CourseResource,
    StudentResource,
    SubjectResource,
    HomeResource,
    FaqResource,
    FooterResource,
  ],
  componentLoader: componentLoader,
  locale: {
    language: "pt-BR",
    availableLanguages: ["pt-BR", "en"],
    translations: translations,
  },
  branding: {
    companyName: "CESAS",
    logo: "/uploads/logo/logo-cesas.png",
    softwareBrothers: false,
    favicon: "uploads/logo/favicon.ico",
    withMadeWithLove: false,
  },
  dashboard: {
    component: Components.HomePage,
  },
  assets: {
    styles: ["/custom-admin.css"],
  },
});
admin.watch();
